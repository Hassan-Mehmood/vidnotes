import { VideoItem } from '@/types/youtube';
import { getVideoTranscriptOnly } from '@/lib/transcript';
import { TranscriptSummaryClient } from './transcript-summary-client';

async function getVideoDetails(videoId: string): Promise<VideoItem | null> {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${process.env.GCP_API_KEY}`,
            { next: { revalidate: 3600 } }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch video details');
        }

        const data = await response.json();

        if (data.items && data.items.length > 0) {
            return data.items[0];
        }

        return null;
    } catch (error) {
        console.error('Error fetching video details:', error);
        return null;
    }
}


interface WatchContentProps {
    videoId: string;
}

export async function WatchContent({ videoId }: WatchContentProps) {
    const [video, transcriptData] = await Promise.all([
        getVideoDetails(videoId),
        getVideoTranscriptOnly(videoId),
    ]);

    if (!video) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        Video Not Found
                    </h1>
                    <p className="text-gray-600">
                        The requested video could not be found or is not
                        available.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Video Header */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {video.snippet.title}
                        </h1>
                        <div className="flex items-center gap-4 text-gray-600">
                            <span className="font-medium">
                                {video.snippet.channelTitle}
                            </span>
                            <span>•</span>
                            <span>
                                {new Date(
                                    video.snippet.publishedAt
                                ).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    {/* Video Player */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                        <div className="aspect-video rounded-xl overflow-hidden">
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}`}
                                title={video.snippet.title}
                                className="w-full h-full"
                                allowFullScreen
                            />
                        </div>
                    </div>

                    {/* Summary and Transcript */}
                    <TranscriptSummaryClient 
                        videoId={videoId}
                        initialTranscript={transcriptData.transcript}
                        fromCache={transcriptData.fromCache}
                    />
                </div>
            </div>
        </div>
    );
}
