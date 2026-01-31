import { useRef } from "react";
import { AppData } from "../../../data/types";
import { AdaptiveColors } from "../../hooks/useAdaptiveColors";
import { AppListItem } from "../App/AppListItem";
import { MobileSearchBar } from "../Search/MobileSearchBar";

interface MobileGridProps {
  groupedApps: Record<string, AppData[]>;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  colors: AdaptiveColors;
}

export function MobileGrid({ groupedApps, searchQuery, setSearchQuery, colors }: MobileGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto touch-auto"
        style={{ width: "100vw", paddingBottom: 16 }}
      >
        <div className="w-full px-4">
          {Object.entries(groupedApps).length === 0 ? (
            <div className="pt-6 text-center">
              <p
                className="font-['IRANYekanX'] text-base"
                style={{
                  color: colors.textTertiary,
                  textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
                }}
                dir="rtl"
              >
                نتیجه‌ای یافت نشد
              </p>
            </div>
          ) : (
            Object.entries(groupedApps).map(([category, categoryApps]) => (
              <div key={category} className="w-full">
                <div className="pt-6 pb-4">
                  <p
                    className="font-['IRANYekanX'] font-bold text-right"
                    style={{
                      fontSize: 32,
                      color: colors.textPrimary,
                      opacity: 0.5,
                      textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
                      fontWeight: 700,
                    }}
                    dir="rtl"
                  >
                    {category}
                  </p>
                </div>

                {categoryApps.map((app) => (
                  <AppListItem key={app.name} app={app} colors={colors} />
                ))}
              </div>
            ))
          )}
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