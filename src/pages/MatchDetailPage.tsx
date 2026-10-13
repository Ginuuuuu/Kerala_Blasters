import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Heading, SectionWrapper, Button, Badge } from '@/components/ui';
import { matchesDemoData } from '@/content/matches';

export const MatchDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const match = matchesDemoData.find((m) => m.id === id);

  if (!match) {
    return (
      <SectionWrapper bg="white" padding="xl" style={{ paddingTop: '8rem' }}>
        <Container>
          <Heading level="h1" eyebrow="Match Not Found">
            Match Details Unavailable
          </Heading>
          <div style={{ marginTop: '2rem' }}>
            <Button href="/matches" variant="primary">
              Return to Matches
            </Button>
          </div>
        </Container>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper bg="white" padding="xl" style={{ paddingTop: '8rem' }}>
      <Container>
        <Link to="/matches" style={{ display: 'inline-block', marginBottom: '1.5rem', color: 'var(--color-grey-medium)' }}>
          ← Back to Match Centre
        </Link>
        <Badge variant="accent" style={{ marginBottom: '1rem' }}>
          {match.competition}
        </Badge>
        <Heading level="h1" displayStyle="section" eyebrow={match.venue}>
          {match.homeTeam.name} vs {match.awayTeam.name}
        </Heading>
        {match.score && (
          <div style={{ marginTop: '1.5rem', fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
            {match.score.home} — {match.score.away}
          </div>
        )}
        {match.recapSummary && (
          <p style={{ marginTop: '1rem', color: 'var(--color-grey-medium)', maxWidth: '600px' }}>
            {match.recapSummary}
          </p>
        )}
      </Container>
    </SectionWrapper>
  );
};
