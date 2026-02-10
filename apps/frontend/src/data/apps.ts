import { AppData } from "./types";
import { fetchAppsFromStrapi } from "./api";

let appsCache: AppData[] = [];

export async function loadApps(): Promise<AppData[]> {
  try {
    appsCache = await fetchAppsFromStrapi();
    return [...appsCache];
  } catch (error) {
    console.error("Failed to load apps:", error);
    throw error;
  }
}

export function getApps(): AppData[] {
  return [...appsCache];
}
