import Image from 'next/image';
import { ChannelItem } from '@/types/youtube';
import Link from 'next/link';

interface ChannelCardProps {
    channel: ChannelItem;
}

export default function ChannelCard({ channel }: ChannelCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col h-full">
            {/* Channel Thumbnail */}
            <div className="relative">
                <Image
                    src={
                        channel.snippet.thumbnails.high?.url ||
                        channel.snippet.thumbnails.medium?.url ||
                        channel.snippet.thumbnails.default?.url ||
                        `https://via.placeholder.com/800x600/f3f4f6/6b7280?text=${encodeURIComponent(
                            channel.snippet.title.slice(0, 20)
                        )}`
                    }
                    alt={channel.snippet.title}
                    width={800}
                    height={192}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Channel Info */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {channel.snippet.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                    {channel.snippet.description || 'No description available'}
                </p>

                <div className="mt-auto space-y-2">
                    <Link
                        href={``}
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
                    </Link>
                </div>
            </div>
        </div>
    );
}
