"use client";

import About from "../components/about";
import Contact from "../components/contact";
import FAQ from "../components/faq";
import Hero from "../components/hero";
import Products from "../../../../components/products";

export const HomeView = () => {
  return (
    <>
      <Hero />
      <Products services={[]} />
      <About />
      <Contact />
      <FAQ />
    </>
  );
};
