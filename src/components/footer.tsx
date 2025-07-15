"use client";
import Link from "next/link";
import Image from "next/image";
import { useNavigation } from "@/context/navigation.context";

// Footer skeleton for loading state
const FooterSkeleton = () => {
  return (
    <footer className="bg-gray-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <div className="w-24 h-6 bg-gray-200 animate-pulse rounded" />
              <div className="space-y-2">
                {[1, 2, 3].map((j) => (
                  <div
                    key={j}
                    className="w-32 h-4 bg-gray-200 animate-pulse rounded"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default function Footer() {
  const { navigation, loading } = useNavigation();

  if (loading) {
    return <FooterSkeleton />;
  }

  // Sort footer items by order
  const footerItems =
    navigation?.footer?.sort((a, b) => a.order - b.order) || [];

  // Group footer items by order ranges for columns
  const footerColumns = {
    company: footerItems.filter((item) => item.order < 100),
    resources: footerItems.filter(
      (item) => item.order >= 100 && item.order < 200
    ),
    social: footerItems.filter((item) => item.order >= 200 && item.order < 300),
    legal: footerItems.filter((item) => item.order >= 300),
  };

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image src="/logo.png" alt="DÉLICE Logo" width={48} height={48} />
              <span className="font-medium text-[#B8956A] text-xl">
                Alexa Dell
              </span>
            </Link>
            <p className="text-sm text-gray-600">
              Professional makeup artist and beauty expert.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              {footerColumns.company.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    target={item.target}
                    className="text-sm text-gray-600 hover:text-[#B8956A] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerColumns.resources.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    target={item.target}
                    className="text-sm text-gray-600 hover:text-[#B8956A] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
            <ul className="space-y-2">
              {footerColumns.social.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    target={item.target}
                    rel={
                      item.target === "_blank"
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-sm text-gray-600 hover:text-[#B8956A] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Alexa Dell. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              {footerColumns.legal.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  target={item.target}
                  className="text-sm text-gray-600 hover:text-[#B8956A] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
