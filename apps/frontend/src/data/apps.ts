import { AppData } from "./types";
import { fetchAppsFromStrapi } from "./api";

/**
 * Apps data store
 * Apps are loaded from the backend API via fetchAppsFromStrapi()
 */
export let apps: AppData[] = [];

/**
 * Load apps from backend API
 * Updates the apps store with fetched data
 */
export async function loadApps(): Promise<void> {
  try {
    apps = await fetchAppsFromStrapi();
  } catch (error) {
    console.error("Failed to load apps:", error);
    apps = [];
  }
}