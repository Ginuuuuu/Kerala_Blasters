import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Heading, SectionWrapper, Button, Badge } from '@/components/ui';
import { newsDemoData } from '@/content/news';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = newsDemoData.find((a) => a.slug === slug);

  if (!article) {
    return (
      <SectionWrapper bg="white" padding="xl" style={{ paddingTop: '8rem' }}>
        <Container>
          <Heading level="h1" eyebrow="Article Not Found">
            Story Not Found
          </Heading>
          <div style={{ marginTop: '2rem' }}>
            <Button href="/news" variant="primary">
              Return to News
            </Button>
          </div>
        </Container>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper bg="white" padding="xl" style={{ paddingTop: '8rem' }}>
      <Container>
        <Link to="/news" style={{ display: 'inline-block', marginBottom: '1.5rem', color: 'var(--color-grey-medium)' }}>
          ← Back to Stories
        </Link>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}>
          <Badge variant="accent">{article.category}</Badge>
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-grey-medium)' }}>{article.readTime}</span>
        </div>
        <Heading level="h1" displayStyle="section" eyebrow={article.author.name}>
          {article.title}
        </Heading>
        {article.subtitle && (
          <p style={{ marginTop: '1rem', fontSize: '1.125rem', color: 'var(--color-grey-medium)', maxWidth: '750px' }}>
            {article.subtitle}
          </p>
        )}
        <div style={{ marginTop: '2.5rem', maxWidth: '720px' }}>
          {article.content.map((p, i) => (
            <p key={i} style={{ marginBottom: '1.25rem', fontSize: '1.0625rem', lineHeight: 1.7 }}>
              {p}
            </p>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
};
