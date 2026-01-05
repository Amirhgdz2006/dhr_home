import { Category } from "./types";
import { fetchCategoriesFromStrapi } from "./api";

/**
 * Categories data store
 * Categories are loaded from the backend API via fetchCategoriesFromStrapi()
 */
export let categories: Category[] = [];

/**
 * Load categories from backend API
 * Updates the categories store with fetched data
 */
export async function loadCategories(): Promise<void> {
  try {
    categories = await fetchCategoriesFromStrapi();
  } catch (error) {
    console.error("Failed to load categories:", error);
    categories = [];
  }
}

/**
 * Get category names sorted by order
 * Categories with lower order values appear first
 * @returns Array of category names in order
 */
export function getCategoryNames(): string[] {
  return categories
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .map((cat) => cat.name);
}

/**
 * Check if a category exists
 * @param categoryName - The category name to check
 * @returns True if category exists, false otherwise
 */
export function isValidCategory(categoryName: string): boolean {
  return categories.some((cat) => cat.name === categoryName);
}
