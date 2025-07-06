"use client";
import { motion } from "motion/react";
import { useState } from "react";

export default function About() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="video" className="relative py-24 ">
      <div className="max-w-7xl mx-auto px-6">
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
            Discover the <span className="font-medium text-[#B8956A]">Art</span>{" "}
            of
            <br className="hidden sm:block" />
            <span className="text-[#A67E52]"> Chocolate Mastery</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed"
          >
            Step into our world where passion meets precision. Watch as we
            transform premium cocoa into extraordinary creations, sharing the
            secrets of artisanal chocolate craftsmanship that have been
            perfected through years of dedication and love.
          </motion.p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Video Player */}
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#F0EDE8] to-[#E8E2DB] border border-[#B8956A]/20">
            {/* Placeholder/Thumbnail */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#F8F6F3] via-white to-[#F0EDE8]">
              {/* Elegant video placeholder */}
              <div className="text-center space-y-6">
                {/* Play button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="mx-auto w-20 h-20 bg-gradient-to-br from-[#B8956A] to-[#A67E52] rounded-full flex items-center justify-center shadow-lg cursor-pointer group"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <svg
                    className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>

                {/* Video title */}
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-neutral-800">
                    The DÉLICE Experience
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Behind the Scenes: Crafting Chocolate Perfection
                  </p>
                </div>

                {/* Duration badge */}
                <div className="inline-flex items-center px-4 py-2 bg-[#B8956A]/10 text-[#B8956A] rounded-full text-sm font-medium border border-[#B8956A]/20">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                  </svg>
                  3:24 minutes
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-8 left-8 w-24 h-24 bg-gradient-to-br from-[#B8956A]/10 to-[#A67E52]/5 rounded-full blur-xl"></div>
              <div className="absolute bottom-8 right-8 w-32 h-32 bg-gradient-to-br from-[#D4B896]/10 to-[#C8A578]/5 rounded-full blur-xl"></div>
            </div>

            {/* Actual video element (hidden by default) */}
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0"
              >
                <video
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  poster="/video-thumbnail.jpg"
                >
                  <source src="/delice-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            )}

            {/* Gradient overlay for extra elegance */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none"></div>
          </div>

          {/* Video Stats/Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-wrap justify-center gap-8 text-center"
          >
            <div className="space-y-1">
              <p className="text-2xl font-light text-[#B8956A]">15+</p>
              <p className="text-sm text-neutral-600">Years of Expertise</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-light text-[#A67E52]">500+</p>
              <p className="text-sm text-neutral-600">Students Trained</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-light text-[#C8A578]">50+</p>
              <p className="text-sm text-neutral-600">Signature Recipes</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-light text-[#B8956A]">100%</p>
              <p className="text-sm text-neutral-600">Artisanal Quality</p>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-neutral-600 mb-6">
              Ready to begin your own chocolate journey?
            </p>
            <button className="px-8 py-3 bg-transparent text-[#B8956A] font-medium border-2 border-[#B8956A] hover:border-[#A67E52] hover:bg-[#B8956A] hover:text-white transition-all duration-300 rounded-full tracking-wide">
              Book Your Workshop Today
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
