import { YoutubeTranscript } from 'youtube-transcript';
import OpenAI from 'openai';
import { Supadata } from '@supadata/js';
import { PROMPT } from '@/prompts';
import { db } from '@/db';
import { videoTranscriptsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const supadata = new Supadata({
    apiKey: process.env.SUPADATA_API_KEY!,
});


export async function getVideoTranscript(videoId: string) {
    try {
        console.log("Fetching transcript for video ID:", videoId);

        const transcriptResult = await supadata.transcript({
            url: `https://www.youtube.com/watch?v=${videoId}`,
            lang: "en",
            text: true,
            mode: "auto",
        });

        if (typeof transcriptResult === 'string') {
            throw new Error('Supadata returned a job ID - polling not implemented yet');
        }

        const transcript = transcriptResult as any;

        if (transcript && transcript.content) {
            // Handle different transcript formats
            if (typeof transcript.content === 'string') {
                return transcript.content;
            } else if (Array.isArray(transcript.content)) {
                // Extract text from array of objects with {text, offset, duration}
                return transcript.content
                    .map((item: any) => item.text || item)
                    .join(' ');
            } else {
                return String(transcript.content);
            }
        } else {
            throw new Error('No transcript content received from Supadata');
        }
    } catch (error) {
        console.error('Error fetching transcript:', error);
        throw new Error('Failed to fetch video transcript');
    }
}

export async function generateSummary(transcript: string) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {
                    role: "system",
                    content: PROMPT
                },
                {
                    role: "user",
                    content: transcript
                }
            ],
            max_tokens: 2000,
            temperature: 0.7,
        });

        return completion.choices[0]?.message?.content || 'Unable to generate summary';
    } catch (error) {
        console.error('Error generating summary:', error);
        throw new Error('Failed to generate summary');
    }
}

// Database functions
export async function getVideoDataFromDB(videoId: string) {
    try {
        const result = await db
            .select()
            .from(videoTranscriptsTable)
            .where(eq(videoTranscriptsTable.videoId, videoId))
            .limit(1);
        
        return result[0] || null;
    } catch (error) {
        console.error('Error fetching video data from database:', error);
        return null;
    }
}

export async function saveVideoDataToDB(videoId: string, transcript: string, summary: string) {
    try {
        await db
            .insert(videoTranscriptsTable)
            .values({
                videoId,
                transcript,
                summary,
            })
            .onConflictDoUpdate({
                target: videoTranscriptsTable.videoId,
                set: {
                    transcript,
                    summary,
                    updatedAt: new Date(),
                },
            });
        
        console.log('Video data saved to database:', videoId);
    } catch (error) {
        console.error('Error saving video data to database:', error);
    }
}

// Get transcript only (faster loading)
export async function getVideoTranscriptOnly(videoId: string) {
    try {
        // First, check if we have transcript in the database
        const existingData = await getVideoDataFromDB(videoId);
        
        if (existingData && existingData.transcript) {
            console.log('Found existing transcript in database for video:', videoId);
            return {
                transcript: existingData.transcript,
                fromCache: true
            };
        }
        
        console.log('Generating new transcript for video:', videoId);
        
        // Generate new transcript
        const transcript = await getVideoTranscript(videoId);
        
        return {
            transcript,
            fromCache: false
        };
    } catch (error) {
        console.error('Error in getVideoTranscriptOnly:', error);
        throw error;
    }
}

// Get summary only (can be called after transcript is shown)
export async function getVideoSummaryOnly(videoId: string, transcript?: string) {
    try {
        // First, check if we have summary in the database
        const existingData = await getVideoDataFromDB(videoId);
        
        if (existingData && existingData.summary) {
            console.log('Found existing summary in database for video:', videoId);
            return {
                summary: existingData.summary,
                fromCache: true
            };
        }
        
        console.log('Generating new summary for video:', videoId);
        
        // If transcript is provided, use it; otherwise fetch it
        let transcriptText = transcript;
        if (!transcriptText) {
            if (existingData && existingData.transcript) {
                transcriptText = existingData.transcript;
            } else {
                transcriptText = await getVideoTranscript(videoId);
            }
        }
        
        // Generate summary
        const summary = await generateSummary(transcriptText!);
        
        // Save to database in background
        saveVideoDataToDB(videoId, transcriptText!, summary).catch(error => {
            console.error('Background save failed:', error);
        });
        
        return {
            summary,
            fromCache: false
        };
    } catch (error) {
        console.error('Error in getVideoSummaryOnly:', error);
        throw error;
    }
}

// Main function that checks database first, then generates if needed
export async function getVideoTranscriptAndSummary(videoId: string) {
    try {
        // First, check if we have this data in the database
        const existingData = await getVideoDataFromDB(videoId);
        
        if (existingData && existingData.transcript && existingData.summary) {
            console.log('Found existing data in database for video:', videoId);
            return {
                transcript: existingData.transcript,
                summary: existingData.summary,
                fromCache: true
            };
        }
        
        console.log('Generating new transcript and summary for video:', videoId);
        
        // Generate new transcript and summary
        const transcript = await getVideoTranscript(videoId);
        const summary = await generateSummary(transcript);
        
        // Save to database in background (don't await to not block the response)
        saveVideoDataToDB(videoId, transcript, summary).catch(error => {
            console.error('Background save failed:', error);
        });
        
        return {
            transcript,
            summary,
            fromCache: false
        };
    } catch (error) {
        console.error('Error in getVideoTranscriptAndSummary:', error);
        throw error;
    }
}
