"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    icon?: string;
    category?: string;
    accent?: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
        className
      )}
    >
      {items.map((item, idx) => (
        <motion.a
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-gradient-to-br from-[#B8956A]/10 to-[#A67E52]/5 block rounded-2xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.2 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.2, delay: 0.1 },
                }}
              />
            )}
          </AnimatePresence>

          <Card>
            {/* Accent Gradient Bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                item.accent || "from-[#B8956A] to-[#A67E52]"
              } rounded-t-2xl`}
            />

            {/* Category Badge */}
            {item.category && (
              <div className="absolute top-6 right-6 z-20">
                <span className="px-3 py-1.5 text-xs font-medium bg-[#B8956A]/10 text-[#B8956A] rounded-full border border-[#B8956A]/20">
                  {item.category}
                </span>
              </div>
            )}

            {/* Icon */}
            {item.icon && (
              <div className="mb-6 pt-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#B8956A]/10 to-[#A67E52]/5 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl">{item.icon}</span>
                </div>
              </div>
            )}

            {/* Content */}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>

            {/* Learn More Link */}
            <div className="mt-8 pt-6 border-t border-neutral-100">
              <span className="text-sm font-medium text-[#B8956A] group-hover:text-[#A67E52] transition-colors duration-200 flex items-center gap-2">
                Discover More
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </Card>
        </motion.a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden bg-white border border-neutral-100 group-hover:border-[#B8956A]/30 relative z-20 transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:shadow-[#B8956A]/10",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-neutral-800 font-semibold tracking-wide text-xl mb-4 leading-tight",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "text-neutral-600 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
