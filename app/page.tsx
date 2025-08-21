import Navbar from '@/components/ui/navbar';
import ChannelCard from '@/components/home/channel-card';
import PageHeader from '@/components/home/page-header';
import { YouTubeChannelsResponse } from '@/types/youtube';

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
            <div className="container mx-auto px-6 py-8">
                <PageHeader
                    title="Top YouTube Channels"
                    description="Discover and subscribe to the most popular YouTube channels across different categories"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {data.items.map((channel) => (
                        <ChannelCard key={channel.id} channel={channel} />
                    ))}
                </div>
            </div>
        </div>
    );
}
