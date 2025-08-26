import React from 'react';
import { Input } from '@/components/ui/input';
import { UserButton } from '@clerk/nextjs';

interface NavbarProps {
    searchInputRef?: React.RefObject<HTMLInputElement | null>;
}

export default function Navbar({ searchInputRef }: NavbarProps) {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
            <div className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </div>
                        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
                            VidNotes
                        </h1>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl mx-8 hidden md:block">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <Input
                                ref={searchInputRef}
                                placeholder="Search for videos, channels, or creators..."
                                type="text"
                                className="pl-10 pr-4 py-3 w-full border-gray-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                            />
                        </div>
                    </div>

                    {/* Mobile Search Button */}
                    <div className="md:hidden">
                        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* User Profile */}
                    <div className="flex items-center space-x-4">
                        <div className="hidden sm:flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-gray-600 font-medium">Online</span>
                        </div>
                        <div className="transform hover:scale-105 transition-transform duration-200">
                            <UserButton />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
