import { useState, useMemo, useCallback } from "react";
import { AppData, Category } from "@/types";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useAdaptiveColors, AdaptiveColors } from "../../hooks/useAdaptiveColors";
import { MobileGrid } from "./MobileGrid";
import { DesktopGrid } from "./DesktopGrid";

interface ApplicationsGridProps {
  imageSrc: string;
  apps: AppData[];
  categories: Category[];
}

const DEFAULT_COLORS: AdaptiveColors = {
  isLight: false,
  isAnalyzed: true,
  panelBg: "rgba(255, 255, 255, 0.15)",
  panelBorder: "rgba(255, 255, 255, 0.18)",
  panelShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
  textPrimary: "rgba(255, 255, 255, 1)",
  textSecondary: "rgba(255, 255, 255, 0.8)",
  textTertiary: "rgba(255, 255, 255, 0.7)",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
  buttonBgActive: "rgba(255, 255, 255, 0.35)",
  buttonBgInactive: "rgba(255, 255, 255, 0.1)",
  buttonBgHover: "rgba(255, 255, 255, 0.22)",
  buttonBorderActive: "rgba(255, 255, 255, 0.4)",
  buttonBorderInactive: "rgba(255, 255, 255, 0.15)",
  scrollbarBg: "rgba(255, 255, 255, 0.4)",
};

const searchInApp = (app: AppData, searchLower: string): boolean => {
  if (searchLower === "") return true;
  
  return (
    app.name.includes(searchLower) ||
    app.description.includes(searchLower) ||
    (app.englishName?.toLowerCase().includes(searchLower)) ||
    (app.keywords?.some((keyword) => keyword.toLowerCase().includes(searchLower)))
  ) ?? false;
};

export function ApplicationsGrid({ imageSrc, apps, categories }: ApplicationsGridProps) {
  const isMobile = useIsMobile();
  const adaptiveColors = useAdaptiveColors(imageSrc || "");
  
  const colors = useMemo(
    () => (isMobile ? DEFAULT_COLORS : (adaptiveColors || DEFAULT_COLORS)),
    [isMobile, adaptiveColors]
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredApps = useMemo(() => {
    const searchLower = searchQuery.toLowerCase();
    
    return apps.filter((app) => {
      const matchesSearch = searchInApp(app, searchLower);
      const matchesCategory = isMobile 
        ? true 
        : selectedCategory === "" || app.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [apps, searchQuery, selectedCategory, isMobile]);

  const groupedApps = useMemo(() => {
    return filteredApps.reduce((acc, app) => {
      if (!acc[app.category]) {
        acc[app.category] = [];
      }
      acc[app.category].push(app);
      return acc;
    }, {} as Record<string, AppData[]>);
  }, [filteredApps]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  if (isMobile) {
    return (
      <MobileGrid
        groupedApps={groupedApps}
        searchQuery={searchQuery}
        setSearchQuery={handleSearchChange}
        colors={colors}
      />
    );
  }

  return (
    <DesktopGrid
      groupedApps={groupedApps}
      categories={categories}
      searchQuery={searchQuery}
      setSearchQuery={handleSearchChange}
      selectedCategory={selectedCategory}
      setSelectedCategory={handleCategoryChange}
      colors={colors}
    />
  );
}