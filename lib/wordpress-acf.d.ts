import type { Page } from "./wordpress.d";
// Base ACF Fields interface
export interface ACFFields {
  [key: string]: any;
}

// ACF for 404 Page
export interface ACF404Page {
  button_text?: string;
  button_link?: string;
  show_search_box?: boolean;
}

// ACF for Posts Page
export interface ACFPostsPage {
  page_title?: string;
  page_subtitle?: string;
  all_tags_label?: string;
  all_categories_label?: string;
  all_authors_label?: string;
  reset_filters_label?: string;
  search_placeholder?: string;
  posts_found_text?: string;
  posts_found_plural_text?: string;
  posts_found_format?: string;
  matching_search_text?: string;
  no_posts_found_text?: string;
  previous_page_label?: string;
  next_page_label?: string;
}

export interface PostsPage extends Page {
  acf?: ACFPostsPage;
}
