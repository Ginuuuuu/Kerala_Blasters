import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Heading, SectionWrapper, Button, Badge } from '@/components/ui';
import { squadDemoData } from '@/content/team';

export const PlayerPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const player = squadDemoData.find((p) => p.slug === slug);

  if (!player) {
    return (
      <SectionWrapper bg="white" padding="xl" style={{ paddingTop: '8rem' }}>
        <Container>
          <Heading level="h1" eyebrow="Squad Member Not Found">
            Player Not Found
          </Heading>
          <div style={{ marginTop: '2rem' }}>
            <Button href="/team" variant="primary">
              Return to Squad
            </Button>
          </div>
        </Container>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper bg="white" padding="xl" style={{ paddingTop: '8rem' }}>
      <Container>
        <Link to="/team" style={{ display: 'inline-block', marginBottom: '1.5rem', color: 'var(--color-grey-medium)' }}>
          ← Back to All Players
        </Link>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
          <Badge variant="accent">#{player.number}</Badge>
          <Badge variant="default">{player.position}</Badge>
          {player.isCaptain && <Badge variant="dark">Captain</Badge>}
        </div>
        <Heading level="h1" displayStyle="hero" eyebrow={player.nationality}>
          {player.name}
        </Heading>
        <div style={{ marginTop: '2rem', maxWidth: '650px' }}>
          {player.bio.map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '1rem' }}>
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
};
