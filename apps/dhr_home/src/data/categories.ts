// import { Category } from "./types";

// /**
//  * Category definitions
//  * Add or remove categories here
//  * The order property determines the display order (lower numbers appear first)
//  */
// export const categories: Category[] = [
//   { id: "پلتفرم‌ها", name: "پلتفرم‌ها", order: 1 },
//   { id: "ابزارها", name: "ابزارها", order: 2 },
//   { id: "مستندات", name: "مستندات", order: 3 },
//   { id: "ارتباطات داخلی", name: "ارتباطات داخلی", order: 4 },
//   { id: "درخواست‌های اداری", name: "درخواست‌های اداری", order: 5 },
// ];

// /**
//  * Get category names in order
//  */
// export function getCategoryNames(): string[] {
//   return categories
//     .sort((a, b) => (a.order || 999) - (b.order || 999))
//     .map(cat => cat.name);
// }

// /**
//  * Check if a category exists
//  */
// export function isValidCategory(categoryName: string): boolean {
//   return categories.some(cat => cat.name === categoryName);
// }



// ---------------------------------------------------------------------
import { Category } from "./types";
import { fetchCategoriesFromStrapi } from "./api";

export let categories: Category[] = [];

// Load categories from Strapi
export async function loadCategories() {
  categories = await fetchCategoriesFromStrapi();
}


// Get category names in order
export function getCategoryNames(): string[] {
  return categories
    .sort((a, b) => (a.order || 999) - (b.order || 999))
    .map(cat => cat.name);
}


// Check if a category exists
export function isValidCategory(categoryName: string): boolean {
  return categories.some(cat => cat.name === categoryName);
}
