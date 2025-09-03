export function LoadingSkeleton() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Video Header Skeleton */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                        <div className="h-8 bg-gray-200 rounded-lg mb-4 animate-pulse"></div>
                        <div className="flex items-center gap-4">
                            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-2 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                        </div>
                    </div>

                    {/* Video Player Skeleton */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                        <div className="aspect-video rounded-xl bg-gray-200 animate-pulse"></div>
                    </div>

                    {/* Summary and Transcript Skeletons */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* AI Summary Skeleton */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                            </div>
                        </div>

                        {/* Transcript Skeleton */}
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                                <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                            </div>
                            <div className="space-y-2">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
