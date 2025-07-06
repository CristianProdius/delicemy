"use client";

import Products from "@/components/products";
import { Service } from "@/types/strapi";
import { ProductsSectionContent } from "@/types/products-section";

interface ProductsViewProps {
  services: Service[];
  productsSectionContent: ProductsSectionContent | null;
}

export const ProductsView = ({
  services,
  productsSectionContent,
}: ProductsViewProps) => {
  return (
    <>
      <Products services={services} content={productsSectionContent} />
    </>
  );
};
