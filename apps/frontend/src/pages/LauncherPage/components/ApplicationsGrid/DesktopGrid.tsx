import { useState, useRef, CSSProperties } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AppData, Category } from "@/types";
import { AdaptiveColors } from "../../hooks/useAdaptiveColors";
import { useScrollbar } from "../../hooks/useScrollbar";
import { Searchbox } from "../Search/Searchbox";
import { CategoryButton } from "../Category/CategoryButton";
import { AppIcon } from "../App/AppIcon";
import { Scrollbar } from "../UI/Scrollbar";
import { AppLogo } from "../UI/AppLogo";
import { KeyboardShortcut } from "../UI/KeyboardShortcut";
import { TIMING, URLS } from "../../../../constants";
import { resolveIconUrl } from "../../utils/resolveIconUrl";

interface DesktopGridProps {
  groupedApps: Record<string, AppData[]>;
  categories: Category[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  colors: AdaptiveColors;
}

const GRID_CONFIG = {
  panel: {
    width: 640,
    maxWidth: "90vw",
    height: 480,
    borderRadius: 24,
    topOffset: "15%",
  },
  footer: {
    gap: 16, // 1rem
  },
  padding: {
    horizontal: 32, // px-8
    top: 16, // pt-4
    bottom: 16, // pb-4
  },
  appsPerRow: 4,
  animation: {
    duration: 0.4,
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
  },
  transition: {
    duration: 0.25,
    ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
  },
} as const;

const getGlassMorphismStyle = (colors: AdaptiveColors): CSSProperties => ({
  background: colors.panelBg,
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  border: `1px solid ${colors.panelBorder}`,
  boxShadow: colors.panelShadow,
});

const getCategoryDividerStyle = (colors: AdaptiveColors): CSSProperties => ({
  borderColor: colors.isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)",
});

const getCategoryTitleStyle = (colors: AdaptiveColors): CSSProperties => ({
  color: colors.textPrimary,
  opacity: 0.5,
  textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
});

const getFooterTextStyle = (colors: AdaptiveColors): CSSProperties => ({
  lineHeight: 1.8,
  color: colors.textPrimary,
  opacity: 0.7,
  textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
});

export function DesktopGrid({
  groupedApps,
  categories,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  colors,
}: DesktopGridProps) {
  const [hoveredApp, setHoveredApp] = useState<AppData | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();
  
  const { isScrollbarVisible, scrollPosition, scrollHeight, clientHeight } = useScrollbar(scrollRef);

  const handleAppHover = (app: AppData) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredApp(app);
  };

  const handleAppLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredApp(null);
    }, TIMING.HOVER_DELAY);
  };

  const handleFooterMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  };

  const handleFooterMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredApp(null);
    }, TIMING.HOVER_DELAY);
  };

  const handleFooterClick = () => {
    if (!hoveredApp) {
      window.location.href = URLS.ZIGO_APP;
    }
  };

  const handleCategoryToggle = (categoryName: string) => {
    setSelectedCategory(selectedCategory === categoryName ? "" : categoryName);
  };

  const mainPanelStyle: CSSProperties = {
    ...getGlassMorphismStyle(colors),
  };

  const scrollContainerStyle: CSSProperties = {
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    direction: "rtl",
  };

  const footerPanelStyle: CSSProperties = {
    ...getGlassMorphismStyle(colors),
    cursor: hoveredApp ? "default" : "pointer",
  };

  const renderCategories = () => (
    <div className="relative w-full" data-name="categories" dir="rtl">
      <div className="flex items-center overflow-hidden">
        <div className="flex gap-2 items-center px-2 py-4 w-full">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <CategoryButton
                key={category.name}
                label={category.name}
                isActive={selectedCategory === category.name}
                onClick={() => handleCategoryToggle(category.name)}
                colors={colors}
              />
            ))
          ) : (
            <span className="text-gray-500">هیچ دسته‌بندی موجود نیست</span>
          )}
        </div>
      </div>
    </div>
  );

  const renderAppRow = (row: AppData[], rowIndex: number) => (
    <div key={rowIndex} className="relative w-full">
      <div className="overflow-visible">
        <div className="flex gap-2 py-0 w-full overflow-visible" style={{ direction: "rtl" }}>
          {row.map((app, index) => (
            <AppIcon
              key={index}
              app={app}
              onHover={() => handleAppHover(app)}
              onLeave={handleAppLeave}
              colors={colors}
            />
          ))}

          {Array.from({ length: GRID_CONFIG.appsPerRow - row.length }).map((_, i) => (
            <div key={`empty-${i}`} className="flex-1 min-w-0 shrink-0" />
          ))}
        </div>
      </div>
    </div>
  );

  const renderCategoryGroup = (
    category: string, 
    apps: AppData[], 
    categoryIndex: number, 
    totalCategories: number
  ) => {
    const rows: AppData[][] = [];
    for (let i = 0; i < apps.length; i += GRID_CONFIG.appsPerRow) {
      rows.push(apps.slice(i, i + GRID_CONFIG.appsPerRow));
    }
    
    const isLastCategory = categoryIndex === totalCategories - 1;

    return (
      <div key={category} className="flex flex-col items-start py-1 w-full relative">
        {!isLastCategory && (
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none border-b"
            style={getCategoryDividerStyle(colors)}
          />
        )}

        <div className="relative w-full py-2" data-name="Title" dir="rtl">
          <div className="flex items-center w-full">
            <div className="flex gap-2 items-center p-2 w-full">
              <p
                className="font-['IRANYekanX'] font-semibold text-sm truncate text-right"
                style={getCategoryTitleStyle(colors)}
                dir="rtl"
              >
                {category}
              </p>
            </div>
          </div>
        </div>

        {rows.map((row, rowIndex) => renderAppRow(row, rowIndex))}
      </div>
    );
  };

  const renderHoveredAppInfo = () => {
    if (!hoveredApp) return null;

    return (
      <motion.div
        key={hoveredApp.name}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{ 
          duration: GRID_CONFIG.transition.duration, 
          ease: GRID_CONFIG.transition.ease 
        }}
        className="flex gap-1 items-start flex-1 min-w-0"
        dir="rtl"
      >
        {hoveredApp.icon && (
          <motion.div
            className="relative shrink-0 w-6 h-6 mt-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ 
              duration: GRID_CONFIG.transition.duration, 
              ease: GRID_CONFIG.transition.ease 
            }}
            style={{ filter: colors.isLight ? "brightness(0)" : "brightness(1)" }}
          >
            <div className="w-full h-full flex items-center justify-center">
              {typeof hoveredApp.icon === "string" ? (
                <img
                  src={resolveIconUrl(hoveredApp.icon)}
                  alt={`${hoveredApp.name} icon`}
                  className="w-6 h-6 object-cover rounded-[6px]"
                />
              ) : (
                hoveredApp.icon
              )}
            </div>
          </motion.div>
        )}

        <p
          className="text-sm font-['IRANYekanX'] flex-1 min-w-0 overflow-hidden whitespace-normal break-words"
          style={getFooterTextStyle(colors)}
          dir="rtl"
        >
          {hoveredApp.description}
        </p>
      </motion.div>
    );
  };

  const renderDefaultFooterContent = () => (
    <motion.div
      key="default"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ 
        duration: GRID_CONFIG.transition.duration, 
        ease: GRID_CONFIG.transition.ease 
      }}
      className="flex gap-1 items-start justify-start flex-1 min-w-0"
      dir="rtl"
    >
      <div className="opacity-70">
        <AppLogo colors={colors} />
      </div>

      <p
        className="text-sm font-['IRANYekanX'] flex-1 min-w-0 overflow-hidden"
        style={getFooterTextStyle(colors)}
        dir="rtl"
      >
        اول از زیگو بپرس!
      </p>
    </motion.div>
  );

  return (
    <>
      {/* Main Panel */}
      <div
        className="fixed flex flex-col items-center z-10 left-1/2 -translate-x-1/2"
        data-name="ApplicationsGrid"
        style={{
          ...mainPanelStyle,
          top: GRID_CONFIG.panel.topOffset,
          width: GRID_CONFIG.panel.width,
          maxWidth: GRID_CONFIG.panel.maxWidth,
          height: GRID_CONFIG.panel.height,
          borderRadius: GRID_CONFIG.panel.borderRadius,
        }}
      >
        <div className="w-full px-8 pt-4 shrink-0">
          <Searchbox 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            colors={colors} 
          />
        </div>

        <div 
          className="flex-1 w-full flex gap-2 items-start px-8 pb-4 min-h-0 overflow-hidden" 
          style={{ direction: "rtl" }}
        >
          <div
            ref={scrollRef}
            className="flex-1 flex flex-col items-start min-h-0 h-full max-h-full overflow-y-auto overflow-x-hidden"
            style={scrollContainerStyle}
          >
            {renderCategories()}

            {Object.entries(groupedApps).map(([category, apps], index, array) => 
              renderCategoryGroup(category, apps, index, array.length)
            )}
          </div>

          <Scrollbar 
            isVisible={isScrollbarVisible} 
            scrollPosition={scrollPosition} 
            scrollHeight={scrollHeight} 
            clientHeight={clientHeight} 
            colors={colors} 
          />
        </div>
      </div>

      {/* Footer Panel - با فاصله استاندارد زیر پنل اصلی */}
      <div
        className="fixed z-10 left-1/2 -translate-x-1/2"
        style={{
          top: `calc(${GRID_CONFIG.panel.topOffset} + ${GRID_CONFIG.panel.height}px + ${GRID_CONFIG.footer.gap}px)`,
          width: GRID_CONFIG.panel.width,
          maxWidth: GRID_CONFIG.panel.maxWidth,
        }}
      >
        <motion.div
          className="flex items-center px-4 overflow-visible"
          style={{
            ...footerPanelStyle,
            borderRadius: GRID_CONFIG.panel.borderRadius,
          }}
          layout
          transition={{
            layout: {
              duration: GRID_CONFIG.animation.duration,
              ease: GRID_CONFIG.animation.ease,
            },
          }}
          onClick={handleFooterClick}
        >
          <motion.div
            className="flex items-start py-3 w-full gap-2"
            dir="rtl"
            layout
            transition={{
              layout: { 
                duration: GRID_CONFIG.animation.duration, 
                ease: GRID_CONFIG.animation.ease 
              },
            }}
          >
            <div
              className="flex gap-1 items-start flex-1 min-w-0 relative z-[1]"
              onMouseEnter={handleFooterMouseEnter}
              onMouseLeave={handleFooterMouseLeave}
            >
              <AnimatePresence mode="wait" initial={false}>
                {hoveredApp ? renderHoveredAppInfo() : renderDefaultFooterContent()}
              </AnimatePresence>
            </div>

            <div className="flex gap-1 items-start shrink-0">
              <AnimatePresence>
                {!hoveredApp && (
                  <motion.div 
                    initial={{ opacity: 0, y: 4 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -4 }} 
                    transition={{ 
                      duration: GRID_CONFIG.transition.duration + 0.05, 
                      ease: GRID_CONFIG.transition.ease 
                    }}
                  >
                    <KeyboardShortcut colors={colors} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}