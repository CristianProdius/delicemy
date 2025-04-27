// components/language-switcher.tsx
import { Suspense } from "react";
import { getAvailableLanguages } from "@/lib/wordpress";
import { LanguageSwitcherClient } from "./language-switcher-client";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

// Loading component
function LanguageSwitcherLoading() {
  return (
    <Button variant="ghost" size="sm" className="gap-2" disabled>
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline-block">Loading...</span>
    </Button>
  );
}

// Error fallback component
function LanguageSwitcherError() {
  return (
    <Button variant="ghost" size="sm" className="gap-2" disabled>
      <Globe className="h-4 w-4" />
      <span className="hidden sm:inline-block">Ro</span>
    </Button>
  );
}

// Server component that fetches languages
async function LanguageSwitcherServer() {
  try {
    const languages = await getAvailableLanguages();
    return <LanguageSwitcherClient languages={languages} />;
  } catch (error) {
    console.error("Failed to fetch languages:", error);
    return <LanguageSwitcherError />;
  }
}

// Main component with Suspense
export function LanguageSwitcher() {
  return (
    <Suspense fallback={<LanguageSwitcherLoading />}>
      <LanguageSwitcherServer />
    </Suspense>
  );
}
