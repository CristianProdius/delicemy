"use client";

import About from "../components/about";
import Contact from "../components/contact";
import FAQ from "../components/faq";
import Hero from "../components/hero";
import Products from "../../../../components/products";

import { Service } from "@/types/strapi";
import { HeroSection } from "@/types/hero";
import { ProductsSectionContent } from "@/types/products-section";
import { AboutSection } from "@/types/about-section";
import { ContactSection } from "@/types/contact-section";
import { FAQSection } from "@/types/faq-section";

interface HomeViewProps {
  services: Service[];
  heroData: HeroSection;
  productsSectionContent: ProductsSectionContent;
  aboutSectionContent: AboutSection;
  contactSectionContent: ContactSection;
  faqSectionContent: FAQSection;
}

export const HomeView = ({
  services,
  heroData,
  productsSectionContent,
  aboutSectionContent,
  contactSectionContent,
  faqSectionContent,
}: HomeViewProps) => {
  return (
    <>
      <Hero heroData={heroData} />
      <Products services={services} content={productsSectionContent} />
      <About content={aboutSectionContent} />
      <Contact content={contactSectionContent} />
      <FAQ content={faqSectionContent} />
    </>
  );
};
