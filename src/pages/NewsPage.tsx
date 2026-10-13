import React from 'react';
import { Container, Heading, SectionWrapper, Card, Badge, Button } from '@/components/ui';
import { newsDemoData } from '@/content/news';

export const NewsPage: React.FC = () => {
  return (
    <SectionWrapper bg="white" padding="xl" style={{ paddingTop: '8rem' }}>
      <Container>
        <Heading
          level="h1"
          displayStyle="section"
          eyebrow="Editorial & Stories"
          subtitle="Tactical breakdowns, match reports, and club dispatches."
        >
          News & <span className="text-editorial-italic">Stories</span>
        </Heading>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
            marginTop: '3rem',
          }}
        >
          {newsDemoData.map((article) => (
            <Card key={article.id} variant="default" padding="md">
              <Badge variant="accent">{article.category}</Badge>
              <h3 style={{ marginTop: '1rem', fontSize: '1.25rem', lineHeight: 1.3 }}>
                {article.title}
              </h3>
              <p style={{ marginTop: '0.5rem', color: 'var(--color-grey-medium)', fontSize: '0.875rem' }}>
                {article.excerpt}
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-grey-medium)' }}>
                  {article.readTime}
                </span>
                <Button href={`/news/${article.slug}`} variant="ghost" size="sm">
                  Read Article →
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
};
