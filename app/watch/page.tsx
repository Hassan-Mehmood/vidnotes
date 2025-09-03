import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { LoadingSkeleton } from '@/components/watch/loading-skeleton';
import { WatchContent } from '@/components/watch/watch-content';

interface WatchPageProps {
    searchParams: Promise<{ v?: string }>;
}

export default async function WatchPage({ searchParams }: WatchPageProps) {
    const { v: videoId } = await searchParams;

    if (!videoId) {
        notFound();
    }

    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <WatchContent videoId={videoId} />
        </Suspense>
    );
}
