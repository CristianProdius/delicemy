import { ProductsView } from "@/modules/services/ui/views/services-view";
import { fetchAPI } from "@/lib/strapi";
import { Service, StrapiResponse } from "@/types/strapi";

async function getServices() {
  try {
    const response = await fetchAPI<StrapiResponse<Service[]>>("/services", {
      next: { revalidate: 60 },
    });

    // Sort by order field and filter active services
    const sortedServices = response.data
      .filter((service) => service.isActive)
      .sort((a, b) => a.order - b.order);

    return sortedServices;
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function Services() {
  const services = await getServices();

  return <ProductsView services={services} />;
}
