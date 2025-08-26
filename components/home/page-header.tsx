interface PageHeaderProps {
    title: string;
    description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <div className="text-center mb-16">
            <div className="relative inline-block">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
                    {title}
                </h1>
                {/* Decorative underline */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
            </div>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mt-8">
                {description}
            </p>
            
            {/* Floating decorative elements */}
            <div className="relative mt-8">
                <div className="absolute -top-4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
                <div className="absolute -top-2 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-40"></div>
                <div className="absolute top-2 left-1/3 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse opacity-50 delay-500"></div>
            </div>
        </div>
    );
}
