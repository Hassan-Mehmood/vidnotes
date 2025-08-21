export interface ChannelThumbnail {
    url: string;
    width: number;
    height: number;
}

export interface ChannelSnippet {
    title: string;
    description: string;
    customUrl?: string;
    publishedAt: string;
    thumbnails: {
        default?: ChannelThumbnail;
        medium?: ChannelThumbnail;
        high?: ChannelThumbnail;
    };
    localized: {
        title: string;
        description: string;
    };
    country?: string;
}

export interface ChannelItem {
    kind: string;
    etag: string;
    id: string;
    snippet: ChannelSnippet;
}

export interface YouTubeChannelsResponse {
    kind: string;
    etag: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: ChannelItem[];
}
