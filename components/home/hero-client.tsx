'use client';

import HeroSection from './hero-section';

interface HeroClientProps {
    onExploreChannels: () => void;
    onViewSubscriptions: () => void;
}

export default function HeroClient({ onExploreChannels, onViewSubscriptions }: HeroClientProps) {
    return (
        <HeroSection
            onExploreChannels={onExploreChannels}
            onViewSubscriptions={onViewSubscriptions}
        />
    );
}
