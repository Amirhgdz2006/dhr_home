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

