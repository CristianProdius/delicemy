"use client";
import { motion } from "motion/react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Service } from "@/types/strapi";

interface ProductsProps {
  services: Service[];
}

export default function ProductsSection({ services }: ProductsProps) {
  // Transform Strapi data to match your existing format
  const chocolateServices = services.map((service) => ({
    title: service.title,
    description: service.description,
    link: service.link,
    icon: service.icon,
    category: service.category,
    accent: service.accent,
  }));

  return (
    <section id="products" className="relative py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-light text-neutral-800 mb-4 tracking-tight"
          >
            Our <span className="font-medium text-[#B8956A]">Expertise</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed"
          >
            From artisanal workshops to bespoke consulting, discover our
            comprehensive chocolate experiences crafted with passion and
            precision.
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <HoverEffect items={chocolateServices} />
        </motion.div>
      </div>
    </section>
  );
}
