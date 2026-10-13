import React from 'react';
import { Container, Heading, SectionWrapper, Card, Badge, Button } from '@/components/ui';
import { squadDemoData } from '@/content/team';

export const TeamPage: React.FC = () => {
  return (
    <SectionWrapper bg="white" padding="xl" style={{ paddingTop: '8rem' }}>
      <Container>
        <Heading
          level="h1"
          displayStyle="section"
          eyebrow="First Team"
          subtitle="The complete Kerala Blasters FC squad roster for the current campaign."
        >
          The <span className="text-editorial-italic">Squad</span>
        </Heading>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
          }}
        >
          {squadDemoData.map((player) => (
            <Card key={player.id} variant="elevated" padding="md">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                  #{player.number}
                </span>
                <Badge variant={player.isCaptain ? 'accent' : 'default'}>
                  {player.position}
                </Badge>
              </div>
              <h3 style={{ marginTop: '1rem', fontSize: '1.25rem' }}>{player.name}</h3>
              <p style={{ color: 'var(--color-grey-medium)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {player.nationality}
              </p>
              <div style={{ marginTop: '1.5rem' }}>
                <Button href={`/team/${player.slug}`} variant="secondary" size="sm" fullWidth>
                  View Profile
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
};
