export type ProjectCategory = 'ALL' | 'SOCIAL MEDIA' | 'POSTER' | 'FLYER' | 'BRANDING' | 'T-SHIRT';

export interface Project {
  id: string;
  title: string;
  category: 'SOCIAL MEDIA' | 'POSTER' | 'FLYER' | 'BRANDING' | 'T-SHIRT';
  year: string;
  client?: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  heroImage: string;
  images: string[];
  tools: string[];
  aspectRatio?: 'tall' | 'wide' | 'square';
  featured?: boolean;
  accentColor?: string;
  tags: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  iconName: string;
}

export interface CreativeStep {
  number: string;
  title: string;
  summary: string;
  details: string;
}

export interface ToolItem {
  name: string;
  category: string;
  badge: string;
}
