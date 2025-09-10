'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChannelCard from '@/components/home/channel-card';
import VideoCard from '@/components/home/video-card';
import PageHeader from '@/components/home/page-header';
import SearchModal from '@/components/ui/search-modal';
import { ChannelItem } from '@/types/youtube';

interface HomeTabsProps {
    channels: ChannelItem[];
}

export default function HomeTabs({ channels }: HomeTabsProps) {
    const [activeTab, setActiveTab] = useState('home');
    const [searchModalOpen, setSearchModalOpen] = useState(false);

    const handleExploreChannels = () => {
        setActiveTab('home');
        setSearchModalOpen(true);
    };

    const handleViewSubscriptions = () => {
        setActiveTab('subscriptions');
    };

    return (
        <>
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
            >
                <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                    <TabsList className="w-full justify-start bg-transparent p-0 h-auto">
                        <TabsTrigger
                            value="home"
                            className="relative px-8 py-6 text-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-t-2xl transition-all duration-300"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0M8 5a2 2 0 012-2h4a2 2 0 012 2v0"
                                />
                            </svg>
                            Discover Channels
                        </TabsTrigger>
                        <TabsTrigger
                            value="subscriptions"
                            className="relative px-8 py-6 text-lg font-semibold data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:text-purple-600 data-[state=active]:border-b-2 data-[state=active]:border-purple-600 rounded-t-2xl transition-all duration-300"
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                />
                            </svg>
                            My Subscriptions
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="home" className="p-8 md:p-12">
                    <section>
                        <PageHeader
                            title="Trending Channels"
                            description="Discover the most popular YouTube channels across different categories and find your next favorite creator"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {channels.map((channel) => (
                                <ChannelCard
                                    key={channel.id}
                                    channel={channel}
                                />
                            ))}
                        </div>
                    </section>
                </TabsContent>

                <TabsContent value="subscriptions" className="p-8 md:p-12">
                    <section>
                        <PageHeader
                            title="Latest from Your Subscriptions"
                            description="Stay up to date with the newest content from channels you love"
                        />
                        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {recentVideos.map((video) => (
                                <VideoCard
                                    key={video.id}
                                    video={video}
                                    subscriptions={[]}
                                />
                            ))}
                        </div> */}
                    </section>
                </TabsContent>
            </Tabs>

            {/* Search Modal */}
            <SearchModal
                open={searchModalOpen}
                onOpenChange={setSearchModalOpen}
            />
        </>
    );
}
