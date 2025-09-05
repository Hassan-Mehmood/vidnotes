'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';

interface SubscribeButtonProps {
    channelId: string;
    channelTitle: string;
}

export default function SubscribeButton({ channelId, channelTitle }: SubscribeButtonProps) {
    const { user } = useUser();
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubscribe = async () => {
        if (!user) return;
        
        setIsLoading(true);
        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    channelId,
                    channelTitle,
                    action: isSubscribed ? 'unsubscribe' : 'subscribe'
                }),
            });

            if (response.ok) {
                setIsSubscribed(!isSubscribed);
            }
        } catch (error) {
            console.error('Error toggling subscription:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleSubscribe}
            disabled={isLoading || !user}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 flex items-center space-x-2 ${
                isSubscribed
                    ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
            {isLoading ? (
                <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading...</span>
                </>
            ) : isSubscribed ? (
                <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Subscribed</span>
                </>
            ) : (
                <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Subscribe</span>
                </>
            )}
        </button>
    );
}
