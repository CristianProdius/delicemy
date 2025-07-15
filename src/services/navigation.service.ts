import { NavigationData, NavigationResponse } from "@/types/navigation";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export class NavigationService {
  static async getNavigation(): Promise<NavigationData | null> {
    try {
      const response = await fetch(`${STRAPI_URL}/api/navigation?populate=*`, {
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          revalidate: 60,
          tags: ["navigation"],
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch navigation");
      }

      const result: NavigationResponse = await response.json();
      return result.data;
    } catch (error) {
      console.error("Error fetching navigation:", error);
      return null;
    }
  }
}
