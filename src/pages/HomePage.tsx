import React from 'react';
import { Container, Heading, Button, SectionWrapper, Badge } from '@/components/ui';

export const HomePage: React.FC = () => {
  return (
    <div>
      <SectionWrapper bg="black" padding="xl" style={{ paddingTop: '8rem' }}>
        <Container>
          <div style={{ maxWidth: '900px' }}>
            <Badge variant="accent" style={{ marginBottom: '1.5rem' }}>
              Phase 1 Application Foundation
            </Badge>
            <Heading
              level="h1"
              displayStyle="hero"
              eyebrow="Kerala Blasters FC"
              subtitle="Editorial football brand experience with modern typography and cinematic storytelling."
            >
              The Pitch. <span className="text-editorial-italic">The Spirit.</span>
            </Heading>
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Button href="/team" variant="primary" size="lg">
                Explore The Squad
              </Button>
              <Button href="/matches" variant="outline" size="lg">
                Match Centre
              </Button>
            </div>
          </div>
        </Container>
      </SectionWrapper>

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
