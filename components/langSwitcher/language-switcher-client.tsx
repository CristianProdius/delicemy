// components/language-switcher-client.tsx
"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe2, ChevronDown } from "lucide-react";
import { cn } from "@/components/craft";

interface Language {
  code: string;
  name: string;
  slug?: string;
  locale?: string;
  flag?: string;
}

interface LanguageSwitcherClientProps {
  languages: Language[];
}

export function LanguageSwitcherClient({
  languages,
}: LanguageSwitcherClientProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current locale from pathname
  const pathParts = pathname.split("/");
  const currentLocale =
    languages.find((lang) => lang.code === pathParts[1])?.code ||
    languages[0]?.code ||
    "ro";

  const switchLanguage = (locale: string) => {
    let newPath = pathname;

    if (languages.some((lang) => pathname.startsWith(`/${lang.code}`))) {
      newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    } else {
      newPath = `/${locale}${pathname}`;
    }

    router.push(newPath);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  if (languages.length === 0) {
    return null;
  }

  // Function to render flag
  const FlagComponent = ({ flag }: { flag?: string }) => {
    if (!flag) return null;

    if (typeof flag === "string" && flag.trim().startsWith("<img")) {
      return (
        <span
          dangerouslySetInnerHTML={{ __html: flag }}
          className="inline-flex items-center w-5 h-5 overflow-hidden rounded-md shadow-sm"
        />
      );
    }

    if (flag.startsWith("data:image")) {
      return (
        <img
          src={flag}
          alt="flag"
          width={20}
          height={20}
          className="w-5 h-5 rounded-md object-cover shadow-sm"
        />
      );
    }

    if (flag.length <= 4) {
      return <span className="text-base">{flag}</span>;
    }

    return <span className="text-base">{flag}</span>;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-11 px-2 md:px-4 gap-1 md:gap-3 group",
            "text-muted-foreground hover:text-foreground",
            "transition-all duration-300",
            "rounded-lg hover:bg-accent/50",
            "relative overflow-hidden",
            "flex-shrink-0"
          )}
        >
          <div className="flex items-center gap-1 md:gap-3">
            {currentLanguage?.flag ? (
              <FlagComponent flag={currentLanguage.flag} />
            ) : (
              <Globe2 className="h-4 w-4 md:h-5 md:w-5" />
            )}
            <span className="text-sm font-medium hidden md:block">
              {currentLanguage?.name || currentLocale.toUpperCase()}
            </span>
            <span className="text-sm font-medium md:hidden">
              {currentLocale.toUpperCase()}
            </span>
            <ChevronDown className="h-3 w-3 md:h-4 md:w-4 transition-transform duration-300 group-hover:rotate-180" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className={cn(
          "min-w-[200px] p-2",
          "bg-background/95 backdrop-blur-xl",
          "border border-border/40",
          "shadow-xl rounded-xl",
          "animate-in fade-in-0 zoom-in-95"
        )}
      >
        {languages.map((language, index) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className={cn(
              "flex items-center gap-4 px-4 py-3 rounded-lg",
              "transition-all duration-300",
              "cursor-pointer",
              language.code === currentLocale
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent/50",
              "hover:translate-x-1"
            )}
            style={{
              transitionDelay: `${index * 30}ms`,
            }}
            disabled={language.code === currentLocale}
          >
            <FlagComponent flag={language.flag} />
            <span className="text-sm font-medium">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
