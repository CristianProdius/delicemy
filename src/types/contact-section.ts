import { StrapiMeta } from "./strapi-shared";

// types/contact-section.ts
export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

export interface BusinessHours {
  id: number;
  day: string;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

export interface Location {
  id: number;
  name: string;
  addressLine1: string;
  addressLine2: string;
  phone: string;
  email: string;
  isPrimary: boolean;
}

export interface ContactSection {
  id: number;
  documentId: string;
  // Header
  title: string;
  titleHighlight: string;
  description: string;
  // Form section
  formTitle: string;
  formSubtitle: string;
  formNameLabel: string;
  formNamePlaceholder: string;
  formEmailLabel: string;
  formEmailPlaceholder: string;
  formPhoneLabel: string;
  formPhonePlaceholder: string;
  formSubjectLabel: string;
  formSubjectPlaceholder: string;
  formMessageLabel: string;
  formMessagePlaceholder: string;
  formSubmitButton: string;
  formSubmittingText: string;
  formSuccessMessage: string;
  formErrorMessage: string;
  // Info section
  infoTitle: string;
  infoSubtitle: string;
  // Contact details
  phoneLabel: string;
  phone: string;
  phoneAvailability: string;
  emailLabel: string;
  email: string;
  emailResponseTime: string;
  locationLabel: string;
  addressLine1: string;
  addressLine2: string;
  // New fields
  socialLinks?: SocialLink[];
  businessHours?: BusinessHours[];
  locations?: Location[];
  // Metadata
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale?: string;
}

export interface ContactSectionResponse {
  data: ContactSection;
  meta: StrapiMeta;
}
