'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChannelItem } from '@/types/youtube';
import { useState } from 'react';

interface ChannelCardProps {
    channel: ChannelItem;
    isSubscribed?: boolean;
}

export default function ChannelCard({
    channel,
    isSubscribed = false,
}: ChannelCardProps) {
    const [subscribed, setSubscribed] = useState(isSubscribed);
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation when clicking subscribe button
        e.stopPropagation();
        
        setLoading(true);
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    channelId: channel.id,
                    channelTitle: channel.snippet.title,
                    action: subscribed ? 'unsubscribe' : 'subscribe'
                }),
            });

            if (response.ok) {
                setSubscribed(!subscribed);
            }
        } catch (error) {
            console.error('Error toggling subscription:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Link href={`/channel/${channel.id}`}>
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] overflow-hidden flex flex-col h-full border border-gray-100 hover:border-purple-200 cursor-pointer">
            {/* Channel Thumbnail */}
            <div className="relative overflow-hidden">
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
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

                {/* Floating Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <svg
                            className="w-8 h-8 text-white ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>

                {/* Channel Avatar */}
                <div className="absolute -bottom-6 left-6">
                    <div className="w-12 h-12 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                        <Image
                            src={
                                channel.snippet.thumbnails.default?.url ||
                                `https://via.placeholder.com/88x88/f3f4f6/6b7280?text=${encodeURIComponent(
                                    channel.snippet.title.charAt(0)
                                )}`
                            }
                            alt={channel.snippet.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Channel Info */}
            <div className="p-6 pt-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-300">
                    {channel.snippet.title}
                </h3>

                <p className="text-gray-600 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                    {channel.snippet.description ||
                        'Discover amazing content from this creator'}
                </p>

                <div className="mt-auto space-y-3">
                    {/* Subscribe Button */}
                    <button
                        className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center group/btn shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] ${
                            subscribed
                                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                                : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                        } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleSubscribe}
                        disabled={loading}
                    >
                        {loading ? (
                            <svg className="w-5 h-5 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : subscribed ? (
                            <svg
                                className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform duration-200"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        ) : (
                            <svg
                                className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform duration-200"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        )}
                        <span className="group-hover/btn:tracking-wide transition-all duration-200">
                            {loading ? 'Loading...' : subscribed ? 'Subscribed' : 'Subscribe'}
                        </span>
                    </button>
                </div>
            </div>
            </div>
        </Link>
    );
}
