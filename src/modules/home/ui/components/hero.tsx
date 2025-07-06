"use client";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export default function DeliceHeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br ]">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-[#B8956A]/5 to-[#A67E52]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-16 w-48 h-48 bg-gradient-to-br from-[#D4B896]/5 to-[#B8956A]/3 rounded-full blur-3xl" />
      </div>

      {/* Content container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Brand Name */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl lg:text-7xl font-light text-neutral-800 tracking-tight"
              >
                Olesea
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-5xl lg:text-7xl font-light text-[#B8956A] tracking-tight"
              >
                Kolomiiets
              </motion.h1>
            </div>

            {/* Brand Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4 max-w-md"
            >
              <p className="text-xl text-neutral-700 font-light leading-relaxed">
                Crafting artisanal chocolate experiences that celebrate the
                harmony of
                <span className="text-[#B8956A] font-medium">
                  {" "}
                  cocoa & berries
                </span>
                .
              </p>
              <p className="text-sm text-neutral-500 leading-relaxed">
                From intimate workshops to bespoke consulting, discover the art
                of chocolate through passionate craftsmanship and refined
                technique.
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-6"
            >
              <Button
                className="px-8 py-3 bg-[#B8956A] text-white font-medium hover:bg-[#A67E52] transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl rounded-full"
                variant="default"
              >
                Explore Our Craft
              </Button>
              <Button
                className="px-8 py-3 bg-transparent text-[#B8956A] font-medium border-2 border-[#B8956A] hover:border-[#A67E52] hover:bg-[#B8956A] hover:text-white transition-all duration-300 rounded-full"
                variant="outline"
              >
                Book Experience
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Premium Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Main visual container */}
              <div className="relative w-80 h-96 lg:w-96 lg:h-[28rem] rounded-3xl overflow-hidden bg-gradient-to-br from-[#F8F6F3] via-white to-[#F0EDE8] shadow-2xl border border-[#B8956A]/10">
                {/* Elegant placeholder inspired by chocolate artistry */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  {/* Stylized chocolate elements */}
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#B8956A] to-[#A67E52] rounded-full shadow-lg"></div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-[#D4B896] to-[#C8A578] rounded-full"></div>
                    <div className="absolute -bottom-1 -left-3 w-6 h-6 bg-gradient-to-br from-[#C8A578] to-[#B8956A] rounded-full"></div>
                  </div>

                  {/* Decorative elements */}
                  <div className="space-y-3 text-center">
                    <div className="h-3 w-32 bg-gradient-to-r from-[#B8956A]/30 to-[#A67E52]/20 rounded-full mx-auto"></div>
                    <div className="h-2 w-24 bg-gradient-to-r from-[#D4B896]/40 to-[#C8A578]/30 rounded-full mx-auto"></div>
                    <div className="h-2 w-20 bg-gradient-to-r from-[#C8A578]/30 to-[#B8956A]/20 rounded-full mx-auto"></div>
                  </div>

                  {/* Subtle brand element */}
                  <div className="mt-8 text-center">
                    <p className="text-[#B8956A] font-light text-sm tracking-wider">
                      DÉLICE
                    </p>
                    <p className="text-[#A67E52] font-light text-xs tracking-wide opacity-70">
                      Chocolate & Berries
                    </p>
                  </div>
                </div>

                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#B8956A]/5 to-transparent"></div>
              </div>

              {/* Floating accent elements */}
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
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br from-[#B8956A]/20 to-[#A67E52]/10 shadow-lg backdrop-blur-sm border border-[#B8956A]/20"
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
                className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#D4B896]/30 to-[#C8A578]/20 shadow-lg backdrop-blur-sm border border-[#C8A578]/20"
              ></motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
  );
}
