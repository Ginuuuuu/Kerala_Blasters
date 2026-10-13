import React from 'react';
import { Container, Heading, SectionWrapper, Card, Badge } from '@/components/ui';
import { clubHonours, clubFacts, clubPillars } from '@/content/club';

export const ClubPage: React.FC = () => {
  return (
    <SectionWrapper bg="white" padding="xl" style={{ paddingTop: '8rem' }}>
      <Container>
        <Heading
          level="h1"
          displayStyle="section"
          eyebrow="Club Identity & Honours"
          subtitle="The heritage, honours, and foundational pillars of Kerala Blasters FC."
        >
          Club & <span className="text-editorial-italic">History</span>
        </Heading>

        {/* Facts */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginTop: '3rem',
          }}
        >
          {clubFacts.map((fact, index) => (
            <Card key={index} variant="soft" padding="md">
              <span className="text-eyebrow">{fact.label}</span>
              <h3 style={{ marginTop: '0.5rem', fontSize: '1.25rem' }}>{fact.value}</h3>
              {fact.subtext && (
                <p style={{ marginTop: '0.25rem', fontSize: '0.8125rem', color: 'var(--color-grey-medium)' }}>
                  {fact.subtext}
                </p>
              )}
            </Card>
          ))}
        </div>

        {/* Pillars */}
        <div style={{ marginTop: '4rem' }}>
          <Heading level="h2" displayStyle="subheading" eyebrow="Foundational Core">
            The Three Pillars
          </Heading>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              marginTop: '1.5rem',
            }}
          >
            {clubPillars.map((pillar) => (
              <Card key={pillar.id} variant="default" padding="lg">
                <span className="text-eyebrow text-eyebrow-accent">{pillar.eyebrow}</span>
                <h3 style={{ marginTop: '0.75rem', fontSize: '1.5rem' }}>{pillar.title}</h3>
                <p style={{ marginTop: '0.75rem', color: 'var(--color-grey-medium)', lineHeight: 1.6 }}>
                  {pillar.summary}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Verified Honours */}
        <div style={{ marginTop: '4rem' }}>
          <Heading level="h2" displayStyle="subheading" eyebrow="Verified Trophies & Milestones">
            Honours Cabinet
          </Heading>
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {clubHonours.map((honour) => (
              <Card key={honour.id} variant="default" padding="md">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '1.125rem' }}>{honour.competition}</span>
                    <span style={{ marginLeft: '1rem', color: 'var(--color-grey-medium)', fontSize: '0.875rem' }}>
                      {honour.seasonOrYear}
                    </span>
                  </div>
                  <Badge variant="accent">{honour.achievement}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
};
