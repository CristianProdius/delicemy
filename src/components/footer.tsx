"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const navigationLinks = [
    { name: "About Me", href: "#aboutme" },
    { name: "About Company", href: "#aboutcompany" },
    { name: "Délice School", href: "#deliceschool" },
    { name: "Délice Shop", href: "#deliceshop" },
    { name: "Pre Registration", href: "#preregistrationform" },
  ];

  const serviceLinks = [
    { name: "Chocolate Workshops", href: "#workshops" },
    { name: "HoReCa Consulting", href: "#consulting" },
    { name: "Private Events", href: "#events" },
    { name: "Custom Gifts", href: "#gifts" },
    { name: "Tastings", href: "#tastings" },
  ];

  const socialLinks = [
    { name: "Instagram", href: "#", icon: "📸" },
    { name: "Facebook", href: "#", icon: "📘" },
    { name: "LinkedIn", href: "#", icon: "💼" },
    { name: "YouTube", href: "#", icon: "📺" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-neutral-50 to-[#F8F6F3] border-t border-[#B8956A]/10">
      {/* Newsletter Section */}
      <div className="border-b border-[#B8956A]/10 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl lg:text-3xl font-light text-neutral-800 mb-4">
              Stay Connected with{" "}
              <span className="font-medium text-[#B8956A]">DÉLICE</span>
            </h3>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              Get the latest updates on workshops, recipes, and exclusive
              chocolate experiences delivered to your inbox.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="max-w-md mx-auto"
            >
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 px-4 py-3 border border-neutral-200 rounded-full bg-white/80 backdrop-blur-sm focus:border-[#B8956A] focus:ring-2 focus:ring-[#B8956A]/20 transition-all duration-300 outline-none text-neutral-800 placeholder:text-neutral-400"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-[#B8956A] text-white font-medium hover:bg-[#A67E52] transition-all duration-300 rounded-full shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  {isSubscribed ? "✓ Subscribed!" : "Subscribe"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <Image
                  src="/logo.png"
                  alt="DÉLICE Logo"
                  width={50}
                  height={50}
                />
                <span className="text-2xl font-medium text-[#B8956A] tracking-wide">
                  DÉLICE
                </span>
              </div>

              {/* Tagline */}
              <p className="text-sm font-light text-neutral-500 tracking-wider uppercase">
                Chocolate & Berries
              </p>

              {/* Description */}
              <p className="text-neutral-600 leading-relaxed max-w-md">
                Crafting extraordinary chocolate experiences through artisanal
                workshops, bespoke consulting, and premium confections. Where
                passion meets precision in every creation.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <p className="text-neutral-600">
                  <span className="font-medium">Email:</span> hello@delice.com
                </p>
                <p className="text-neutral-600">
                  <span className="font-medium">Phone:</span> +1 (555) 123-4567
                </p>
                <p className="text-neutral-600">
                  <span className="font-medium">Address:</span> 123 Artisan
                  Street, Chocolate District
                </p>
              </div>
            </motion.div>

            {/* Navigation Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="text-lg font-medium text-neutral-800">
                Navigation
              </h4>
              <ul className="space-y-3">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-neutral-600 hover:text-[#B8956A] transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="text-lg font-medium text-neutral-800">Services</h4>
              <ul className="space-y-3">
                {serviceLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-neutral-600 hover:text-[#B8956A] transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Social Media & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 pt-8 border-t border-[#B8956A]/10"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-neutral-600 mr-2">
                  Follow us:
                </span>
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-gradient-to-br from-[#B8956A]/10 to-[#A67E52]/5 rounded-full flex items-center justify-center hover:from-[#B8956A]/20 hover:to-[#A67E52]/10 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <span className="text-sm">{social.icon}</span>
                  </motion.a>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-600">
                <a
                  href="#privacy"
                  className="hover:text-[#B8956A] transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <a
                  href="#terms"
                  className="hover:text-[#B8956A] transition-colors duration-200"
                >
                  Terms of Service
                </a>
                <a
                  href="#cookies"
                  className="hover:text-[#B8956A] transition-colors duration-200"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-8 pt-6 border-t border-[#B8956A]/10 text-center"
          >
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} DÉLICE - Chocolate & Berries. All
              rights reserved.
              <br className="md:hidden" />
              <span className="hidden md:inline"> | </span>
              Crafted with ♥ for chocolate lovers everywhere.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
