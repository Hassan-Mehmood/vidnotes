import React from 'react';
import { Input } from '@/components/ui/input';
import { UserButton } from '@clerk/nextjs';

export default function Navbar() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wider">
                    VidNotes
                </h1>
            </div>

            <div>
                <Input
                    placeholder="Search for a video.."
                    type="text"
                    className="w-[200px] md:w-[600px] lg:w-[800px]"
                />
            </div>

            <div>
                <UserButton />
            </div>
        </div>
    );
}
