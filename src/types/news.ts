import { DataSource, ImageAsset } from './common';

export type ArticleCategory = 'Match Report' | 'First Team' | 'Club News' | 'Academy' | 'Interview';

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: ArticleCategory;
  publishedAt: string; // ISO 8601 string
  readTime: string; // e.g. "3 min read"
  coverImage: ImageAsset;
  author: {
    name: string;
    role: string;
  };
  excerpt: string;
  content: string[]; // Editorial paragraphs
  tags: string[];
  isFeatured?: boolean;
  dataSource: DataSource;
}
