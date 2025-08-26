import Navbar from '@/components/ui/navbar';
import ChannelCard from '@/components/home/channel-card';
import VideoCard from '@/components/home/video-card';
import PageHeader from '@/components/home/page-header';
import { YouTubeChannelsResponse } from '@/types/youtube';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const topYouTubeChannels = [
    { name: 'MrBeast', id: 'UCX6OQ3DkcsbYNE6H8uQQuVA' },
    { name: 'T-Series', id: 'UCq-Fj5jknLsUf-MWSy4_brA' },
    { name: 'Cocomelon - Nursery Rhymes', id: 'UCbCmjCuTUZos6Inko4u57UQ' },
    { name: 'SET India', id: 'UCpEhnqL0y41EpW2TvWAHD7Q' },
    { name: 'Vlad and Niki', id: 'UCvlE5gTbOvjiolFlEm-c_Ow' },
    { name: 'Kids Diana Show', id: 'UCk8GzjMOrta8yxDcKfylJYw' },
    { name: 'Like Nastya', id: 'UCJplp5SjeGSdVdwsfb9Q7lQ' },
    { name: 'Zee Music Company', id: 'UCF0gkM0w0rL6l9r6U1v6YKg' },
    { name: 'WWE', id: 'UCJ5v_MCY6GNUBTO8-D3XoAg' },
    { name: 'Sony SAB', id: 'UC6-F5tO8uklgE9Zy8IvbdFw' },
    { name: 'BangtanTV (BTS)', id: 'UC3IZKseVpdzPSBaWxBxundA' },
    { name: 'Justin Bieber', id: 'UCIwFjwMjI0y7PDBVEO9-bkQ' },
    { name: 'Marshmello', id: 'UCeLHszkByNZtPKcaVXOCOQQ' },
    { name: 'HYBE LABELS', id: 'UC3IZKseVpdzPSBaWxBxundA' },
];

// Dummy video data for subscribed channels
const recentVideos = [
    {
        id: '1',
        title: 'I Gave $1,000,000 To Random People',
        channelName: 'MrBeast',
        channelId: 'UCX6OQ3DkcsbYNE6H8uQQuVA',
        thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        publishedAt: '2 days ago',
        duration: '15:42',
        views: '25M',
    },
    {
        id: '2',
        title: 'Dynamite - BTS Official Music Video',
        channelName: 'BangtanTV (BTS)',
        channelId: 'UC3IZKseVpdzPSBaWxBxundA',
        thumbnail: 'https://i.ytimg.com/vi/gdZLi9oWNZg/maxresdefault.jpg',
        publishedAt: '1 week ago',
        duration: '3:19',
        views: '1.2B',
    },
    {
        id: '3',
        title: 'WWE Raw Highlights - Championship Match',
        channelName: 'WWE',
        channelId: 'UCJ5v_MCY6GNUBTO8-D3XoAg',
        thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        publishedAt: '3 days ago',
        duration: '12:35',
        views: '5.2M',
    },
    {
        id: '4',
        title: 'Happier - Marshmello ft. Bastille',
        channelName: 'Marshmello',
        channelId: 'UCeLHszkByNZtPKcaVXOCOQQ',
        thumbnail: 'https://i.ytimg.com/vi/m7Bc3pLyij0/maxresdefault.jpg',
        publishedAt: '5 days ago',
        duration: '3:54',
        views: '890M',
    },
    {
        id: '5',
        title: 'Baby - Justin Bieber ft. Ludacris',
        channelName: 'Justin Bieber',
        channelId: 'UCIwFjwMjI0y7PDBVEO9-bkQ',
        thumbnail: 'https://i.ytimg.com/vi/kffacxfA7G4/maxresdefault.jpg',
        publishedAt: '1 day ago',
        duration: '3:45',
        views: '3.1B',
    },
    {
        id: '6',
        title: 'Diana and Roma Fun Adventures',
        channelName: 'Kids Diana Show',
        channelId: 'UCk8GzjMOrta8yxDcKfylJYw',
        thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        publishedAt: '4 days ago',
        duration: '8:22',
        views: '45M',
    },
];

export default async function Home() {
    const channelIds = topYouTubeChannels
        .map((channel) => channel.id)
        .join(',');

    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${process.env.GCP_API_KEY}`
    );

    const data: YouTubeChannelsResponse = await response.json();

    return (
        <div className="container mx-auto px-6 py-8">
            <Navbar />
            <div>
                <Tabs defaultValue="home">
                    <TabsList>
                        <TabsTrigger value="home">Home</TabsTrigger>
                        <TabsTrigger value="subscriptions">
                            Subscriptions
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="home">
                        {/* Home Channels Section */}
                        <section>
                            <PageHeader
                                title="Discover Channels"
                                description="Explore and subscribe to popular YouTube channels across different categories"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {data.items.map((channel) => (
                                    <ChannelCard
                                        key={channel.id}
                                        channel={channel}
                                    />
                                ))}
                            </div>
                        </section>
                    </TabsContent>
                    <TabsContent value="subscriptions">
                        {/* Subscriptions Section */}
                        <section className="mb-12">
                            <PageHeader
                                title="Subscriptions latest videos"
                                description="Recent uploads from your subscribed channels"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {recentVideos.map((video) => (
                                    <VideoCard key={video.id} video={video} />
                                ))}
                            </div>
                        </section>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
