import { AppData, Category } from "@/types";
import { reportError } from "../observability";

const API_TEST_URL = import.meta.env.VITE_TEST_API_URL ?? "/api/data";
const DEFAULT_BG_COLOR = "rgba(0,0,0,0.1)";
const DEFAULT_CATEGORY_ORDER = 999;

class APIError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = "APIError";
  }
}

export async function fetchCategoriesFromStrapi(): Promise<Category[]> {
  try {
    const response = await fetch(API_TEST_URL);

    if (!response.ok) {
      throw new APIError(
        `Failed to fetch categories: ${response.statusText}`,
        response.status
      );
    }

    const json = await response.json();

    if (!json.data || !Array.isArray(json.data)) {
      throw new APIError("Invalid response format: missing data array");
    }

    return json.data.map((item: { name: string; order?: number }) => ({
      id: item.name,
      name: item.name,
      order: item.order ?? DEFAULT_CATEGORY_ORDER,
    }));
  } catch (error) {
    reportError(error, { source: "fetchCategoriesFromStrapi" });
    
    if (error instanceof APIError) {
      throw error;
    }
    
    throw new APIError(
      "Network error while fetching categories",
      error instanceof Error ? undefined : 500
    );
  }
}

export async function fetchAppsFromStrapi(): Promise<AppData[]> {
  try {
    const response = await fetch(API_TEST_URL);

    if (!response.ok) {
      throw new APIError(
        `Failed to fetch apps: ${response.statusText}`,
        response.status
      );
    }

    const json = await response.json();

    if (!json.data || !Array.isArray(json.data)) {
      throw new APIError("Invalid response format: missing data array");
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
    reportError(error, { source: "fetchAppsFromStrapi" });
    
    if (error instanceof APIError) {
      throw error;
    }
    
    throw new APIError(
      "Network error while fetching apps",
      error instanceof Error ? undefined : 500
    );
  }
}