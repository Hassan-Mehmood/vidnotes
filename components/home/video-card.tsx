import Image from 'next/image';
import { VideoItem } from '@/types/youtube';
import Link from 'next/link';

interface VideoCardProps {
    video: VideoItem;
    subscriptions: string[];
}

export default function VideoCard({ video, subscriptions }: VideoCardProps) {
    console.log('Video', video);
    console.log('Subscriptions', subscriptions);

    const videoThumbnail =
        video.snippet.thumbnails.high?.url ||
        video.snippet.thumbnails.medium?.url ||
        video.snippet.thumbnails.default?.url ||
        '';

    return (
        <Link href={`/watch?v=${video.id}`}>
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden border border-gray-100 hover:border-purple-200">
                <div className="relative overflow-hidden">
                    <Image
                        src={videoThumbnail}
                        alt={video.snippet.title}
                        width={320}
                        height={180}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>

                <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 leading-tight text-lg group-hover:text-purple-600 transition-colors duration-300">
                        {video.snippet.title}
                    </h3>

                    <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {/* <Image
                            src={video.snippet.channelId}
                            alt={video.snippet.channelTitle}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                        /> */}
                        </div>
                        <p className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors cursor-pointer">
                            {video.snippet.channelTitle}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}
