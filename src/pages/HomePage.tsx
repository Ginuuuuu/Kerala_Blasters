import React from 'react';
import { Container, Heading, SectionWrapper } from '@/components/ui';
import { HeroSection } from '@/components/hero';

export const HomePage: React.FC = () => {
  return (
    <div>
      {/* Major Visual Milestone: Phase 2 Hero Section */}
      <HeroSection />

      <SectionWrapper bg="white" padding="lg">
        <Container>
          <Heading
            level="h2"
            displayStyle="section"
            eyebrow="Foundation Status"
            subtitle="The application foundation, design tokens, typed models, and routing are established."
          >
            Design System <span className="text-editorial-italic">Ready</span>
          </Heading>
        </Container>
      </SectionWrapper>
    </div>
  );
};
