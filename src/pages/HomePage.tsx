import React from 'react';
import { HeroSection } from '@/components/hero';
import { OverlappingIntro } from '@/components/standsFor';
import { SquadPreview } from '@/components/player';

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* Major Visual Milestone: Phase 2 Hero Section */}
      <HeroSection />

      {/* Major Visual Milestone: Phase 3 Overlapping Intro & Horizontal Carousel */}
      <OverlappingIntro />

      {/* Major Visual Milestone: Phase 4 First Team / The Squad */}
      <SquadPreview />
    </div>
  );
};
