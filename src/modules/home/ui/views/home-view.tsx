"use client";

import About from "../components/about";
import Contact from "../components/contact";
import FAQ from "../components/faq";
import Hero from "../components/hero";
import Products from "../../../../components/products";

import { Service } from "@/types/strapi";

interface ProductsViewProps {
  services: Service[];
}

export const HomeView = ({ services }: ProductsViewProps) => {
  return (
    <>
      <Hero />
      <Products services={services} />
      <About />
      <Contact />
      <FAQ />
    </>
  );
};
