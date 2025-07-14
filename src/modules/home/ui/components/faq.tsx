"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { FAQSection } from "@/types/faq-section";

interface FAQProps {
  content: FAQSection;
}

export default function FAQ({ content }: FAQProps) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Use content from Strapi or defaults
  const title = content?.title;
  const titleHighlight = content?.titleHighlight;
  const description = content?.description;
  const showCategoryFilter = content?.showCategoryFilter ?? false;
  const allCategoryLabel = content?.allCategoryLabel || "All";
  const ctaTitle = content?.ctaTitle;
  const ctaDescription = content?.ctaDescription;
  const ctaButton1Text = content?.ctaButton1Text;
  const ctaButton1Action = content?.ctaButton1Action;
  const ctaButton2Text = content?.ctaButton2Text;
  const ctaButton2Action = content?.ctaButton2Action;
  const faqItems =
    content?.faqItems && content.faqItems.length > 0
      ? content.faqItems.sort((a, b) => (a.order || 0) - (b.order || 0))
      : [];

  // Extract unique categories
  const categories = showCategoryFilter
    ? [
        allCategoryLabel,
        ...Array.from(
          new Set(faqItems.map((item) => item.category).filter(Boolean))
        ),
      ]
    : [];

  const filteredFAQs =
    selectedCategory === allCategoryLabel || !showCategoryFilter
      ? faqItems
      : faqItems.filter((item) => item.category === selectedCategory);

  const toggleFAQ = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  const handleButtonAction = (action: string) => {
    if (!action) return;

    if (
      action.startsWith("http") ||
      action.startsWith("mailto:") ||
      action.startsWith("tel:")
    ) {
      // External URL, email, or phone
      window.open(action, action.startsWith("http") ? "_blank" : "_self");
    } else if (action.startsWith("/")) {
      // Internal route
      window.location.href = action;
    } else if (action.startsWith("#")) {
      // Anchor link
      const element = document.querySelector(action);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Section ID
      const section = document.getElementById(action);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="faq" className="relative py-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-light text-neutral-800 mb-6 tracking-tight"
          >
            {title}
            <br />
            <span className="font-medium text-[#B8956A]">{titleHighlight}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Category Filter */}
        {showCategoryFilter && categories.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-[#B8956A] text-white shadow-lg"
                    : "bg-white/60 text-neutral-600 hover:bg-[#B8956A]/10 hover:text-[#B8956A] border border-neutral-200"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        )}

        {/* FAQ List */}
        {filteredFAQs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#B8956A]/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-[#B8956A]/5 transition-all duration-300 focus:outline-none focus:bg-[#B8956A]/5"
                >
                  <div className="flex items-center gap-4">
                    {faq.category && (
                      <span className="text-xs font-medium text-[#B8956A] bg-[#B8956A]/10 px-3 py-1 rounded-full">
                        {faq.category}
                      </span>
                    )}
                    <h3 className="text-lg font-medium text-neutral-800 leading-relaxed">
                      {faq.question}
                    </h3>
                  </div>

                  <motion.div
                    animate={{ rotate: activeId === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 ml-4"
                  >
                    <svg
                      className="w-5 h-5 text-[#B8956A]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {activeId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div className={faq.category ? "pl-16" : ""}>
                          <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center py-12"
          >
            <p className="text-neutral-500">
              No FAQs available in this category.
            </p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-gradient-to-br from-[#B8956A]/5 to-[#A67E52]/3 rounded-3xl border border-[#B8956A]/10"
        >
          <h3 className="text-xl font-medium text-neutral-800 mb-3">
            {ctaTitle}
          </h3>
          <p className="text-neutral-600 mb-6 max-w-md mx-auto">
            {ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleButtonAction(ctaButton1Action)}
              className="px-8 py-3 bg-[#B8956A] text-white font-medium hover:bg-[#A67E52] transition-all duration-300 rounded-full shadow-lg hover:shadow-xl"
            >
              {ctaButton1Text}
            </button>
            <button
              onClick={() => handleButtonAction(ctaButton2Action)}
              className="px-8 py-3 bg-transparent text-[#B8956A] font-medium border-2 border-[#B8956A] hover:bg-[#B8956A] hover:text-white transition-all duration-300 rounded-full"
            >
              {ctaButton2Text}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
