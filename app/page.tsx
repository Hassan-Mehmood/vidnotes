import Navbar from '@/components/ui/navbar';
import HomeClient from '@/components/home/home-client';
import { YouTubeChannelsResponse, ChannelItem } from '@/types/youtube';

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

async function fetchYouTubeChannels(): Promise<ChannelItem[]> {
    const channelIds = topYouTubeChannels
        .map((channel) => channel.id)
        .join(',');

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${process.env.GCP_API_KEY}`,
            { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status}`);
        }

        const data: YouTubeChannelsResponse = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error fetching YouTube channels:', error);
        // Return empty array as fallback
        return [];
    }
}

export default async function Home() {
    // Fetch YouTube channels data on the server
    const channels = await fetchYouTubeChannels();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <HomeClient channels={channels} />

            {/* Footer */}
            <footer className="mt-24 bg-gray-900 text-white py-16">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    VidNotes
                                </h3>
                            </div>
                            <p className="text-gray-400 mb-6 max-w-md">
                                Your ultimate YouTube discovery platform. Find
                                trending channels, manage subscriptions, and
                                never miss content from your favorite creators.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Features</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Channel Discovery</li>
                                <li>Subscription Management</li>
                                <li>Video Tracking</li>
                                <li>Trending Content</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Support</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>Help Center</li>
                                <li>Contact Us</li>
                                <li>Privacy Policy</li>
                                <li>Terms of Service</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 VidNotes. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
