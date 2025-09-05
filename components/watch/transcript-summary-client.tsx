'use client';

import { useState, useEffect } from 'react';
import { MarkdownRenderer } from '@/components/ui/markdown-renderer';
import { SummaryLoading } from '@/components/ui/summary-loading';

interface TranscriptSummaryClientProps {
    videoId: string;
    initialTranscript?: string;
    initialSummary?: string;
    fromCache?: boolean;
}

export function TranscriptSummaryClient({ 
    videoId, 
    initialTranscript, 
    initialSummary, 
    fromCache = false 
}: TranscriptSummaryClientProps) {
    const [transcript, setTranscript] = useState(initialTranscript || null);
    const [summary, setSummary] = useState(initialSummary || null);
    const [isLoadingSummary, setIsLoadingSummary] = useState(!initialSummary);
    const [summaryFromCache, setSummaryFromCache] = useState(fromCache);

    useEffect(() => {
        // If we don't have a summary, fetch it
        if (!initialSummary) {
            fetchSummary();
        }
    }, [videoId, initialSummary]);

    const fetchSummary = async () => {
        try {
            setIsLoadingSummary(true);
            const response = await fetch('/api/video-summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    videoId,
                    transcript: transcript 
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch summary');
            }

            const data = await response.json();
            setSummary(data.summary);
            setSummaryFromCache(data.fromCache);
        } catch (error) {
            console.error('Error fetching summary:', error);
            setSummary('Unable to generate summary for this video');
        } finally {
            setIsLoadingSummary(false);
        }
    };

    return (
        <div className="grid lg:grid-cols-2 gap-8">
            {/* AI Summary */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                            </svg>
                        </div>
                        AI Summary
                    </div>
                    {summaryFromCache && summary && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            Cached
                        </span>
                    )}
                </h2>
                
                {isLoadingSummary ? (
                    <SummaryLoading />
                ) : summary ? (
                    <MarkdownRenderer content={summary} />
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <svg
                                className="w-16 h-16 mx-auto"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.816-6.207-2.175.168-.288.336-.576.504-.864C7.798 10.64 9.798 10 12 10s4.202.64 5.703 1.961c.168.288.336.576.504.864-.5.5-1 1-1.5 1.5z"
                                />
                            </svg>
                        </div>
                        <p className="text-gray-500">
                            Unable to generate summary for this video
                        </p>
                    </div>
                )}
            </div>

            {/* Transcript */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                />
                            </svg>
                        </div>
                        Transcript
                    </div>
                    {fromCache && transcript && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            Cached
                        </span>
                    )}
                </h2>
                {transcript ? (
                    <div className="max-h-96 overflow-y-auto">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {transcript}
                        </p>
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <svg
                                className="w-16 h-16 mx-auto"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.5-.816-6.207-2.175.168-.288.336-.576.504-.864C7.798 10.64 9.798 10 12 10s4.202.64 5.703 1.961c.168.288.336.576.504.864-.5.5-1 1-1.5 1.5z"
                                />
                            </svg>
                        </div>
                        <p className="text-gray-500">
                            No transcript available for this video
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
