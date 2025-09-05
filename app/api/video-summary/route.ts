import { NextRequest, NextResponse } from 'next/server';
import { getVideoSummaryOnly } from '@/lib/transcript';

export async function POST(request: NextRequest) {
    try {
        const { videoId, transcript } = await request.json();

        if (!videoId) {
            return NextResponse.json(
                { error: 'Video ID is required' },
                { status: 400 }
            );
        }

        const result = await getVideoSummaryOnly(videoId, transcript);

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in video-summary API:', error);
        return NextResponse.json(
            { error: 'Failed to generate summary' },
            { status: 500 }
        );
    }
}
