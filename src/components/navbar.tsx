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

import Image from "next/image";
import Link from "next/link";

// Updated DÉLICE Logo Component
const DeliceLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-3 px-2 py-1 text-sm font-normal text-black"
    >
      {/* Logo placeholder - you can replace this with your actual logo */}
      <Image src="/logo.png" alt="DÉLICE Logo" width={40} height={40} />
      <span className="font-medium text-[#B8956A] text-lg tracking-wide">
        Alexa Dell
      </span>
    </Link>
  );
};

export function Nav() {
  const navItems = [
    {
      name: "About Me",
      link: "#aboutme",
    },
    {
      name: "About Company",
      link: "#aboutcompany",
    },
    {
      name: "Délice School",
      link: "#deliceschool",
    },
    {
      name: "Délice Shop",
      link: "#deliceshop",
    },
    {
      name: "Services",
      link: "/services",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <NavbarButton
              variant="secondary"
              className="bg-transparent text-[#B8956A] border border-[#B8956A]/30 hover:bg-[#B8956A]/10 hover:border-[#B8956A] transition-all duration-300 px-4 py-2 rounded-full text-sm font-medium"
            >
              English
            </NavbarButton>
            <NavbarButton
              variant="primary"
              className="bg-[#B8956A] text-white hover:bg-[#A67E52] transition-all duration-300 px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl"
            >
              Contact
            </NavbarButton>
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
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 text-neutral-700 hover:text-[#B8956A] hover:bg-[#B8956A]/5 rounded-lg transition-all duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Action Buttons */}
            <div className="w-full pt-4 border-t border-[#B8956A]/10 space-y-3">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full px-4 py-3 bg-transparent text-[#B8956A] border border-[#B8956A]/30 hover:bg-[#B8956A]/10 hover:border-[#B8956A] transition-all duration-300 rounded-lg text-sm font-medium"
              >
                English
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full px-4 py-3 bg-[#B8956A] text-white hover:bg-[#A67E52] transition-all duration-300 rounded-lg text-sm font-medium shadow-lg"
              >
                Contact
              </button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
