import { useEffect, useState } from "react";
import LauncherPage from "./pages/LauncherPage";
import { AppData } from "./data/types";
import { Category } from "./data/types";
import { loadApps, apps as appsStore } from "./data/apps";
import { loadCategories, categories as categoriesStore } from "./data/categories";

export default function App() {
  const [apps, setApps] = useState<AppData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      await loadCategories();
      await loadApps();

      setCategories([...categoriesStore]);
      setApps([...appsStore]);

      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <LauncherPage apps={apps} categories={categories} />;
}
