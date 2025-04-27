// app/[locale]/not-found.tsx
import { Section, Container, Prose } from "@/components/craft";
import { Button } from "@/components/ui/button";
import { getPageBySlug } from "@/lib/wordpress";
import { Page404 } from "@/lib/wordpress.d";
import Link from "next/link";
import { headers } from "next/headers";

export default async function NotFound() {
  // Get locale from headers (set by middleware)
  const headersList = headers();
  const locale = (await headersList).get("x-locale") || "ro";

  // Fetch 404 page by slug with the correct locale
  const page: Page404 | null = await getPageBySlug("404-page", locale);

  // If no page found, render minimal fallback (just for error handling)
  if (!page) {
    return (
      <Section>
        <Container>
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p>Page not found (Locale: {locale})</p>
          </div>
        </Container>
      </Section>
    );
  }

  // Use WordPress data
  const title = page.title.rendered;
  const content = page.content.rendered;
  const buttonText = page.acf?.button_text;
  const buttonLink = page.acf?.button_link;
  const showSearch = page.acf?.show_search_box;

  return (
    <Section>
      <Container>
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <Prose>
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Prose>

          {showSearch && (
            <div className="mt-6 w-full max-w-md">
              <input
                type="search"
                placeholder="Search..."
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          )}

          {buttonText && buttonLink && (
            <Button asChild className="not-prose mt-6">
              <Link href={buttonLink}>{buttonText}</Link>
            </Button>
          )}
        </div>
      </Container>
    </Section>
  );
}
