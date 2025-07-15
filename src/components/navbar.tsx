"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { useNavigation } from "@/context/navigation.context";
import Image from "next/image";
import Link from "next/link";

// DÉLICE Logo Component
const DeliceLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-3 px-2 py-1 text-sm font-normal text-black"
    >
      <Image src="/logo.png" alt="DÉLICE Logo" width={40} height={40} />
      <span className="font-medium text-[#B8956A] text-lg tracking-wide">
        Alexa Dell
      </span>
    </Link>
  );
};

// Loading skeleton for navbar
const NavbarSkeleton = () => {
  return (
    <div className="w-full h-[72px] lg:h-[80px] bg-white/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="w-32 h-8 bg-gray-200 animate-pulse rounded" />
        <div className="hidden lg:flex items-center gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-20 h-6 bg-gray-200 animate-pulse rounded"
            />
          ))}
        </div>
        <div className="flex gap-3">
          <div className="w-20 h-9 bg-gray-200 animate-pulse rounded-full" />
          <div className="w-20 h-9 bg-gray-200 animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  );
};

export function Nav() {
  const { navigation, loading, error } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (loading) {
    return <NavbarSkeleton />;
  }

  if (error) {
    console.error("Navigation error:", error);
    // Fallback to default navigation if API fails
  }

  // Sort navigation items by order
  const navItems = navigation?.navbar
    ?.sort((a, b) => a.order - b.order)
    ?.map((item) => ({
      name: item.label,
      link: item.url,
      target: item.target,
    })) || [
    // Fallback navigation items
    { name: "About Me", link: "#aboutme", target: "_self" },
    { name: "About Company", link: "#aboutcompany", target: "_self" },
    { name: "Délice School", link: "#deliceschool", target: "_self" },
    { name: "Délice Shop", link: "#deliceshop", target: "_self" },
    { name: "Services", link: "/services", target: "_self" },
  ];

  const ctaButtons = navigation?.ctaButtons?.sort(
    (a, b) => a.order - b.order
  ) || [
    // Fallback buttons
    { id: 1, text: "English", url: "#", variant: "secondary" as const },
    { id: 2, text: "Contact", url: "/contact", variant: "primary" as const },
  ];

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <DeliceLogo />
          <NavItems
            items={navItems}
            className="text-neutral-700 hover:text-[#B8956A]"
          />
          <div className="flex items-center gap-3">
            {ctaButtons.map((button) => (
              <NavbarButton
                key={button.id}
                variant={button.variant}
                className={
                  button.variant === "secondary"
                    ? "bg-transparent text-[#B8956A] border border-[#B8956A]/30 hover:bg-[#B8956A]/10 hover:border-[#B8956A] transition-all duration-300 px-4 py-2 rounded-full text-sm font-medium"
                    : "bg-[#B8956A] text-white hover:bg-[#A67E52] transition-all duration-300 px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl"
                }
                onClick={() => (window.location.href = button.url)}
              >
                {button.text}
              </NavbarButton>
            ))}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <DeliceLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {/* Mobile Navigation Links */}
            <div className="w-full space-y-1">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.link}
                  target={item.target}
                  className="block px-4 py-3 text-neutral-700 hover:text-[#B8956A] hover:bg-[#B8956A]/5 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile CTA Buttons */}
            <div className="mt-6 space-y-3 px-4">
              {ctaButtons.map((button) => (
                <NavbarButton
                  key={button.id}
                  variant={button.variant}
                  className={
                    button.variant === "secondary"
                      ? "w-full bg-transparent text-[#B8956A] border border-[#B8956A]/30"
                      : "w-full bg-[#B8956A] text-white"
                  }
                  onClick={() => {
                    window.location.href = button.url;
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {button.text}
                </NavbarButton>
              ))}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
