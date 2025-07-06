import { HomeView } from "@/modules/home/ui/views/home-view";
import { fetchAPI, getHeroSection } from "@/lib/strapi";
import { Service, StrapiResponse } from "@/types/strapi";

async function getServices() {
  try {
    const response = await fetchAPI<StrapiResponse<Service[]>>("/services", {
      next: { revalidate: 60 },
    });
    // Sort and filter as before
    const sortedServices = response.data
      .filter((service) => service.isActive)
      .sort((a, b) => a.order - b.order);

    return sortedServices;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function Home() {
  const [services, heroData] = await Promise.all([
    getServices(),
    getHeroSection(),
  ]);

  return <HomeView services={services} heroData={heroData} />;
}
