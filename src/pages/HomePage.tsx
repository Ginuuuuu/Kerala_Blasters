import React from 'react';
import { HeroSection } from '@/components/hero';
import { OverlappingIntro } from '@/components/standsFor';

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* Major Visual Milestone: Phase 2 Hero Section */}
      <HeroSection />

      {/* Major Visual Milestone: Phase 3 Overlapping Intro & Horizontal Carousel */}
      <OverlappingIntro />
    </div>
  );
};
