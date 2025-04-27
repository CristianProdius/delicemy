// Description: WordPress API functions
// Used to fetch data from a WordPress site using the WordPress REST API
// Types are imported from `wp.d.ts`

import querystring from "query-string";
import { revalidateTag } from "next/cache";

import type {
  Post,
  Category,
  Tag,
  Page,
  Author,
  FeaturedMedia,
} from "./wordpress.d";

// WordPress Config
const baseUrl = process.env.WORDPRESS_URL;

if (!baseUrl) {
  throw new Error("WORDPRESS_URL environment variable is not defined");
}

// Utility type for fetch options
interface FetchOptions {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

function getUrl(path: string, query?: Record<string, any>) {
  const params = query ? querystring.stringify(query) : null;
  return `${baseUrl}${path}${params ? `?${params}` : ""}`;
}

// Default fetch options for WordPress API calls
const defaultFetchOptions: FetchOptions = {
  next: {
    tags: ["wordpress"],
    revalidate: 3600, // Revalidate every hour by default
  },
};

// Error handling utility
class WordPressAPIError extends Error {
  constructor(message: string, public status: number, public endpoint: string) {
    super(message);
    this.name = "WordPressAPIError";
  }
}

// Utility function for making WordPress API requests
async function wordpressFetch<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const userAgent = "Next.js WordPress Client";

  const response = await fetch(url, {
    ...defaultFetchOptions,
    ...options,
    headers: {
      "User-Agent": userAgent,
    },
  });

  if (!response.ok) {
    throw new WordPressAPIError(
      `WordPress API request failed: ${response.statusText}`,
      response.status,
      url
    );
  }

  return response.json();
}

// WordPress Functions

export async function getAllPosts(filterParams?: {
  author?: string;
  tag?: string;
  category?: string;
  search?: string;
  lang?: string;
}): Promise<Post[]> {
  const query: Record<string, any> = {
    _embed: true,
    per_page: 100,
  };

  if (filterParams?.lang) {
    query.lang = filterParams.lang;
  }

  if (filterParams?.search) {
    // Search in post content and title
    query.search = filterParams.search;

    // If we have additional filters with search, use them
    if (filterParams?.author) {
      query.author = filterParams.author;
    }
    if (filterParams?.tag) {
      query.tags = filterParams.tag;
    }
    if (filterParams?.category) {
      query.categories = filterParams.category;
    }
  } else {
    // If no search term, just apply filters
    if (filterParams?.author) {
      query.author = filterParams.author;
    }
    if (filterParams?.tag) {
      query.tags = filterParams.tag;
    }
    if (filterParams?.category) {
      query.categories = filterParams.category;
    }
  }

  const url = getUrl("/wp-json/wp/v2/posts", query);
  return wordpressFetch<Post[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        "posts",
        filterParams?.lang ? `posts-${filterParams.lang}` : "",
      ].filter(Boolean),
    },
  });
}

export async function getPostById(id: number, lang?: string): Promise<Post> {
  const query: Record<string, any> = {};
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl(`/wp-json/wp/v2/posts/${id}`, query);
  const response = await wordpressFetch<Post>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        `post-${id}`,
        lang ? `post-${id}-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response;
}

export async function getPostBySlug(
  slug: string,
  lang?: string
): Promise<Post> {
  const query: Record<string, any> = { slug };
  if (lang) {
    query.lang = lang;
  }
  const url = getUrl("/wp-json/wp/v2/posts", query);
  const response = await wordpressFetch<Post[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        `post-${slug}`,
        lang ? `post-${slug}-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response[0];
}

export async function getAllCategories(lang?: string): Promise<Category[]> {
  const query: Record<string, any> = {};
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/categories", query);
  const response = await wordpressFetch<Category[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        "categories",
        lang ? `categories-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response;
}

export async function getCategoryById(
  id: number,
  lang?: string
): Promise<Category> {
  const query: Record<string, any> = {};
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl(`/wp-json/wp/v2/categories/${id}`, query);
  const response = await wordpressFetch<Category>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        `category-${id}`,
        lang ? `category-${id}-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response;
}

export async function getCategoryBySlug(
  slug: string,
  lang?: string
): Promise<Category> {
  const query: Record<string, any> = { slug };
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/categories", query);
  const response = await wordpressFetch<Category[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        `category-${slug}`,
        lang ? `category-${slug}-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response[0];
}

export async function getPostsByCategory(
  categoryId: number,
  lang?: string
): Promise<Post[]> {
  const query: Record<string, any> = { categories: categoryId };
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/posts", query);
  const response = await wordpressFetch<Post[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        `category-${categoryId}`,
        lang ? `category-${categoryId}-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response;
}

export async function getPostsByTag(
  tagId: number,
  lang?: string
): Promise<Post[]> {
  const query: Record<string, any> = { tags: tagId };
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/posts", query);
  const response = await wordpressFetch<Post[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        `tag-${tagId}`,
        lang ? `tag-${tagId}-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response;
}

export async function getTagsByPost(
  postId: number,
  lang?: string
): Promise<Tag[]> {
  const query: Record<string, any> = { post: postId };
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/tags", query);
  const response = await wordpressFetch<Tag[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        `post-${postId}`,
        lang ? `post-${postId}-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response;
}

export async function getAllTags(lang?: string): Promise<Tag[]> {
  const query: Record<string, any> = {};
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/tags", query);
  const response = await wordpressFetch<Tag[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", "tags", lang ? `tags-${lang}` : ""].filter(Boolean),
    },
  });

  return response;
}

export async function getTagById(id: number, lang?: string): Promise<Tag> {
  const query: Record<string, any> = {};
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl(`/wp-json/wp/v2/tags/${id}`, query);
  const response = await wordpressFetch<Tag>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `tag-${id}`, lang ? `tag-${id}-${lang}` : ""].filter(
        Boolean
      ),
    },
  });

  return response;
}

export async function getTagBySlug(slug: string, lang?: string): Promise<Tag> {
  const query: Record<string, any> = { slug };
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/tags", query);
  const response = await wordpressFetch<Tag[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        `tag-${slug}`,
        lang ? `tag-${slug}-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response[0];
}

export async function getAllPages(lang?: string): Promise<Page[]> {
  const query: Record<string, any> = {};
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/pages", query);
  const response = await wordpressFetch<Page[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", "pages", lang ? `pages-${lang}` : ""].filter(Boolean),
    },
  });

  return response;
}

export async function getPageById(id: number, lang?: string): Promise<Page> {
  const query: Record<string, any> = {};
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl(`/wp-json/wp/v2/pages/${id}`, query);
  const response = await wordpressFetch<Page>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        `page-${id}`,
        lang ? `page-${id}-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response;
}

export async function getPageBySlug(
  slug: string,
  lang?: string
): Promise<Page> {
  const query: Record<string, any> = { slug };
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/pages", query);
  const response = await wordpressFetch<Page[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        `page-${slug}`,
        lang ? `page-${slug}-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response[0];
}

export async function getAllAuthors(lang?: string): Promise<Author[]> {
  const query: Record<string, any> = {};
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/users", query);
  const response = await wordpressFetch<Author[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", "authors", lang ? `authors-${lang}` : ""].filter(
        Boolean
      ),
    },
  });

  return response;
}

export async function getAuthorById(
  id: number,
  lang?: string
): Promise<Author> {
  const query: Record<string, any> = {};
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl(`/wp-json/wp/v2/users/${id}`, query);
  const response = await wordpressFetch<Author>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        `author-${id}`,
        lang ? `author-${id}-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response;
}

export async function getAuthorBySlug(
  slug: string,
  lang?: string
): Promise<Author> {
  const query: Record<string, any> = { slug };
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/users", query);
  const response = await wordpressFetch<Author[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        `author-${slug}`,
        lang ? `author-${slug}-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response[0];
}

export async function getPostsByAuthor(
  authorId: number,
  lang?: string
): Promise<Post[]> {
  const query: Record<string, any> = { author: authorId };
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/posts", query);
  const response = await wordpressFetch<Post[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        `author-${authorId}`,
        lang ? `author-${authorId}-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response;
}

export async function getPostsByAuthorSlug(
  authorSlug: string,
  lang?: string
): Promise<Post[]> {
  const author = await getAuthorBySlug(authorSlug, lang);
  const query: Record<string, any> = { author: author.id };
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/posts", query);
  const response = await wordpressFetch<Post[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        `author-${authorSlug}`,
        lang ? `author-${authorSlug}-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response;
}

export async function getPostTranslations(
  postId: number
): Promise<Record<string, number>> {
  const url = getUrl(`/wp-json/wp/v2/posts/${postId}?_fields=translations`);
  const response = await wordpressFetch<{
    translations?: Record<string, number>;
  }>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", `post-${postId}-translations`],
    },
  });

  return response.translations || {};
}

export async function getTranslatedPost(
  postId: number,
  targetLang: string
): Promise<Post | null> {
  const translations = await getPostTranslations(postId);
  const translatedId = translations[targetLang];

  if (!translatedId) {
    return null;
  }

  return getPostById(translatedId);
}

export async function getAvailableLanguages(): Promise<
  { code: string; name: string }[]
> {
  const url = getUrl("/wp-json/pll/v1/languages");
  const response = await wordpressFetch<{ code: string; name: string }[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: ["wordpress", "languages"],
    },
  });

  return response;
}

export async function getPostsByCategorySlug(
  categorySlug: string,
  lang?: string
): Promise<Post[]> {
  const category = await getCategoryBySlug(categorySlug, lang);
  const query: Record<string, any> = { categories: category.id };
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/posts", query);
  const response = await wordpressFetch<Post[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        `category-${categorySlug}`,
        lang ? `category-${categorySlug}-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response;
}

export async function getPostsByTagSlug(
  tagSlug: string,
  lang?: string
): Promise<Post[]> {
  const tag = await getTagBySlug(tagSlug, lang);
  const query: Record<string, any> = { tags: tag.id };
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/posts", query);
  const response = await wordpressFetch<Post[]>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        `tag-${tagSlug}`,
        lang ? `tag-${tagSlug}-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response;
}

export async function getFeaturedMediaById(
  id: number,
  lang?: string
): Promise<FeaturedMedia> {
  const query: Record<string, any> = {};
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl(`/wp-json/wp/v2/media/${id}`, query);
  const response = await wordpressFetch<FeaturedMedia>(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        `media-${id}`,
        lang ? `media-${id}-${lang}` : "",
      ].filter(Boolean),
    },
  });

  return response;
}

// Helper function to search across categories
export async function searchCategories(
  query: string,
  lang?: string
): Promise<Category[]> {
  const queryParams: Record<string, any> = {
    search: query,
    per_page: 100,
  };
  if (lang) {
    queryParams.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/categories", queryParams);
  return wordpressFetch<Category[]>(url);
}

// Helper function to search across tags
export async function searchTags(query: string, lang?: string): Promise<Tag[]> {
  const queryParams: Record<string, any> = {
    search: query,
    per_page: 100,
  };
  if (lang) {
    queryParams.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/tags", queryParams);
  return wordpressFetch<Tag[]>(url);
}

// Helper function to search across authors
export async function searchAuthors(
  query: string,
  lang?: string
): Promise<Author[]> {
  const queryParams: Record<string, any> = {
    search: query,
    per_page: 100,
  };
  if (lang) {
    queryParams.lang = lang;
  }

  const url = getUrl("/wp-json/wp/v2/users", queryParams);
  return wordpressFetch<Author[]>(url);
}

// Helper function to revalidate WordPress data
export async function revalidateWordPressData(tags: string[] = ["wordpress"]) {
  try {
    for (const tag of tags) {
      revalidateTag(tag);
    }
  } catch (error) {
    console.error("Failed to revalidate WordPress data:", error);
    throw new Error("Failed to revalidate WordPress data");
  }
}

// Export error class for error handling
export { WordPressAPIError };
