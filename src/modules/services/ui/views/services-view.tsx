"use client";

import Products from "@/components/products";
import { Service } from "@/types/strapi";

interface ProductsViewProps {
  services: Service[];
}

export const ProductsView = ({ services }: ProductsViewProps) => {
  return (
    <>
      <Products services={services} />
    </>
  );
};
