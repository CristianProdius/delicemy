// types/faq-section.ts
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface FAQSection {
  id: number;
  documentId: string;
  // Header
  title: string;
  titleHighlight: string;
  description: string;
  // Category filter
  showCategoryFilter: boolean;
  allCategoryLabel: string;
  // CTA Section
  ctaTitle: string;
  ctaDescription: string;
  ctaButton1Text: string;
  ctaButton1Action: string;
  ctaButton2Text: string;
  ctaButton2Action: string;
  // FAQ Items
  faqItems: FAQItem[];
  // Metadata
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string;
}

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface FAQSectionResponse {
  data: FAQSection;
  meta: StrapiMeta;
}
