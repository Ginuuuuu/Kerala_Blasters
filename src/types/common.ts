export type DataSource = 'demo' | 'verified' | 'live';

export interface ImageAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
  sourceCredit?: string;
}

export interface LinkItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface SocialLink {
  platform: 'instagram' | 'twitter' | 'youtube' | 'facebook';
  label: string;
  href: string;
  handle: string;
}
