import { Suspense } from 'react';
import Navbar from '@/components/ui/navbar';
import SearchResults from '@/components/search/search-results';

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
        type?: 'videos' | 'channels';
    }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const params = await searchParams;
    
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Suspense fallback={<SearchResultsSkeleton />}>
                <SearchResults searchParams={params} />
            </Suspense>
        </div>
    );
}

function SearchResultsSkeleton() {
    return (
        <div className="container mx-auto px-6 py-8">
            <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
