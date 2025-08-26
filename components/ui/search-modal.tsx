'use client';

import { useState, useRef, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface SearchModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function SearchModal({ open, onOpenChange }: SearchModalProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Focus input when modal opens
    useEffect(() => {
        if (open && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 100);
        }
    }, [open]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Handle search logic here
            console.log('Searching for:', searchQuery);
            // You can add actual search functionality here
            onOpenChange(false);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        searchInputRef.current?.focus();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl p-0 gap-0 bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
                <DialogHeader className="p-6 pb-4">
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        Search Channels
                    </DialogTitle>
                </DialogHeader>

                <div className="px-6 pb-6">
                    <form onSubmit={handleSearch} className="space-y-4">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg
                                    className="h-6 w-6 text-gray-400 group-focus-within:text-purple-500 transition-colors"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>

                            <Input
                                ref={searchInputRef}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for channels, videos, or creators..."
                                className="pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                            />

                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={clearSearch}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center space-x-1">
                                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                                        Enter
                                    </kbd>
                                    <span>to search</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                    <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                                        Esc
                                    </kbd>
                                    <span>to close</span>
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={!searchQuery.trim()}
                                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Quick suggestions */}
                    <div className="mt-6">
                        <p className="text-sm font-medium text-gray-700 mb-3">
                            Popular searches:
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                'MrBeast',
                                'Gaming',
                                'Music',
                                'Tech Reviews',
                                'Cooking',
                                'Travel',
                            ].map((suggestion) => (
                                <button
                                    key={suggestion}
                                    onClick={() => setSearchQuery(suggestion)}
                                    className="px-3 py-1 bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 rounded-full text-sm transition-colors duration-200"
                                >
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
