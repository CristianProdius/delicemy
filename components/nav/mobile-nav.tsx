"use client";

// React and Next Imports
import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Utility Imports
import {
  Menu,
  ArrowRightSquare,
  ChevronRight,
  Home,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Component Imports
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
  SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

import { getContentMenu } from "@/menu.config";
import { siteConfig } from "@/site.config";

interface MobileNavProps {
  locale: string;
  menuItems: Array<{ title: string; href: string }>;
}

export function MobileNav({ locale, menuItems }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const blogMenuItems = Object.entries(getContentMenu(locale)).map(
    ([key, href]) => ({
      title: key.charAt(0).toUpperCase() + key.slice(1),
      href: href,
    })
  );

  // Animation variants
  const menuVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="relative px-0 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border-[0.5px] border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <Menu className="text-primary w-5 h-5" strokeWidth={1.5} />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[85%] border-r border-white/10 bg-gradient-to-b from-background/95 to-background/80 backdrop-blur-xl shadow-2xl p-0"
      >
        <SheetHeader className="p-4 bg-gradient-to-r from-primary/5 to-transparent border-b border-white/10">
          <SheetTitle className="text-left">
            <MobileLink
              href={`/${locale}`}
              className="flex items-center gap-3 py-2 px-1 transition-colors group"
              onOpenChange={setOpen}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-primary/30 flex items-center justify-center backdrop-blur-sm shadow-lg">
                <ArrowRightSquare
                  className="h-4 w-4 text-white"
                  strokeWidth={1.5}
                />
              </div>
              <span className="font-medium text-lg tracking-tight group-hover:text-primary transition-colors">
                {siteConfig.site_name}
              </span>
            </MobileLink>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-8rem)] px-4 py-6">
          <div className="space-y-6 pb-16">
            <div>
              <div className="flex items-center gap-2 px-2 mb-2">
                <Home
                  className="h-4 w-4 text-muted-foreground"
                  strokeWidth={1.5}
                />
                <h3 className="text-sm font-medium text-muted-foreground">
                  Main Navigation
                </h3>
              </div>
              <Separator className="my-2 bg-gradient-to-r from-primary/20 via-muted/20 to-transparent h-px" />
              <div className="mt-3 space-y-1">
                <AnimatePresence>
                  {menuItems.map((item, i) => (
                    <motion.div
                      key={item.href}
                      custom={i}
                      initial="hidden"
                      animate="visible"
                      variants={menuVariants}
                    >
                      <MobileLink
                        href={item.href}
                        onOpenChange={setOpen}
                        className={cn(
                          "group flex items-center justify-between rounded-lg px-3 py-3.5 text-base font-medium transition-all hover:bg-primary/5",
                          pathname === item.href
                            ? "bg-primary/10 text-primary"
                            : "text-foreground"
                        )}
                      >
                        <span>{item.title}</span>
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5",
                            pathname === item.href ? "text-primary" : ""
                          )}
                          strokeWidth={1.5}
                        />
                      </MobileLink>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 px-2 mb-2">
                <BookOpen
                  className="h-4 w-4 text-muted-foreground"
                  strokeWidth={1.5}
                />
                <h3 className="text-sm font-medium text-muted-foreground">
                  Blog Categories
                </h3>
              </div>
              <Separator className="my-2 bg-gradient-to-r from-primary/20 via-muted/20 to-transparent h-px" />
              <div className="mt-3 space-y-1">
                <AnimatePresence>
                  {blogMenuItems.map((item, i) => (
                    <motion.div
                      key={item.href}
                      custom={i + menuItems.length}
                      initial="hidden"
                      animate="visible"
                      variants={menuVariants}
                    >
                      <MobileLink
                        href={item.href}
                        onOpenChange={setOpen}
                        className={cn(
                          "group flex items-center justify-between rounded-lg px-3 py-3.5 text-base font-medium transition-all hover:bg-primary/5",
                          pathname === item.href
                            ? "bg-primary/10 text-primary"
                            : "text-foreground"
                        )}
                      >
                        <span>{item.title}</span>
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5",
                            pathname === item.href ? "text-primary" : ""
                          )}
                          strokeWidth={1.5}
                        />
                      </MobileLink>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="flex-col items-start gap-2 px-4 py-4 border-t border-white/10 bg-gradient-to-t from-primary/5 to-transparent">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.site_name}
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn("transition-colors", className)}
      {...props}
    >
      {children}
    </Link>
  );
}
