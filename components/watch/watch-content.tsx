import { VideoItem } from '@/types/youtube';
import { getVideoTranscript, generateSummary } from '@/lib/transcript';

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

async function getVideoTranscriptAndSummary(videoId: string) {
    try {
        const transcript = await getVideoTranscript(videoId);
        const summary = await generateSummary(transcript);
        return { transcript, summary };
    } catch (error) {
        console.error('Error processing transcript:', error);
        return { transcript: null, summary: null };
    }
}

interface WatchContentProps {
    videoId: string;
}

export async function WatchContent({ videoId }: WatchContentProps) {
    const [video, transcriptData] = await Promise.all([
        getVideoDetails(videoId),
        getVideoTranscriptAndSummary(videoId),
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
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* AI Summary */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                        />
                                    </svg>
                                </div>
                                AI Summary
                            </h2>
                            {transcriptData.summary ? (
                                <div className="prose prose-gray max-w-none">
                                    <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                                        {transcriptData.summary}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 mb-4">
                                        <svg
                                            className="w-16 h-16 mx-auto"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1}
                                                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.816-6.207-2.175.168-.288.336-.576.504-.864C7.798 10.64 9.798 10 12 10s4.202.64 5.703 1.961c.168.288.336.576.504.864-.5.5-1 1-1.5 1.5z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500">
                                        Unable to generate summary for this
                                        video
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Transcript */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                        />
                                    </svg>
                                </div>
                                Transcript
                            </h2>
                            {transcriptData.transcript ? (
                                <div className="max-h-96 overflow-y-auto">
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {transcriptData.transcript}
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 mb-4">
                                        <svg
                                            className="w-16 h-16 mx-auto"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1}
                                                d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.816-6.207-2.175.168-.288.336-.576.504-.864C7.798 10.64 9.798 10 12 10s4.202.64 5.703 1.961c.168.288.336.576.504.864-.5.5-1 1-1.5 1.5z"
                                            />
                                        </svg>
                                    </div>
                                    <p className="text-gray-500">
                                        No transcript available for this video
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
