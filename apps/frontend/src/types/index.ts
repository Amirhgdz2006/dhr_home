import { ReactNode } from "react";

export interface AppData {
  name: string;
  englishName?: string;
  keywords?: string[];
  bgColor: string;
  description: string;
  icon: ReactNode | string | null;
  category: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
  order?: number;
}

export interface APIResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface BackendCategory {
  name: string;
  order?: number;
  apps?: BackendApp[];
}

export interface BackendApp {
  name: string;
  englishName?: string;
  keywords?: string[];
  icon_background_color?: string;
  description: string;
  icon?: { url: string };
  url: string;
}

export type LoadingState = "idle" | "loading" | "success" | "error";

export interface AppState {
  apps: AppData[];
  categories: Category[];
  loading: LoadingState;
  error: string | null;
}