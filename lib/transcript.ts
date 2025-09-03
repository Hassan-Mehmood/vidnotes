import { YoutubeTranscript } from 'youtube-transcript';
import OpenAI from 'openai';
import { Supadata } from '@supadata/js';

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
            lang: "en", // optional
            text: true, // optional: return plain text instead of timestamped chunks
            mode: "auto", // optional: 'native', 'auto', or 'generate'
        });

        console.log("Transcript result:", transcriptResult);

        // Handle Supadata response - it might return a job ID first, then the actual transcript
        if (typeof transcriptResult === 'string') {
            // This is likely a job ID, we need to poll for the result
            throw new Error('Supadata returned a job ID - polling not implemented yet');
        }

        // Type assertion for the expected transcript format
        const transcript = transcriptResult as any;

        // Extract the content from Supadata response
        if (transcript && transcript.content) {
            return transcript.content;
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
                    content: "You are a helpful assistant that creates detailed, well-structured summaries of video transcripts. Format your response with clear headings, bullet points, and key takeaways."
                },
                {
                    role: "user",
                    content: `Please create a detailed summary of this video transcript. Include key points, main topics discussed, and important takeaways. Format it nicely with headings and bullet points:\n\n${transcript}`
                }
            ],
            max_tokens: 1000,
            temperature: 0.7,
        });

        return completion.choices[0]?.message?.content || 'Unable to generate summary';
    } catch (error) {
        console.error('Error generating summary:', error);
        throw new Error('Failed to generate summary');
    }
}
