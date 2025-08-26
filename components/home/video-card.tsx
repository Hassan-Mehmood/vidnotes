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
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                <Image
                    src={video.thumbnail}
                    alt={video.title}
                    width={320}
                    height={180}
                    className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                </div>
            </div>
            
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
                    {video.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-1">
                    {video.channelName}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{video.views} views</span>
                    <span>{video.publishedAt}</span>
                </div>
            </div>
        </div>
    );
}
