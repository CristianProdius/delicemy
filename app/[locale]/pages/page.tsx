// app/[locale]/pages/page.tsx
import { getAllPages } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";
import { Metadata } from "next";
import BackButton from "@/components/back";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All Pages",
  description: "Browse all pages of our blog posts",
  alternates: {
    canonical: "/posts/pages",
  },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page({ params }: PageProps) {
  const { locale } = await params;
  const pages = await getAllPages(locale); // Pass locale to getAllPages

  return (
    <Section>
      <Container className="space-y-6">
        <Prose className="mb-8">
          <h2>All Pages</h2>
          <ul className="grid">
            {pages.map((page: any) => (
              <li key={page.id}>
                <Link href={`/${locale}/${page.slug}`}>
                  {page.title.rendered}
                </Link>
              </li>
            ))}
          </ul>
        </Prose>
        <BackButton />
      </Container>
    </Section>
  );
}
