// types/strapi-shared.ts
// Common types used across multiple Strapi responses

// Rich text types for Strapi v5 Blocks Editor
export interface RichTextChild {
  text: string;
  type: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
}

export interface RichTextBlock {
  type: "paragraph" | "heading" | "list" | "quote" | "code" | "image" | "link";
  children: RichTextChild[];
  level?: number; // for headings (1-6)
  format?: "ordered" | "unordered"; // for lists
  image?: {
    url: string;
    alternativeText?: string;
    width?: number;
    height?: number;
  };
  url?: string; // for links
}

// Strapi Meta information
export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

// Strapi Media/Image format
export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText?: string;
      caption?: string;
      width: number;
      height: number;
      formats?: {
        thumbnail?: StrapiImageFormat;
        small?: StrapiImageFormat;
        medium?: StrapiImageFormat;
        large?: StrapiImageFormat;
      };
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl?: string;
      provider: string;
      createdAt: string;
      updatedAt: string;
    };
  } | null;
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

// Generic Strapi Response wrapper
export interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

// Generic Strapi Single Type Response
export interface StrapiSingleResponse<T> {
  data: T;
  meta: StrapiMeta;
}

// Generic Strapi Collection Response
export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: StrapiMeta;
}
