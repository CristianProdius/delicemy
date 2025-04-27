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
import { Globe } from "lucide-react";

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
    // Replace the current locale with the new one in the pathname
    let newPath = pathname;

    // If the path starts with a locale, replace it
    if (languages.some((lang) => pathname.startsWith(`/${lang.code}`))) {
      newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    } else {
      // If no locale in path, add it
      newPath = `/${locale}${pathname}`;
    }

    router.push(newPath);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  if (languages.length === 0) {
    return null; // Don't render if no languages are available
  }

  // Function to render flag
  const FlagComponent = ({ flag }: { flag?: string }) => {
    if (!flag) return null;

    // If the flag is an HTML string containing an img element
    if (typeof flag === "string" && flag.trim().startsWith("<img")) {
      return (
        <span
          dangerouslySetInnerHTML={{ __html: flag }}
          className="inline-flex items-center mr-1"
        />
      );
    }

    // If it's a direct base64 URL
    if (flag.startsWith("data:image")) {
      return (
        <img
          src={flag}
          alt="flag"
          width={16}
          height={11}
          className="inline-block mr-1"
        />
      );
    }

    // If it's an emoji flag
    if (flag.length <= 4) {
      // Flags are typically 2 characters or less
      return <span className="mr-1">{flag}</span>;
    }

    // Fallback: try to display as is
    return <span className="mr-1">{flag}</span>;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline-flex items-center">
            <FlagComponent flag={currentLanguage?.flag} />
            {currentLanguage?.name || currentLocale.toUpperCase()}
          </span>
          <span className="sm:hidden inline-flex items-center">
            {currentLanguage?.flag ? (
              <FlagComponent flag={currentLanguage.flag} />
            ) : (
              currentLocale.toUpperCase()
            )}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className="inline-flex items-center gap-2"
            disabled={language.code === currentLocale}
          >
            <FlagComponent flag={language.flag} />
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
