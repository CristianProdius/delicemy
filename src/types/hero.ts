// types/hero.ts - For Strapi v5 with flattened API

export interface Button {
  id: number;
  text: string;
  href?: string;
}

export interface VisualPlaceholder {
  id: number;
  brandName?: string;
  brandTagline?: string;
  showFloatingElements?: boolean;
}

export interface HeroSection {
  id: number;
  documentId: string; // Strapi v5 uses documentId
  firstName: string;
  lastName: string;
  tagline: string;
  taglineHighlight: string;
  description: string;
  primaryButton: Button;
  secondaryButton: Button;
  visualElement?: VisualPlaceholder;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  image?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
