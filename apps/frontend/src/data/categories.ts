import { Category } from "./types";
import { fetchCategoriesFromStrapi } from "./api";

let categoriesCache: Category[] = [];

export async function loadCategories(): Promise<Category[]> {
  try {
    categoriesCache = await fetchCategoriesFromStrapi();
    return [...categoriesCache];
  } catch (error) {
    console.error("Failed to load categories:", error);
    throw error;
  }
}

export function getCategories(): Category[] {
  return [...categoriesCache];
}

export function getCategoryNames(): string[] {
  return categoriesCache
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .map((cat) => cat.name);
}

export function isValidCategory(categoryName: string): boolean {
  return categoriesCache.some((cat) => cat.name === categoryName);
}
