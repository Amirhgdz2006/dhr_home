import { ReactNode } from "react";

export interface IAppData {
  name: string;
  englishName?: string;
  keywords?: string[];
  bgColor: string;
  description: string;
  icon: ReactNode | string | null;
  category: string;
  url: string;
}

export interface ICategory {
  id: string;
  name: string;
  order?: number;
}

export interface IAPIResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface IBackendCategory {
  name: string;
  order?: number;
  apps?: IBackendApp[];
}

export interface IBackendApp {
  name: string;
  englishName?: string;
  keywords?: string[];
  icon_background_color?: string;
  description: string;
  icon?: { url: string };
  url: string;
}

export type ILoadingState = "idle" | "loading" | "success" | "error";

export interface IAppState {
  apps: IAppData[];
  categories: ICategory[];
  loading: ILoadingState;
  error: string | null;
}