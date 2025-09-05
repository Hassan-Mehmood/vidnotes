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

export interface ChannelStatistics {
    viewCount?: string;
    subscriberCount?: string;
    hiddenSubscriberCount?: boolean;
    videoCount?: string;
}

export interface ChannelItem {
    kind: string;
    etag: string;
    id: string;
    snippet: ChannelSnippet;
    statistics?: ChannelStatistics;
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

export interface VideoThumbnail {
    url: string;
    width: number;
    height: number;
}

export interface VideoSnippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
        default?: VideoThumbnail;
        medium?: VideoThumbnail;
        high?: VideoThumbnail;
        standard?: VideoThumbnail;
        maxres?: VideoThumbnail;
    };
    channelTitle: string;
    tags?: string[];
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
        title: string;
        description: string;
    };
    defaultAudioLanguage?: string;
}

export interface VideoStatistics {
    viewCount: string;
    likeCount: string;
    dislikeCount?: string;
    favoriteCount: string;
    commentCount: string;
}

export interface VideoItem {
    kind: string;
    etag: string;
    id: string;
    snippet: VideoSnippet;
    statistics?: VideoStatistics;
}

export interface YouTubeVideosResponse {
    kind: string;
    etag: string;
    nextPageToken?: string;
    prevPageToken?: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: VideoItem[];
}
