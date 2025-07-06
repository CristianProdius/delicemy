"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export default function FAQ() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const faqData: FAQItem[] = [
    {
      id: 1,
      question: "What experience level is required for chocolate workshops?",
      answer:
        "Our workshops welcome everyone! We offer programs for complete beginners who have never worked with chocolate, as well as advanced masterclasses for professional pastry chefs. Each session is tailored to your skill level, ensuring you learn at the perfect pace.",
      category: "Workshops",
    },
    {
      id: 2,
      question: "How long are the chocolate making sessions?",
      answer:
        "Session lengths vary depending on the program. Beginner workshops typically run 2-3 hours, while comprehensive courses can span full days or weekends. Our 'Chocolate Startup' program is an intensive multi-day experience covering everything from tempering to business fundamentals.",
      category: "Workshops",
    },
    {
      id: 3,
      question: "Do you provide all materials and equipment?",
      answer:
        "Absolutely! We provide all premium chocolate, tools, molds, and equipment needed for your session. You'll work with high-quality Belgian and Swiss chocolates, professional tempering machines, and industry-standard tools. Just bring your creativity and appetite for learning!",
      category: "Workshops",
    },
    {
      id: 4,
      question: "Can you accommodate dietary restrictions or allergies?",
      answer:
        "Yes, we can work with most dietary requirements including dairy-free, vegan, and nut-free options. Please inform us of any allergies or restrictions when booking so we can prepare appropriate alternatives and ensure a safe, enjoyable experience for everyone.",
      category: "Workshops",
    },
    {
      id: 5,
      question: "What does your HoReCa consulting service include?",
      answer:
        "Our restaurant and hotel consulting covers menu development, signature dessert creation, chocolate bar setup, staff training, and complete production workflows. We help establish your chocolate program from concept to implementation, including supplier recommendations and cost optimization.",
      category: "Consulting",
    },
    {
      id: 6,
      question: "How far in advance should I book an event or workshop?",
      answer:
        "For individual workshops, we recommend booking 1-2 weeks in advance. Private events and corporate sessions should be booked 3-4 weeks ahead to ensure availability. For large groups or custom programs, please contact us at least 6-8 weeks prior to your desired date.",
      category: "Events",
    },
    {
      id: 7,
      question: "Do you offer group discounts for corporate events?",
      answer:
        "Yes! We offer special pricing for corporate groups, team building events, and private parties. Group rates apply for 8 or more participants. Contact us for a custom quote based on your group size, duration, and specific requirements.",
      category: "Events",
    },
    {
      id: 8,
      question: "What's included in a custom chocolate gift order?",
      answer:
        "Custom gifts can include personalized chocolate bars, branded packaging, chocolate business cards, decorative pieces, and themed gift sets. We work with you to create unique designs that reflect your brand or occasion, with options for custom molds and packaging.",
      category: "Gifts",
    },
    {
      id: 9,
      question: "How long does it take to create custom chocolate designs?",
      answer:
        "Simple custom pieces typically take 1-2 weeks, while complex molds or large orders may require 3-4 weeks. For urgent requests, we offer express services with additional fees. We'll provide a detailed timeline when discussing your specific project requirements.",
      category: "Gifts",
    },
    {
      id: 10,
      question: "Do you offer online workshops or virtual consultations?",
      answer:
        "Yes! We offer virtual chocolate workshops where we ship ingredients and materials to participants beforehand. Online consultations are available for menu development and business guidance. Virtual sessions maintain the same quality instruction as our in-person experiences.",
      category: "Workshops",
    },
  ];

  const categories = [
    "All",
    ...Array.from(new Set(faqData.map((item) => item.category))),
  ];

  const filteredFAQs =
    selectedCategory === "All"
      ? faqData
      : faqData.filter((item) => item.category === selectedCategory);

  const toggleFAQ = (id: number) => {
    setActiveId(activeId === id ? null : id);
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
            Frequently Asked
            <br />
            <span className="font-medium text-[#B8956A]">Questions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed"
          >
            Everything you need to know about our chocolate workshops,
            consulting services, and custom creations. Can&apos;t find your
            answer? We&apos;re here to help.
          </motion.p>
        </motion.div>

        {/* Category Filter */}
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

        {/* FAQ List */}
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
                  <span className="text-xs font-medium text-[#B8956A] bg-[#B8956A]/10 px-3 py-1 rounded-full">
                    {faq.category}
                  </span>
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
                      <div className="pl-16">
                        <p className="text-neutral-600 leading-relaxed">
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 p-8 bg-gradient-to-br from-[#B8956A]/5 to-[#A67E52]/3 rounded-3xl border border-[#B8956A]/10"
        >
          <h3 className="text-xl font-medium text-neutral-800 mb-3">
            Still have questions?
          </h3>
          <p className="text-neutral-600 mb-6 max-w-md mx-auto">
            Our team is here to help you find the perfect chocolate experience
            or answer any specific questions about our services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-[#B8956A] text-white font-medium hover:bg-[#A67E52] transition-all duration-300 rounded-full shadow-lg hover:shadow-xl">
              Contact Us
            </button>
            <button className="px-8 py-3 bg-transparent text-[#B8956A] font-medium border-2 border-[#B8956A] hover:bg-[#B8956A] hover:text-white transition-all duration-300 rounded-full">
              Book a Call
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
