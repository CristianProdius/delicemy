import { AboutSection, AboutSectionResponse } from "@/types/about-section";
import {
  ContactSection,
  ContactSectionResponse,
} from "@/types/contact-section";
import { FAQSection, FAQSectionResponse } from "@/types/faq-section";
import { HeroSection, StrapiResponse } from "@/types/hero";
import {
  ProductsSectionContent,
  ProductsSectionResponse,
} from "@/types/products-section";

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  const response = await fetch(`${strapiUrl}/api${endpoint}`, mergedOptions);

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch Hero Section data
 */
// lib/strapi.ts
export async function getHeroSection(): Promise<HeroSection | null> {
  const token =
    process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  try {
    const data = await fetchAPI<StrapiResponse<HeroSection>>(
      "/hero-section?populate=*", // This will populate all fields
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching hero section:", error);
    return null;
  }
}

/**
 * Fetch Products Section content
 */
export async function getProductsSectionContent(): Promise<ProductsSectionContent | null> {
  const token =
    process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  try {
    const data = await fetchAPI<ProductsSectionResponse>("/products-section", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return data.data;
  } catch (error) {
    console.error("Error fetching products section content:", error);
    return null;
  }
}

/**
 * Fetch About Section data
 */
export async function getAboutSection(): Promise<AboutSection | null> {
  const token =
    process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  try {
    const data = await fetchAPI<AboutSectionResponse>("/about-section", {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    return data.data;
  } catch (error) {
    console.error("Error fetching about section:", error);
    return null;
  }
}

/**
 * Fetch Contact Section data
 */
export async function getContactSection(): Promise<ContactSection | null> {
  const token =
    process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  try {
    const data = await fetchAPI<ContactSectionResponse>(
      "/contact-section?populate[socialLinks]=*&populate[businessHours]=*&populate[locations]=*",
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching contact section:", error);
    return null;
  }
}

/**
 * Fetch FAQ Section data
 */
export async function getFAQSection(): Promise<FAQSection | null> {
  const token =
    process.env.STRAPI_API_TOKEN || process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

  try {
    const data = await fetchAPI<FAQSectionResponse>(
      "/faq-section?populate=*", // Simpler populate like contact-section
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching FAQ section:", error);
    return null;
  }
}
