import { VideoItem, ChannelItem } from '@/types/youtube';
import VideoCard from '@/components/home/video-card';
import ChannelCard from '@/components/home/channel-card';

interface SearchResultsProps {
    searchParams: {
        q?: string;
        type?: 'videos' | 'channels';
    };
}

async function fetchSearchResults(query: string, type: 'videos' | 'channels') {
    const baseUrl = process.env.NODE_ENV === 'production' 
        ? 'https://your-domain.com' 
        : 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/search/${type}?q=${encodeURIComponent(query)}`, {
        next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${type}`);
    }

    const data = await response.json();
    return type === 'videos' ? data.videos : data.channels;
}

export default async function SearchResults({ searchParams }: SearchResultsProps) {
    const query = searchParams.q || '';
    const type = searchParams.type || 'videos';

    if (!query.trim()) {
        return (
            <div className="container mx-auto px-6 py-16 text-center">
                <div className="max-w-md mx-auto">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Your Search</h2>
                    <p className="text-gray-600">Enter a search term to find videos or channels</p>
                </div>
            </div>
        );
    }

    try {
        const results = await fetchSearchResults(query, type);

        return (
            <div className="container mx-auto px-6 py-8">
                {/* Search Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Search Results for "{query}"
                    </h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-gray-600">
                            Found {results.length} {type === 'videos' ? 'videos' : 'channels'}
                        </span>
                        <div className="flex items-center space-x-2">
                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                type === 'videos' 
                                    ? 'bg-purple-100 text-purple-700' 
                                    : 'bg-blue-100 text-blue-700'
                            }`}>
                                {type === 'videos' ? '🎥 Videos' : '📺 Channels'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                {results.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="max-w-md mx-auto">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.563M15 9.34c-.665-.86-1.457-1.34-2.328-1.34s-1.663.48-2.328 1.34M12 3v1.5" />
                            </svg>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Found</h3>
                            <p className="text-gray-600">
                                Try searching with different keywords or check your spelling
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className={`grid gap-6 ${
                        type === 'videos' 
                            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                    }`}>
                        {type === 'videos' 
                            ? results.map((video: VideoItem) => (
                                <VideoCard key={video.id} video={video} subscriptions={[]} />
                              ))
                            : results.map((channel: ChannelItem) => (
                                <ChannelCard 
                                    key={channel.id} 
                                    channel={channel} 
                                    isSubscribed={false}
                                />
                              ))
                        }
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('Error fetching search results:', error);
        return (
            <div className="container mx-auto px-6 py-16 text-center">
                <div className="max-w-md mx-auto">
                    <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Search Error</h3>
                    <p className="text-gray-600">
                        There was an error performing your search. Please try again.
                    </p>
                </div>
            </div>
        );
    }
}
