"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-4 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "blur(8px)",
        backgroundColor: visible
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(255, 255, 255, 0.90)",
        boxShadow: visible
          ? "0 4px 32px rgba(184, 149, 106, 0.15), 0 1px 1px rgba(0, 0, 0, 0.05)"
          : "0 2px 16px rgba(184, 149, 106, 0.08)",
        borderColor: visible
          ? "rgba(184, 149, 106, 0.2)"
          : "rgba(184, 149, 106, 0.1)",
        width: visible ? "80%" : "100%",
        y: visible ? 16 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-60 mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-6 py-3 lg:flex border",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "flex flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium transition duration-200",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-700 hover:text-[#B8956A] transition-colors duration-200"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-[#B8956A]/10"
              transition={{ duration: 0.2 }}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "blur(8px)",
        backgroundColor: visible
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(255, 255, 255, 0.90)",
        boxShadow: visible
          ? "0 4px 32px rgba(184, 149, 106, 0.15), 0 1px 1px rgba(0, 0, 0, 0.05)"
          : "0 2px 16px rgba(184, 149, 106, 0.08)",
        borderColor: visible
          ? "rgba(184, 149, 106, 0.2)"
          : "rgba(184, 149, 106, 0.1)",
        width: visible ? "95%" : "100%",
        paddingLeft: visible ? "16px" : "16px",
        paddingRight: visible ? "16px" : "16px",
        borderRadius: visible ? "24px" : "0px",
        y: visible ? 8 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-4 py-3 lg:hidden border-b lg:border",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute inset-x-0 top-full z-50 mx-4 mt-2 flex w-[calc(100%-2rem)] flex-col items-start justify-start gap-2 rounded-2xl bg-white/95 px-6 py-6 shadow-xl backdrop-blur-md border border-[#B8956A]/10",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="relative z-20 p-2 rounded-lg hover:bg-[#B8956A]/10 transition-colors duration-200"
      aria-label="Toggle menu"
    >
      {isOpen ? (
        <IconX className="text-[#B8956A] w-6 h-6" />
      ) : (
        <IconMenu2 className="text-[#B8956A] w-6 h-6" />
      )}
    </button>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-full text-sm font-medium relative cursor-pointer transition-all duration-200 inline-block text-center border";

  const variantStyles = {
    primary:
      "bg-[#B8956A] text-white border-[#B8956A] hover:bg-[#A67E52] hover:border-[#A67E52] shadow-lg hover:shadow-xl hover:scale-105",
    secondary:
      "bg-transparent text-[#B8956A] border-[#B8956A]/30 hover:bg-[#B8956A]/10 hover:border-[#B8956A]",
    dark: "bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800 hover:border-neutral-800 shadow-lg hover:shadow-xl",
    gradient:
      "bg-gradient-to-r from-[#B8956A] to-[#A67E52] text-white border-transparent shadow-lg hover:shadow-xl hover:scale-105",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
