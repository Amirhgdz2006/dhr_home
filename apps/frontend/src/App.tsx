import { useEffect, useState } from "react";
import LauncherPage from "./pages/LauncherPage";
import { AppData, Category } from "./data/types";
import { loadApps } from "./data/apps";
import { loadCategories } from "./data/categories";

export default function App() {
  const [apps, setApps] = useState<AppData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const [categoriesData, appsData] = await Promise.all([
          loadCategories(),
          loadApps()
        ]);
        
        setCategories(categoriesData);
        setApps(appsData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("خطا در بارگذاری اطلاعات");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-black text-white font-['IRANYekanX']">
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-black text-white font-['IRANYekanX'] gap-4">
        <p className="text-red-400">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          تلاش مجدد
        </button>
      </div>
    );
  }

  return <LauncherPage apps={apps} categories={categories} />;
}
