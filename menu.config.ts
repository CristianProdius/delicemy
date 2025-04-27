// menu.config.ts
export function getMainMenu(locale: string) {
  return {
    home: `/${locale}`,
    about: `/${locale}/about`,
    blog: `/${locale}/posts`,
    contact: `/${locale}/contact`,
  };
}

export function getContentMenu(locale: string) {
  return {
    latest: `/${locale}/posts`,
    categories: `/${locale}/categories`,
    authors: `/${locale}/authors`,
    tags: `/${locale}/tags`,
  };
}
