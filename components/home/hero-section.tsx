'use client';

interface HeroSectionProps {
    onExploreChannels: () => void;
    onViewSubscriptions: () => void;
}

export default function HeroSection({ onExploreChannels, onViewSubscriptions }: HeroSectionProps) {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px',
                    }}
                ></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-xl opacity-50 animate-bounce"></div>
            <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-lg opacity-60 animate-pulse delay-1000"></div>

            <div className="relative container mx-auto px-6 py-20 lg:py-32">
                <div className="text-center max-w-4xl mx-auto">
                    {/* Main Heading */}
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight">
                        VidNotes
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl md:text-2xl lg:text-3xl font-light mb-8 text-blue-100 leading-relaxed">
                        Your Ultimate YouTube Discovery Platform
                    </p>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-blue-200 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Discover trending channels, manage your subscriptions,
                        and never miss content from your favorite creators.
                        Experience YouTube like never before.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button 
                            onClick={onExploreChannels}
                            className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/25"
                        >
                            <span className="relative z-10">
                                Explore Channels
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-violet-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        <button 
                            onClick={onViewSubscriptions}
                            className="group px-8 py-4 border-2 border-blue-300 rounded-full font-semibold text-lg text-blue-100 transition-all duration-300 hover:bg-blue-300 hover:text-blue-900 hover:scale-105"
                        >
                            View Subscriptions
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" className="w-full h-20 fill-white">
                    <path d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
                </svg>
            </div>
        </div>
    );
}
