import { AppData } from "./types";
import { Category } from "./types";

/**
 * API endpoint URL
 * Uses Vite environment variable if available, otherwise falls back to relative path
 */
const API_TEST_URL = import.meta.env.VITE_TEST_API_URL ?? "/api/data";

/**
 * Default background color for apps without a specified color
 */
const DEFAULT_BG_COLOR = "rgba(0,0,0,0.1)";

/**
 * Default order value for categories without a specified order
 */
const DEFAULT_CATEGORY_ORDER = 999;

/**
 * Fetch categories from backend API
 * @returns Promise resolving to array of Category objects
 */
export async function fetchCategoriesFromStrapi(): Promise<Category[]> {
  try {
    const response = await fetch(API_TEST_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    if (!json.data || !Array.isArray(json.data)) {
      throw new Error("Invalid response format: missing data array");
    }

    return json.data.map((item: { name: string; order?: number }) => ({
      id: item.name,
      name: item.name,
      order: item.order ?? DEFAULT_CATEGORY_ORDER,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/**
 * Fetch apps from backend API
 * @returns Promise resolving to array of AppData objects
 */
export async function fetchAppsFromStrapi(): Promise<AppData[]> {
  try {
    const response = await fetch(API_TEST_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    if (!json.data || !Array.isArray(json.data)) {
      throw new Error("Invalid response format: missing data array");
    }

    const apps: AppData[] = [];

    json.data.forEach((category: {
      name: string;
      apps?: Array<{
        name: string;
        englishName?: string;
        keywords?: string[];
        icon_background_color?: string;
        description: string;
        icon?: { url: string };
        url: string;
      }>;
    }) => {
      const categoryName = category.name;
      const categoryApps =
        category.apps?.map(
          (app): AppData => ({
            name: app.name,
            englishName: app.englishName,
            keywords: app.keywords ?? [],
            bgColor: app.icon_background_color ?? DEFAULT_BG_COLOR,
            description: app.description,
            icon: app.icon?.url ?? null,
            category: categoryName,
            url: app.url,
          })
        ) ?? [];

      apps.push(...categoryApps);
    });

    return apps;
  } catch (error) {
    console.error("Error fetching apps:", error);
    return [];
  }
}

