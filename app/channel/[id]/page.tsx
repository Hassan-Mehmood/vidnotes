import { Suspense } from 'react';
import Navbar from '@/components/ui/navbar';
import ChannelDetails from '@/components/channel/channel-details';

interface ChannelPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ChannelPage({ params }: ChannelPageProps) {
    const { id } = await params;
    
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Suspense fallback={<ChannelDetailsSkeleton />}>
                <ChannelDetails channelId={id} />
            </Suspense>
        </div>
    );
}

function ChannelDetailsSkeleton() {
    return (
        <div className="container mx-auto px-6 py-8">
            <div className="animate-pulse">
                {/* Channel Header Skeleton */}
                <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
                    <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                            <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                            <div className="h-10 bg-gray-200 rounded w-32"></div>
                        </div>
                    </div>
                </div>
                
                {/* Videos Grid Skeleton */}
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                            <div className="h-48 bg-gray-200"></div>
                            <div className="p-4">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
