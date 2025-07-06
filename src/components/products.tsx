"use client";
import { motion } from "motion/react";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Service } from "@/types/strapi";
import { ProductsSectionContent } from "@/types/products-section";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import { JSX } from "react";

interface ProductsProps {
  services: Service[];
  content: ProductsSectionContent | null;
}

export default function ProductsSection({ services, content }: ProductsProps) {
  // Default values if content is not available
  const title = content?.title || "Our";
  const highlightedWord = content?.highlightedWord || "Expertise";
  const defaultDescription =
    "From artisanal workshops to bespoke consulting, discover our comprehensive chocolate experiences crafted with passion and precision.";

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
            {title}{" "}
            <span className="font-medium text-[#B8956A]">
              {highlightedWord}
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed"
          >
            {content?.description ? (
              <BlocksRenderer
                content={content.description as BlocksContent}
                blocks={{
                  // Custom renderers for specific block types if needed
                  paragraph: ({ children }) => (
                    <p className="mb-4 last:mb-0">{children}</p>
                  ),
                  heading: ({ children, level }) => {
                    const HeadingTag =
                      `h${level}` as keyof JSX.IntrinsicElements;
                    return (
                      <HeadingTag className="font-semibold mb-2">
                        {children}
                      </HeadingTag>
                    );
                  },
                }}
                modifiers={{
                  // Custom modifiers for text formatting
                  bold: ({ children }) => <strong>{children}</strong>,
                  italic: ({ children }) => <em>{children}</em>,
                }}
              />
            ) : (
              <p>{defaultDescription}</p>
            )}
          </motion.div>
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
