import Navbar from '@/components/ui/navbar';

const topYouTubeChannels = [
    { name: 'MrBeast', id: 'UCX6OQ3DkcsbYNE6H8uQQuVA' },
    { name: 'T-Series', id: 'UCq-Fj5jknLsUf-MWSy4_brA' },
    { name: 'Cocomelon - Nursery Rhymes', id: 'UCbCmjCuTUZos6Inko4u57UQ' },
    { name: 'SET India', id: 'UCpEhnqL0y41EpW2TvWAHD7Q' },
    { name: 'Vlad and Niki', id: 'UCvlE5gTbOvjiolFlEm-c_Ow' },
    { name: 'Kids Diana Show', id: 'UCk8GzjMOrta8yxDcKfylJYw' },
    { name: 'Like Nastya', id: 'UCJplp5SjeGSdVdwsfb9Q7lQ' },
    { name: 'Zee Music Company', id: 'UCF0gkM0w0rL6l9r6U1v6YKg' },
    { name: 'WWE', id: 'UCJ5v_MCY6GNUBTO8-D3XoAg' },
    { name: 'Sony SAB', id: 'UC6-F5tO8uklgE9Zy8IvbdFw' },
    { name: 'BLACKPINK', id: 'UCOmHUn--16B90oW2L6FRR3A' },
    { name: 'BangtanTV (BTS)', id: 'UC3IZKseVpdzPSBaWxBxundA' },
    { name: 'Justin Bieber', id: 'UCIwFjwMjI0y7PDBVEO9-bkQ' },
    { name: 'Marshmello', id: 'UCeLHszkByNZtPKcaVXOCOQQ' },
    { name: 'HYBE LABELS', id: 'UC3IZKseVpdzPSBaWxBxundA' },
];

interface ChannelThumbnail {
    url: string;
    width: number;
    height: number;
}

interface ChannelSnippet {
    title: string;
    description: string;
    customUrl?: string;
    publishedAt: string;
    thumbnails: {
        default?: ChannelThumbnail;
        medium?: ChannelThumbnail;
        high?: ChannelThumbnail;
    };
    localized: {
        title: string;
        description: string;
    };
    country?: string;
}

interface ChannelItem {
    kind: string;
    etag: string;
    id: string;
    snippet: ChannelSnippet;
}

interface YouTubeChannelsResponse {
    kind: string;
    etag: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: ChannelItem[];
}

export default async function Home() {
    const channelIds = topYouTubeChannels
        .map((channel) => channel.id)
        .join(',');

    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${process.env.GCP_API_KEY}`
    );

    const data: YouTubeChannelsResponse = await response.json();

    for (const channel of data.items) {
        console.log(channel);
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <Navbar />
            <div className="container mx-auto px-6 py-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">
                        Top YouTube Channels
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover and subscribe to the most popular YouTube
                        channels across different categories
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data.items.map((channel: ChannelItem) => (
                        <div
                            key={channel.id}
                            className=" bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                        >
                            {/* Channel Thumbnail */}
                            <div className="relative">
                                <img
                                    src={
                                        channel.snippet.thumbnails.high?.url ||
                                        channel.snippet.thumbnails.medium
                                            ?.url ||
                                        channel.snippet.thumbnails.default
                                            ?.url ||
                                        `https://via.placeholder.com/800x600/f3f4f6/6b7280?text=${encodeURIComponent(
                                            channel.snippet.title.slice(0, 20)
                                        )}`
                                    }
                                    alt={channel.snippet.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>

                            {/* Channel Info */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                                    {channel.snippet.title}
                                </h3>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {channel.snippet.description ||
                                        'No description available'}
                                </p>

                                <a
                                    href={`https://www.youtube.com/channel/${channel.id}?sub_confirmation=1`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center group"
                                >
                                    <svg
                                        className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                    Subscribe
                                </a>

                                <a
                                    href={`https://www.youtube.com/channel/${channel.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm"
                                >
                                    <svg
                                        className="w-4 h-4 mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                    Visit Channel
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Channel Statistics
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-red-600 mb-2">
                                {data.items.length}
                            </div>
                            <div className="text-gray-600">Total Channels</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-blue-600 mb-2">
                                {
                                    data.items.filter(
                                        (channel: ChannelItem) =>
                                            channel.snippet.country
                                    ).length
                                }
                            </div>
                            <div className="text-gray-600">
                                Countries Represented
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-600 mb-2">
                                {Math.min(
                                    ...data.items.map((channel: ChannelItem) =>
                                        new Date(
                                            channel.snippet.publishedAt
                                        ).getFullYear()
                                    )
                                )}
                            </div>
                            <div className="text-gray-600">
                                Oldest Channel Year
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
