"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/types/hero";

interface HeroProps {
  heroData: HeroSection;
}

export default function DeliceHeroSection({ heroData }: HeroProps) {
  // Fallback values if data is not available
  if (!heroData) return null;

  const {
    firstName,
    lastName,
    tagline,
    taglineHighlight,
    description,
    primaryButton,
    secondaryButton,
    visualElement,
  } = heroData;

  const primaryBtn = Array.isArray(primaryButton)
    ? primaryButton[0]
    : primaryButton;
  const secondaryBtn = Array.isArray(secondaryButton)
    ? secondaryButton[0]
    : secondaryButton;
  const visual = Array.isArray(visualElement)
    ? visualElement[0]
    : visualElement;

  const primaryButtonText = primaryBtn?.text;
  const primaryButtonHref = primaryBtn?.href || "#";
  const secondaryButtonText = secondaryBtn?.text;
  const secondaryButtonHref = secondaryBtn?.href || "#";

  const showVisualPlaceholder = visual?.showFloatingElements;
  const visualBrandName = visual?.brandName;
  const visualBrandTagline = visual?.brandTagline;

  // Extract image URL - Strapi returns image directly without data wrapper
  const imageUrl = heroData?.image?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${heroData.image.url}`
    : null;

  const imageAlt = heroData?.image?.alternativeText;

  return (
    <main className="relative w-full overflow-x-hidden">
      <section className="relative min-h-[100vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden pt-[72px] lg:pt-[80px] max-w-6xl mx-auto">
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-[#B8956A]/5 to-[#A67E52]/3 rounded-full blur-3xl" />
          <div className="absolute bottom-32 left-16 w-48 h-48 bg-gradient-to-br from-[#D4B896]/5 to-[#B8956A]/3 rounded-full blur-3xl" />
        </div>

        {/* Content container - Adjusted for navbar spacing */}
        <div className="relative z-10 container mx-auto px-6 py-6 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center min-h-[calc(100vh-144px)] lg:min-h-auto">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1"
            >
              {/* Brand Name */}
              <div className="space-y-2">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-neutral-800 tracking-tight"
                >
                  {firstName}
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-[#B8956A] tracking-tight"
                >
                  {lastName}
                </motion.h1>
              </div>

              {/* Brand Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4 max-w-md mx-auto lg:mx-0"
              >
                <p className="text-lg sm:text-xl text-neutral-700 font-light leading-relaxed">
                  {tagline}
                  <span className="text-[#B8956A] font-medium">
                    {" "}
                    {taglineHighlight}
                  </span>
                  .
                </p>
                <p className="text-sm text-neutral-500 leading-relaxed">
                  {description}
                </p>
              </motion.div>

              {/* Actions - Responsive button layout */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6"
              >
                {primaryButtonText && (
                  <Link href={primaryButtonHref} className="w-full sm:w-auto">
                    <Button
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-[#B8956A] text-white font-medium hover:bg-[#A67E52] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl rounded-full"
                      variant="default"
                    >
                      {primaryButtonText}
                    </Button>
                  </Link>
                )}
                {secondaryButtonText && (
                  <Link href={secondaryButtonHref} className="w-full sm:w-auto">
                    <Button
                      className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-transparent text-[#B8956A] font-medium border-2 border-[#B8956A] hover:border-[#A67E52] hover:bg-[#B8956A] hover:text-white transition-all duration-300 rounded-full"
                      variant="outline"
                    >
                      {secondaryButtonText}
                    </Button>
                  </Link>
                )}
              </motion.div>
            </motion.div>

            {/* Right: Your Picture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="relative flex justify-center lg:justify-end order-1 lg:order-2"
            >
              <div className="relative">
                {/* Main image container - Adjusted for mobile with navbar */}
                <div className="relative w-[280px] h-[320px] sm:w-[340px] sm:h-[400px] lg:w-96 lg:h-[28rem] rounded-3xl overflow-hidden shadow-2xl">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={
                        imageAlt ||
                        `${firstName} ${lastName} - Chocolate Artisan`
                      }
                      fill
                      className="object-cover"
                      priority
                    />
                  )}

                  {/* Subtle overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#B8956A]/10 via-transparent to-transparent"></div>

                  {/* Optional: Add a border or frame effect */}
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-[#B8956A]/20"></div>
                </div>

                {/* Floating accent elements */}
                {showVisualPlaceholder && (
                  <>
                    <motion.div
                      animate={{
                        y: [0, -12, 0],
                        rotate: [0, 3, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="absolute -top-4 -right-4 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-gradient-to-br from-[#B8956A]/20 to-[#A67E52]/10 shadow-lg backdrop-blur-sm border border-[#B8956A]/20"
                    ></motion.div>

                    <motion.div
                      animate={{
                        y: [0, 10, 0],
                        rotate: [0, -3, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                      className="absolute -bottom-6 -left-6 w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gradient-to-br from-[#D4B896]/30 to-[#C8A578]/20 shadow-lg backdrop-blur-sm border border-[#C8A578]/20"
                    ></motion.div>
                  </>
                )}

                {/* Optional: Add a subtle badge or label */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="absolute bottom-3 left-3 right-3 lg:bottom-4 lg:left-4 lg:right-4 bg-white/90 backdrop-blur-sm rounded-xl lg:rounded-2xl p-2 lg:p-3 shadow-lg"
                >
                  <p className="text-[#B8956A] font-medium text-xs lg:text-sm">
                    {visualBrandName}
                  </p>
                  <p className="text-neutral-600 text-xs">
                    {visualBrandTagline}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-6 h-10 border-2 border-[#B8956A]/40 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-[#B8956A] rounded-full mt-2"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
