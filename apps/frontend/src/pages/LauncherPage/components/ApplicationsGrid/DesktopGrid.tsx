// DesktopGrid.tsx:
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AppData, Category } from "../../../data/types";
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

  return (
    <>
      <div
        className="fixed flex flex-col items-center rounded-[24px] w-[640px] max-w-[90vw] z-10 left-1/2 top-[15%] -translate-x-1/2 h-[480px]"
        data-name="ApplicationsGrid"
        style={{
          background: colors.panelBg,
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: `1px solid ${colors.panelBorder}`,
          boxShadow: colors.panelShadow,
        }}
      >
        <div className="w-full px-8 pt-4 shrink-0">
          <Searchbox searchQuery={searchQuery} setSearchQuery={setSearchQuery} colors={colors} />
        </div>

        <div className="flex-1 w-full flex gap-2 items-start px-8 pb-4 min-h-0 overflow-hidden" style={{ direction: "rtl" }}>
          <div
            ref={scrollRef}
            className="flex-1 flex flex-col items-start min-h-0 h-full max-h-full overflow-y-auto overflow-x-hidden"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              direction: "rtl",
            }}
          >
            <div className="relative w-full" data-name="categories" dir="rtl">
              <div className="flex items-center overflow-hidden">
                <div className="flex gap-2 items-center px-2 py-4 w-full">
                  {categories && categories.length > 0 ? (
                    categories.map((c) => (
                      <CategoryButton
                        key={c.name}
                        label={c.name}
                        isActive={selectedCategory === c.name}
                        onClick={() =>
                          setSelectedCategory(selectedCategory === c.name ? "" : c.name)
                        }
                        colors={colors}
                      />
                    ))
                  ) : (
                    <span className="text-gray-500">هیچ دسته‌بندی موجود نیست</span>
                  )}
                </div>
              </div>
            </div>

            {Object.entries(groupedApps).map(([category, apps], categoryIndex, categoriesArray) => {
              const rows: AppData[][] = [];
              for (let i = 0; i < apps.length; i += 4) rows.push(apps.slice(i, i + 4));
              const isLastCategory = categoryIndex === categoriesArray.length - 1;

              return (
                <div key={category} className="flex flex-col items-start py-1 w-full relative">
                  {!isLastCategory && (
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none border-b"
                      style={{
                        borderColor: colors.isLight ? `rgba(0,0,0,0.05)` : `rgba(255,255,255,0.05)`,
                      }}
                    />
                  )}

                  <div className="relative w-full py-2" data-name="Title" dir="rtl">
                    <div className="flex items-center w-full">
                      <div className="flex gap-2 items-center p-2 w-full">
                        <p
                          className="font-['IRANYekanX'] font-semibold text-sm truncate text-right"
                          style={{
                            color: colors.textPrimary,
                            opacity: 0.5,
                            textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
                          }}
                          dir="rtl"
                        >
                          {category}
                        </p>
                      </div>
                    </div>
                  </div>

                  {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className="relative w-full">
                      <div className="overflow-visible">
                        <div className="flex gap-2 py-0 w-full overflow-visible" style={{ direction: "rtl" }}>
                          {row.map((app, index) => (
                            <AppIcon
                              key={index}
                              app={app}
                              onHover={() => {
                                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                                setHoveredApp(app);
                              }}
                              onLeave={() => {
                                hoverTimeoutRef.current = setTimeout(() => setHoveredApp(null), TIMING.HOVER_DELAY);
                              }}
                              colors={colors}
                            />
                          ))}

                          {Array.from({ length: 4 - row.length }).map((_, i) => (
                            <div key={`empty-${i}`} className="flex-1 min-w-0 shrink-0" />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
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

      <div
        className="fixed w-[640px] max-w-[90vw] z-10 left-1/2 -translate-x-1/2"
        style={{
          top: "calc(15% + 480px + 1rem)",
        }}
      >
        <motion.div
          className="flex items-center rounded-[24px] px-4 overflow-visible"
          style={{
            background: colors.panelBg,
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: `1px solid ${colors.panelBorder}`,
            boxShadow: colors.panelShadow,
            cursor: hoveredApp ? "default" : "pointer",
          }}
          layout
          transition={{
            layout: {
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            },
          }}
          onClick={() => {
            if (!hoveredApp) window.location.href = URLS.ZIGO_APP;
          }}
        >
          <motion.div
            className="flex items-start py-3 w-full gap-2"
            dir="rtl"
            layout
            transition={{
              layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
            }}
          >
            <div
              className="flex gap-1 items-start flex-1 min-w-0 relative z-[1]"
              onMouseEnter={() => {
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
              }}
              onMouseLeave={() => {
                if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                hoverTimeoutRef.current = setTimeout(() => setHoveredApp(null), TIMING.HOVER_DELAY);
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {hoveredApp ? (
                  <motion.div
                    key={hoveredApp.name}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="flex gap-1 items-start flex-1 min-w-0"
                    dir="rtl"
                  >
                    {hoveredApp.icon && (
                      <motion.div
                        className="relative shrink-0 w-6 h-6 mt-[2px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
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
                      style={{
                        lineHeight: 1.8,
                        color: colors.textPrimary,
                        opacity: 0.7,
                        textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                      dir="rtl"
                    >
                      {hoveredApp.description}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    className="flex gap-1 items-start justify-start flex-1 min-w-0"
                    dir="rtl"
                  >
                    <div className="opacity-70">
                      <AppLogo colors={colors} />
                    </div>

                    <p
                      className="text-sm font-['IRANYekanX'] flex-1 min-w-0 overflow-hidden"
                      style={{
                        lineHeight: 1.8,
                        color: colors.textPrimary,
                        opacity: 0.7,
                        textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                      dir="rtl"
                    >
                      اول از زیگو بپرس!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-1 items-start shrink-0">
              <AnimatePresence>
                {!hoveredApp && (
                  <motion.div 
                    initial={{ opacity: 0, y: 4 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -4 }} 
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
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
