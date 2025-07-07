import { StrapiMeta } from "./strapi-shared";

export interface AboutSection {
  id: number;
  documentId: string;
  title: string;
  titleHighlight: string;
  titleMiddle: string;
  titleBottom: string;
  description: string;
  videoTitle: string;
  videoSubtitle: string;
  videoDuration: string;
  videoUrl: string;
  videoThumbnail?: {
    data: {
      id: number;
      attributes: {
        url: string;
        alternativeText: string;
      };
    };
  } | null;
  stats?: Stat[];
  ctaText: string;
  ctaButtonText: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string;
}

export interface Stat {
  id: number;
  value: string;
  label: string;
}

export interface AboutSectionResponse {
  data: AboutSection;
  meta: StrapiMeta;
}
