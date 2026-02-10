import { useRef, CSSProperties } from "react";
import { IAppData } from "@/types";
import { AdaptiveColors } from "../../hooks/useAdaptiveColors";
import { AppListItem } from "../App/AppListItem";
import { MobileSearchBar } from "../Search/MobileSearchBar";

interface MobileGridProps {
  groupedApps: Record<string, IAppData[]>;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  colors: AdaptiveColors;
}

export function MobileGrid({ 
  groupedApps, 
  searchQuery, 
  setSearchQuery, 
  colors 
}: MobileGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hasResults = Object.entries(groupedApps).length > 0;

  const emptyStateTextStyle: CSSProperties = {
    color: colors.textTertiary,
    textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
  };

  const categoryTitleStyle: CSSProperties = {
    color: colors.textPrimary,
    textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
  };

  const renderEmptyState = () => (
    <div className="pt-6 text-center">
      <p
        className="font-['IRANYekanX'] text-base"
        style={emptyStateTextStyle}
        dir="rtl"
      >
        نتیجه‌ای یافت نشد
      </p>
    </div>
  );

  const renderCategory = (category: string, categoryApps: IAppData[]) => (
    <div key={category} className="w-full">
      <div className="pt-6 pb-4">
        <p
          className="font-['IRANYekanX'] font-bold text-right text-[32px] opacity-50"
          style={categoryTitleStyle}
          dir="rtl"
        >
          {category}
        </p>
      </div>

      {categoryApps.map((app) => (
        <AppListItem 
          key={app.name} 
          app={app} 
          colors={colors} 
        />
      ))}
    </div>
  );

  return (
    <>
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto touch-auto w-screen pb-4"
      >
        <div className="w-full px-4">
          {!hasResults 
            ? renderEmptyState() 
            : Object.entries(groupedApps).map(([category, apps]) => 
                renderCategory(category, apps)
              )
          }
        </div>
      </div>

      <MobileSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        colors={colors}
        scrollContainerRef={scrollContainerRef}
      />
    </>
  );
}