"use client";

import About from "../components/about";
import Contact from "../components/contact";
import FAQ from "../components/faq";
import Hero from "../components/hero";
import Products from "../../../../components/products";

import { Service } from "@/types/strapi";
import { HeroSection } from "@/types/hero";

interface HomeViewProps {
  services: Service[];
  heroData: HeroSection | null;
}

export const HomeView = ({ services, heroData }: HomeViewProps) => {
  return (
    <>
      <Hero heroData={heroData} />
      <Products services={services} />
      <About />
      <Contact />
      <FAQ />
    </>
  );
};
