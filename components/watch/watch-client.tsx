'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { VideoItem } from '@/types/youtube';
import { Button } from '@/components/ui/button';
import { 
    ThumbsUp, 
    ThumbsDown, 
    Share2, 
    Download, 
    Flag,
    Eye,
    Calendar,
    Play
} from 'lucide-react';

interface WatchClientProps {
    video: VideoItem;
    relatedVideos: VideoItem[];
}

export default function WatchClient({ video, relatedVideos }: WatchClientProps) {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const formatViewCount = (count: string) => {
        const num = parseInt(count);
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        } else if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}K`;
        }
        return num.toLocaleString();
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Video Section */}
            <div className="lg:col-span-2 space-y-6">
                {/* Video Player */}
                <div className="relative bg-black rounded-2xl overflow-hidden shadow-2xl">
                    <div className="aspect-video">
                        <iframe
                            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
                            title={video.snippet.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>

                {/* Video Info */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                        {video.snippet.title}
                    </h1>

                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Eye className="w-4 h-4" />
                                <span className="font-medium">
                                    {video.statistics ? formatViewCount(video.statistics.viewCount) : '0'} views
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span>{formatDate(video.snippet.publishedAt)}</span>
                            </div>
                        </div>

                        <div className="flex items-center space-x-3">
                            <Button variant="outline" size="sm" className="flex items-center space-x-2">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{video.statistics ? formatViewCount(video.statistics.likeCount) : '0'}</span>
                            </Button>
                            <Button variant="outline" size="sm">
                                <ThumbsDown className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                                <Share2 className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                                <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                                <Flag className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Channel Info */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                                {video.snippet.channelTitle.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {video.snippet.channelTitle}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Published {formatDate(video.snippet.publishedAt)}
                                </p>
                            </div>
                        </div>
                        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                            Subscribe
                        </Button>
                    </div>

                    {/* Description */}
                    <div className="mt-6">
                        <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-gray-700 leading-relaxed">
                                {showFullDescription 
                                    ? video.snippet.description 
                                    : `${video.snippet.description.slice(0, 300)}${video.snippet.description.length > 300 ? '...' : ''}`
                                }
                            </p>
                            {video.snippet.description.length > 300 && (
                                <button
                                    onClick={() => setShowFullDescription(!showFullDescription)}
                                    className="text-purple-600 hover:text-purple-700 font-medium mt-2 text-sm"
                                >
                                    {showFullDescription ? 'Show less' : 'Show more'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Videos Sidebar */}
            <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                        <Play className="w-5 h-5 mr-2 text-purple-600" />
                        Related Videos
                    </h2>
                    
                    <div className="space-y-4">
                        {relatedVideos.slice(0, 8).map((relatedVideo) => (
                            <Link 
                                key={relatedVideo.id} 
                                href={`/watch?v=${relatedVideo.id}`}
                                className="group block"
                            >
                                <div className="flex space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                                    <div className="relative flex-shrink-0">
                                        <Image
                                            src={relatedVideo.snippet.thumbnails.medium?.url || ''}
                                            alt={relatedVideo.snippet.title}
                                            width={120}
                                            height={68}
                                            className="rounded-lg object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                                            <Play className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-gray-900 text-sm line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
                                            {relatedVideo.snippet.title}
                                        </h3>
                                        <p className="text-xs text-gray-600 mt-1">
                                            {relatedVideo.snippet.channelTitle}
                                        </p>
                                        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                                            {relatedVideo.statistics && (
                                                <span>{formatViewCount(relatedVideo.statistics.viewCount)} views</span>
                                            )}
                                            <span>•</span>
                                            <span>{formatDate(relatedVideo.snippet.publishedAt)}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
