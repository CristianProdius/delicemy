"use client";

import About from "../components/about";
import Contact from "../components/contact";
import FAQ from "../components/faq";
import Hero from "../components/hero";
import Products from "../../../../components/products";

import { Service } from "@/types/strapi";
import { HeroSection } from "@/types/hero";
import { ProductsSectionContent } from "@/types/products-section";

interface HomeViewProps {
  services: Service[];
  heroData: HeroSection | null;
  productsSectionContent: ProductsSectionContent | null;
}

export const HomeView = ({
  services,
  heroData,
  productsSectionContent,
}: HomeViewProps) => {
  return (
    <>
      <Hero heroData={heroData} />
      <Products services={services} content={productsSectionContent} />
      <About />
      <Contact />
      <FAQ />
    </>
  );
};
