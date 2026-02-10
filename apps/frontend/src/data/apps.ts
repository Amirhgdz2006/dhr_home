import { IAppData } from "@/types";
import { fetchAppsFromStrapi } from "./api";

let appsCache: IAppData[] = [];

export async function loadApps(): Promise<IAppData[]> {
  try {
    appsCache = await fetchAppsFromStrapi();
    return [...appsCache];
  } catch (error) {
    console.error("Failed to load apps:", error);
    throw error;
  }
}

export function getApps(): IAppData[] {
  return [...appsCache];
}
