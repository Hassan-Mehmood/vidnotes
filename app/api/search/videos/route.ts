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
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&order=relevance&key=${process.env.GCP_API_KEY}`,
            { next: { revalidate: 300 } } // Cache for 5 minutes
        );

        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status}`);
        }

        const data = await response.json();

        // Transform search results to match VideoItem format
        const videos = data.items?.map((item: any) => ({
            kind: 'youtube#video',
            etag: item.etag,
            id: item.id.videoId,
            snippet: {
                ...item.snippet,
                categoryId: '0',
                liveBroadcastContent: 'none',
                localized: {
                    title: item.snippet.title,
                    description: item.snippet.description,
                },
            },
        })) || [];

        return NextResponse.json({ videos });
    } catch (error) {
        console.error('Error searching videos:', error);
        return NextResponse.json(
            { error: 'Failed to search videos' },
            { status: 500 }
        );
    }
}
