export function SummaryLoading() {
    return (
        <div className="animate-pulse">
            {/* Header skeleton */}
            <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                <div className="h-6 bg-gray-200 rounded w-32"></div>
            </div>
            
            {/* Content skeleton */}
            <div className="space-y-4">
                {/* First section */}
                <div className="h-5 bg-gray-200 rounded w-48"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-11/12"></div>
                    <div className="h-4 bg-gray-100 rounded w-4/5"></div>
                </div>
                
                {/* Second section */}
                <div className="h-5 bg-gray-200 rounded w-40 mt-6"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-10/12"></div>
                    <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-100 rounded w-9/12"></div>
                </div>
                
                {/* Third section */}
                <div className="h-5 bg-gray-200 rounded w-36 mt-6"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-100 rounded w-full"></div>
                    <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                </div>
            </div>
            
            {/* Loading indicator */}
            <div className="flex items-center justify-center mt-8 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-blue-600 font-medium">Generating AI summary...</span>
                </div>
            </div>
        </div>
    );
}
