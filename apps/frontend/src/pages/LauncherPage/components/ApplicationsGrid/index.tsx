import { useState } from "react";
import { AppData, Category } from "../../../data/types";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useAdaptiveColors, AdaptiveColors } from "../../hooks/useAdaptiveColors";
import { MobileGrid } from "./MobileGrid";
import { DesktopGrid } from "./DesktopGrid";

interface ApplicationsGridProps {
  imageSrc: string;
  apps: AppData[];
  categories: Category[];
}

const defaultColors: AdaptiveColors = {
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

export function ApplicationsGrid({ imageSrc, apps, categories }: ApplicationsGridProps) {
  const isMobile = useIsMobile();
  const adaptiveColors = useAdaptiveColors(imageSrc || "");
  const colors = isMobile ? defaultColors : (adaptiveColors || defaultColors);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredApps = apps.filter((app) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      app.name.includes(searchQuery) ||
      app.description.includes(searchQuery) ||
      (app.englishName && app.englishName.toLowerCase().includes(searchLower)) ||
      (app.keywords && app.keywords.some((k) => k.toLowerCase().includes(searchLower)));

    const matchesCategory = isMobile ? true : selectedCategory === "" || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedApps = filteredApps.reduce((acc, app) => {
    if (!acc[app.category]) acc[app.category] = [];
    acc[app.category].push(app);
    return acc;
  }, {} as Record<string, AppData[]>);

  if (isMobile) {
    return (
      <MobileGrid
        groupedApps={groupedApps}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        colors={colors}
      />
    );
  }

  return (
    <DesktopGrid
      groupedApps={groupedApps}
      categories={categories}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      colors={colors}
    />
  );
}