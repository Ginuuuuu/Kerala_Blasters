import React from 'react';
import { Container, Heading, SectionWrapper, Button } from '@/components/ui';

export const NotFoundPage: React.FC = () => {
  return (
    <SectionWrapper bg="black" padding="xl" style={{ paddingTop: '10rem', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <Container>
        <div style={{ maxWidth: '600px' }}>
          <span className="text-eyebrow text-eyebrow-accent">Error 404</span>
          <Heading
            level="h1"
            displayStyle="hero"
            subtitle="The page you requested is not on the pitch or has moved."
            style={{ marginTop: '1rem', color: 'var(--color-white)' }}
          >
            Offside.
          </Heading>
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem' }}>
            <Button href="/" variant="accent" size="lg">
              Return to Pitch
            </Button>
            <Button href="/matches" variant="outline" size="lg">
              Match Schedule
            </Button>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
};
