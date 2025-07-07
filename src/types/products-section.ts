import { RichTextBlock, StrapiMeta } from "./strapi-shared";

// types/products-section.ts
export interface ProductsSectionContent {
  id: number;
  title: string;
  highlightedWord: string;
  description: RichTextBlock[];
  // Rich text blocks from Strapi
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ProductsSectionResponse {
  data: ProductsSectionContent;
  meta: StrapiMeta;
}
