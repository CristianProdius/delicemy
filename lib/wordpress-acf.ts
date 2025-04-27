// lib/wordpress-acf.ts
import { getUrl, wordpressFetch, defaultFetchOptions } from "./wordpress";
import type { ACFPostsPage, ACF404Page } from "./wordpress-acf.d";

// Function to get global ACF options (if you use ACF Options Pages)
export async function getGlobalACFOptions(lang?: string) {
  const query: Record<string, any> = {};
  if (lang) {
    query.lang = lang;
  }

  const url = getUrl("/wp-json/acf/v3/options/options", query);
  return wordpressFetch(url, {
    next: {
      ...defaultFetchOptions.next,
      tags: [
        "wordpress",
        "acf-options",
        lang ? `acf-options-${lang}` : "",
      ].filter(Boolean),
    },
  });
}

// Helper to extract translations from ACF data
export function extractPostsPageTranslations(acf?: ACFPostsPage) {
  return {
    page_title: acf?.page_title,
    page_subtitle: acf?.page_subtitle,
    all_tags: acf?.all_tags_label,
    all_categories: acf?.all_categories_label,
    all_authors: acf?.all_authors_label,
    reset_filters: acf?.reset_filters_label,
    search_placeholder: acf?.search_placeholder,
    posts_found: acf?.posts_found_text,
    posts_found_plural: acf?.posts_found_plural_text,
    posts_found_format: acf?.posts_found_format,
    matching_search: acf?.matching_search_text,
    no_posts_found: acf?.no_posts_found_text,
    previous_page: acf?.previous_page_label,
    next_page: acf?.next_page_label,
  };
}

export function extract404PageData(acf?: ACF404Page) {
  return {
    button_text: acf?.button_text,
    button_link: acf?.button_link,
    show_search_box: acf?.show_search_box ?? false,
  };
}
