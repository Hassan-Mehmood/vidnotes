import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const maxResults = searchParams.get('maxResults') || '20';

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    if (!process.env.GCP_API_KEY) {
        return NextResponse.json({ error: 'YouTube API key not configured' }, { status: 500 });
    }

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=channel&maxResults=${maxResults}&order=relevance&key=${process.env.GCP_API_KEY}`,
            { next: { revalidate: 300 } } // Cache for 5 minutes
        );

        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status}`);
        }

        const data = await response.json();

        // Get detailed channel information
        const channelIds = data.items?.map((item: any) => item.id.channelId).join(',');
        
        if (!channelIds) {
            return NextResponse.json({ channels: [] });
        }

        const detailsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelIds}&key=${process.env.GCP_API_KEY}`,
            { next: { revalidate: 300 } }
        );

        if (!detailsResponse.ok) {
            throw new Error(`YouTube API error: ${detailsResponse.status}`);
        }

        const detailsData = await detailsResponse.json();

        return NextResponse.json({ channels: detailsData.items || [] });
    } catch (error) {
        console.error('Error searching channels:', error);
        return NextResponse.json(
            { error: 'Failed to search channels' },
            { status: 500 }
        );
    }
}
