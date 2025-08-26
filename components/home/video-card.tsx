import Image from 'next/image';

interface Video {
    id: string;
    title: string;
    channelName: string;
    channelId: string;
    thumbnail: string;
    publishedAt: string;
    duration: string;
    views: string;
}

interface VideoCardProps {
    video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
    return (
        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden border border-gray-100 hover:border-purple-200">
            <div className="relative overflow-hidden">
                <Image
                    src={video.thumbnail}
                    alt={video.title}
                    width={320}
                    height={180}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-lg">
                    {video.duration}
                </div>
                
                {/* Live Badge (if applicable) */}
                <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    HD
                </div>
            </div>
            
            <div className="p-5">
                <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 leading-tight text-lg group-hover:text-purple-600 transition-colors duration-300">
                    {video.title}
                </h3>
                
                <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {video.channelName.charAt(0)}
                    </div>
                    <p className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors cursor-pointer">
                        {video.channelName}
                    </p>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="font-medium">{video.views} views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{video.publishedAt}</span>
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>Like</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        <span>Share</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-purple-600 transition-colors text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <span>Save</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
