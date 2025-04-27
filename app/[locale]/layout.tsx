// app/[locale]/layout.tsx
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";

import { Section, Container, Box } from "@/components/craft";
import { siteConfig } from "@/site.config";
import { getMainMenu, getContentMenu } from "@/menu.config";

import Balancer from "react-wrap-balancer";
import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/langSwitcher/language-switcher";
import { getMenuByLanguage } from "@/lib/wordpress";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

interface NavProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  locale: string;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = (await params) || { locale: "ro" }; // Default to your default locale

  return (
    <>
      <Nav locale={locale} />
      {children}
      <Footer locale={locale} />
    </>
  );
}

const Nav = async ({ className, children, id, locale }: NavProps) => {
  // Fetch WordPress menu
  const wpMenuItems = await getMenuByLanguage(locale);

  // Use WordPress menu if available, otherwise use static menu
  const menuItems =
    wpMenuItems.length > 0
      ? wpMenuItems.map((item) => ({
          title: item.title,
          href: item.url.startsWith("/") ? item.url : `/${locale}${item.url}`,
        }))
      : Object.entries(getMainMenu(locale)).map(([key, href]) => ({
          title: key.charAt(0).toUpperCase() + key.slice(1),
          href: href,
        }));

  // Find the contact item from menu items
  const contactItem = menuItems.find(
    (item) =>
      item.title.toLowerCase().includes("contact") ||
      item.href.toLowerCase().includes("contact")
  );

  // Filter out the contact item from main menu items if found
  const mainMenuItems = contactItem
    ? menuItems.filter((item) => item !== contactItem)
    : menuItems;

  return (
    <nav
      className={cn(
        "sticky z-50 top-0 backdrop-blur-xl border-b border-border/40 bg-background/80 transition-all duration-500 ease-out",
        "after:absolute after:inset-0 after:bg-gradient-to-b after:from-background/10 after:to-transparent after:pointer-events-none",
        className
      )}
      id={id}
    >
      <Container className="!py-0 !px-4 sm:!px-6 max-w-7xl mx-auto w-full">
        <Box
          direction="row"
          className="h-16 md:h-20 items-center justify-between min-w-0"
        >
          {/* Logo - Flex-shrink-0 to prevent shrinking */}
          <Link
            className="relative group flex items-center gap-2 md:gap-3 flex-shrink-0 min-w-0"
            href={`/${locale}`}
          >
            <div className="relative overflow-hidden flex-shrink-0">
              <Image
                src={Logo}
                alt="Logo"
                loading="eager"
                className={cn(
                  "dark:invert transition-all duration-500",
                  "group-hover:scale-105 group-hover:brightness-110"
                )}
                width={40}
                height={25}
              />
              <div className="absolute inset-0 bg-primary/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </Link>

          {children}

          {/* Navigation Items - With flex overflow handling */}
          <Box
            direction="row"
            className="items-center gap-2 lg:gap-4 flex-shrink-0"
          >
            {/* Main Menu - visible on md and up */}
            <Box
              direction="row"
              className="hidden lg:flex items-center gap-1 lg:gap-2"
            >
              {mainMenuItems.map((item, index) => (
                <Button
                  key={item.href}
                  asChild
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "relative h-11 px-2 lg:px-3 xl:px-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-300 flex-shrink-0",
                    "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 after:bg-primary/70 after:transition-all after:duration-300 hover:after:w-full hover:bg-accent/50 rounded-lg"
                  )}
                  style={{
                    transitionDelay: `${index * 30}ms`,
                  }}
                >
                  <Link href={item.href} className="whitespace-nowrap">
                    {item.title}
                  </Link>
                </Button>
              ))}
            </Box>

            {/* Language Switcher - always visible */}
            <LanguageSwitcher />

            {/* Contact Button - visible on sm and up */}
            {contactItem ? (
              <Button
                asChild
                className={cn(
                  "hidden lg:flex h-9 md:h-11 px-3 lg:px-4 xl:px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
                )}
              >
                <Link href={contactItem.href} className="whitespace-nowrap">
                  {contactItem.title}
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                className={cn(
                  "hidden sm:flex h-9 md:h-11 px-4 lg:px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 rounded-lg shadow-md hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] flex-shrink-0"
                )}
              >
                <Link
                  href="https://github.com/9d8dev/next-wp"
                  className="whitespace-nowrap"
                >
                  Get Started
                </Link>
              </Button>
            )}

            {/* Mobile Navigation - only visible below md */}
            <div className="flex lg:hidden">
              <MobileNav locale={locale} menuItems={menuItems} />
            </div>
          </Box>
        </Box>
      </Container>
    </nav>
  );
};

const Footer = ({ locale }: { locale: string }) => {
  const localizedMainMenu = getMainMenu(locale);
  const localizedContentMenu = getContentMenu(locale);

  return (
    <footer>
      <Section>
        <Container className="grid md:grid-cols-[1.5fr_0.5fr_0.5fr] gap-12">
          <div className="flex flex-col gap-6 not-prose">
            <Link href={`/${locale}`}>
              <h3 className="sr-only">{siteConfig.site_name}</h3>
              <Image
                src={Logo}
                alt="Logo"
                className="dark:invert"
                width={42}
                height={26.44}
              ></Image>
            </Link>
            <p>
              <Balancer>{siteConfig.site_description}</Balancer>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Website</h5>
            {Object.entries(localizedMainMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <h5 className="font-medium text-base">Blog</h5>
            {Object.entries(localizedContentMenu).map(([key, href]) => (
              <Link
                className="hover:underline underline-offset-4"
                key={href}
                href={href}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Link>
            ))}
          </div>
        </Container>
        <Container className="border-t not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
          <ThemeToggle />
          <p className="text-muted-foreground">
            &copy; <a href="https://9d8.dev">Delice</a>. All rights reserved.
            2025-present.
          </p>
        </Container>
      </Section>
    </footer>
  );
};
