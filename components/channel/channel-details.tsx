import Image from 'next/image';
import { ChannelItem, VideoItem } from '@/types/youtube';
import VideoCard from '@/components/home/video-card';
import SubscribeButton from './subscribe-button';

interface ChannelDetailsProps {
    channelId: string;
}

async function fetchChannelDetails(channelId: string): Promise<ChannelItem> {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${process.env.GCP_API_KEY}`,
        { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
        throw new Error('Channel not found');
    }

    return data.items[0];
}

async function fetchChannelVideos(channelId: string): Promise<VideoItem[]> {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=20&order=date&type=video&key=${process.env.GCP_API_KEY}`,
        { next: { revalidate: 1800 } } // Cache for 30 minutes
    );

    if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();

    // Convert search results to video format
    return data.items?.map((item: any) => ({
        kind: 'youtube#video',
        etag: item.etag,
        id: item.id.videoId,
        snippet: {
            ...item.snippet,
            categoryId: '0',
            liveBroadcastContent: 'none',
            localized: {
                title: item.snippet.title,
                description: item.snippet.description,
            },
        },
    })) || [];
}

function formatSubscriberCount(count: string): string {
    const num = parseInt(count);
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K`;
    }
    return count;
}

export default async function ChannelDetails({ channelId }: ChannelDetailsProps) {
    try {
        const [channel, videos] = await Promise.all([
            fetchChannelDetails(channelId),
            fetchChannelVideos(channelId)
        ]);

        const channelThumbnail = 
            channel.snippet.thumbnails.high?.url ||
            channel.snippet.thumbnails.medium?.url ||
            channel.snippet.thumbnails.default?.url ||
            '';

        return (
            <div className="container mx-auto px-6 py-8">
                {/* Channel Header */}
                <div className="bg-white rounded-2xl p-8 shadow-sm mb-8 border border-gray-100">
                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
                        {/* Channel Avatar */}
                        <div className="relative">
                            <Image
                                src={channelThumbnail}
                                alt={channel.snippet.title}
                                width={120}
                                height={120}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-gray-100"
                            />
                        </div>

                        {/* Channel Info */}
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {channel.snippet.title}
                            </h1>
                            
                            <div className="flex flex-wrap items-center space-x-6 text-gray-600 mb-4">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="font-medium">
                                        {formatSubscriberCount(channel.statistics?.subscriberCount || '0')} subscribers
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <span>{channel.statistics?.videoCount || '0'} videos</span>
                                </div>
                            </div>

                            {channel.snippet.description && (
                                <p className="text-gray-700 mb-6 line-clamp-3 leading-relaxed">
                                    {channel.snippet.description}
                                </p>
                            )}

                            {/* Subscribe Button */}
                            <SubscribeButton channelId={channelId} channelTitle={channel.snippet.title} />
                        </div>
                    </div>
                </div>

                {/* Latest Videos Section */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest Videos</h2>
                    <p className="text-gray-600">Recent uploads from {channel.snippet.title}</p>
                </div>

                {/* Videos Grid */}
                {videos.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Videos Found</h3>
                            <p className="text-gray-600">This channel hasn't uploaded any videos yet.</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video) => (
                            <VideoCard key={video.id} video={video} subscriptions={[]} />
                        ))}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Error fetching channel details:', error);
        return (
            <div className="container mx-auto px-6 py-16 text-center">
                <div className="max-w-md mx-auto">
                    <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Channel Not Found</h3>
                    <p className="text-gray-600">
                        The channel you're looking for doesn't exist or couldn't be loaded.
                    </p>
                </div>
            </div>
        );
    }
}
