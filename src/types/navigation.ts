export interface NavigationItem {
  id: number;
  label: string;
  url: string;
  order: number;
  target?: "_self" | "_blank";
}

export interface CTAButton {
  id: number;
  text: string;
  url: string;
  variant: "primary" | "secondary";
  order: number;
}

export interface NavigationData {
  id: number;
  documentId: string;
  navbar: NavigationItem[];
  footer: NavigationItem[];
  ctaButtons: CTAButton[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Define a proper meta type
export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface NavigationResponse {
  data: NavigationData;
  meta: StrapiMeta;
}
