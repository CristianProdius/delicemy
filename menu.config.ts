// Update menu.config.ts
export const getMainMenu = (locale: string) => ({
  home: `/${locale}`,
  about: "https://github.com/9d8dev/next-wp",
  blog: `/${locale}/posts`,
});

export const getContentMenu = (locale: string) => ({
  categories: `/${locale}/posts/categories`,
  tags: `/${locale}/posts/tags`,
  authors: `/${locale}/posts/authors`,
});
