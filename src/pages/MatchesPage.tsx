import React from 'react';
import { Container, Heading, SectionWrapper, Card, Badge, Button } from '@/components/ui';
import { matchesDemoData } from '@/content/matches';

export const MatchesPage: React.FC = () => {
  return (
    <SectionWrapper bg="white" padding="xl" style={{ paddingTop: '8rem' }}>
      <Container>
        <Heading
          level="h1"
          displayStyle="section"
          eyebrow="Schedule & Results"
          subtitle="Fixtures, kick-off times, and recent match recaps."
        >
          Match <span className="text-editorial-italic">Centre</span>
        </Heading>

        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {matchesDemoData.map((match) => (
            <Card key={match.id} variant="default" padding="md">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div>
                  <Badge variant={match.status === 'live' ? 'live' : match.status === 'completed' ? 'dark' : 'accent'}>
                    {match.status}
                  </Badge>
                  <span style={{ marginLeft: '0.75rem', fontSize: '0.8125rem', color: 'var(--color-grey-medium)' }}>
                    {match.competition} • {match.venue}
                  </span>
                </div>
                <div style={{ fontWeight: 600, fontSize: '1.125rem' }}>
                  {match.homeTeam.name} {match.score ? `${match.score.home} - ${match.score.away}` : 'vs'}{' '}
                  {match.awayTeam.name}
                </div>
                <Button href={`/matches/${match.id}`} variant="secondary" size="sm">
                  Match Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
};
