// components/posts/filter.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Author {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface FilterPostsProps {
  authors: Author[];
  tags: Tag[];
  categories: Category[];
  selectedAuthor?: string;
  selectedTag?: string;
  selectedCategory?: string;
  locale: string;
  translations: {
    all_tags: string;
    all_categories: string;
    all_authors: string;
    reset_filters: string;
    [key: string]: string | undefined;
  };
}

export function FilterPosts({
  authors,
  tags,
  categories,
  selectedAuthor,
  selectedTag,
  selectedCategory,
  translations,
}: FilterPostsProps) {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  const handleFilterChange = (type: string, value: string) => {
    console.log(`Filter changed: ${type} -> ${value}`);
    const newParams = new URLSearchParams(window.location.search);
    if (value === "all") {
      newParams.delete(type);
    } else {
      newParams.set(type, value);
    }
    router.push(`/${locale}/posts?${newParams.toString()}`);
  };

  const handleResetFilters = () => {
    router.push(`/${locale}/posts`);
  };

  return (
    <div className="grid md:grid-cols-[1fr_1fr_1fr_0.5fr] gap-2 my-4 !z-10">
      <Select
        value={selectedTag || "all"}
        onValueChange={(value) => handleFilterChange("tag", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder={translations.all_tags} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{translations.all_tags}</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.id} value={tag.id.toString()}>
              {tag.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedCategory || "all"}
        onValueChange={(value) => handleFilterChange("category", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder={translations.all_categories} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{translations.all_categories}</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedAuthor || "all"}
        onValueChange={(value) => handleFilterChange("author", value)}
      >
        <SelectTrigger>
          <SelectValue placeholder={translations.all_authors} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{translations.all_authors}</SelectItem>
          {authors.map((author) => (
            <SelectItem key={author.id} value={author.id.toString()}>
              {author.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={handleResetFilters}>
        {translations.reset_filters}
      </Button>
    </div>
  );
}
