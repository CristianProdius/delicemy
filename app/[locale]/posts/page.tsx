// app/[locale]/posts/page.tsx
import {
  getAllPosts,
  getAllAuthors,
  getAllTags,
  getAllCategories,
  searchAuthors,
  searchTags,
  searchCategories,
  getPageBySlug,
} from "@/lib/wordpress";

import { extractPostsPageTranslations } from "@/lib/wordpress-acf";
import type { PostsPage } from "@/lib/wordpress-acf.d"; // Import from the correct file
import type { Page, Post, Author, Tag, Category } from "@/lib/wordpress";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Section, Container, Prose } from "@/components/craft";
import { PostCard } from "@/components/posts/post-card";
import { FilterPosts } from "@/components/posts/filter";
import { SearchInput } from "@/components/posts/search-input";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Posts",
  description: "Browse all our blog posts",
};

export const dynamic = "auto";
export const revalidate = 600;

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    author?: string;
    tag?: string;
    category?: string;
    page?: string;
    search?: string;
  }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const searchParamsData = await searchParams;
  const { author, tag, category, page: pageParam, search } = searchParamsData;

  // Fetch data including the posts page content
  const [posts, authors, tags, categories, pageContent] = await Promise.all([
    getAllPosts({ author, tag, category, search, lang: locale }) as Promise<
      Post[]
    >,
    search
      ? searchAuthors(search, locale)
      : (getAllAuthors(locale) as Promise<Author[]>),
    search
      ? searchTags(search, locale)
      : (getAllTags(locale) as Promise<Tag[]>),
    search
      ? searchCategories(search, locale)
      : (getAllCategories(locale) as Promise<Category[]>),
    getPageBySlug("posts", locale) as Promise<Page>, // Change to just Page
  ]);

  // Extract translations from ACF data (with type assertion)
  const translations = {
    ...extractPostsPageTranslations((pageContent as PostsPage)?.acf),
    all_tags:
      extractPostsPageTranslations((pageContent as PostsPage)?.acf).all_tags ||
      "All Tags",
    all_categories:
      extractPostsPageTranslations((pageContent as PostsPage)?.acf)
        .all_categories || "All Categories",
    all_authors:
      extractPostsPageTranslations((pageContent as PostsPage)?.acf)
        .all_authors || "All Authors",
    reset_filters:
      extractPostsPageTranslations((pageContent as PostsPage)?.acf)
        .reset_filters || "Reset Filters",
  };

  // Handle pagination
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const postsPerPage = 9;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginatedPosts = posts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  // Format the posts found text
  const getPostsFoundText = (count: number) => {
    const postsText =
      count === 1 ? translations.posts_found : translations.posts_found_plural;
    const format = translations.posts_found_format || "{count} {posts} found";
    return format
      .replace("{count}", count.toString())
      .replace("{posts}", postsText || ""); // Add fallback for postsText
  };

  // Create pagination URL helper with locale
  const createPaginationUrl = (newPage: number) => {
    const params = new URLSearchParams();
    if (newPage > 1) params.set("page", newPage.toString());
    if (category) params.set("category", category);
    if (author) params.set("author", author);
    if (tag) params.set("tag", tag);
    if (search) params.set("search", search);
    return `/${locale}/posts${
      params.toString() ? `?${params.toString()}` : ""
    }`;
  };

  return (
    <Section>
      <Container>
        <div className="space-y-8">
          <Prose>
            <h2>{translations.page_title}</h2>
            {translations.page_subtitle && (
              <p className="text-lg">{translations.page_subtitle}</p>
            )}
            <p className="text-muted-foreground">
              {getPostsFoundText(posts.length)}
              {search && ` ${translations.matching_search}`}
            </p>
          </Prose>

          <div className="space-y-4">
            <SearchInput
              defaultValue={search}
              placeholder={translations.search_placeholder}
            />

            <FilterPosts
              authors={authors}
              tags={tags}
              categories={categories}
              selectedAuthor={author}
              selectedTag={tag}
              selectedCategory={category}
              locale={locale}
              translations={translations}
            />
          </div>

          {paginatedPosts.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {paginatedPosts.map((post: Post) => (
                <PostCard key={post.id} post={post} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
              <p>{translations.no_posts_found}</p>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={
                      page <= 1 ? "pointer-events-none opacity-50" : ""
                    }
                    href={createPaginationUrl(page - 1)}
                  >
                    {translations.previous_page}
                  </PaginationPrevious>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href={createPaginationUrl(page)}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    className={
                      page >= totalPages ? "pointer-events-none opacity-50" : ""
                    }
                    href={createPaginationUrl(page + 1)}
                  >
                    {translations.next_page}
                  </PaginationNext>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </Container>
    </Section>
  );
}
