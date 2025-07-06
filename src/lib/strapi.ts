import { HeroSection, StrapiResponse } from "@/types/hero";

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
