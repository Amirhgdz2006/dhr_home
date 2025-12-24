import iconPaths from "./iconPaths";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AppData, Category } from "../data/types";
import { getCategoryNames } from "../data/categories";
import { useInstallPrompt } from "../hooks/useInstallPrompt";


const ICON_BASE = import.meta.env.VITE_BACKEND_URL;
function resolveIconUrl(url: string) {
  if (!url) return "";
  return url.startsWith("http") ? url : `${ICON_BASE}${url}`;
}


// Hook to detect mobile screen size
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    // Check on initial render
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

// Hook to analyze background image and determine color scheme
function useAdaptiveColors(imageSrc: string) {
  const [isLight, setIsLight] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  // Default dark theme colors (always return valid colors)
  const defaultColors = {
    isLight: false,
    isAnalyzed: false,
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

  useEffect(() => {
    // Reset state when image source changes
    setIsAnalyzed(false);
    setIsLight(false);
    
    // Don't analyze if no image source - return default dark theme
    if (!imageSrc || imageSrc.trim() === '') {
      setIsLight(false);
      setIsAnalyzed(true);
      return;
    }

    const img = new Image();
    
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setIsLight(false);
          setIsAnalyzed(true);
          return;
        }

        // Sample a smaller area for performance (center region)
        const sampleSize = 200;
        canvas.width = sampleSize;
        canvas.height = sampleSize;
        
        // Draw the full image scaled to sample size, then sample from center
        const scale = Math.min(sampleSize / img.width, sampleSize / img.height);
        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;
        const x = (sampleSize - scaledWidth) / 2;
        const y = (sampleSize - scaledHeight) / 2;
        
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

        let imageData;
        try {
          imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
        } catch (e) {
          // CORS error - can't read image data, default to dark theme
          setIsLight(false);
          setIsAnalyzed(true);
          return;
        }
        
        const data = imageData.data;
        
        let totalBrightness = 0;
        let pixelCount = 0;

        // Sample more pixels for better accuracy (every 8th pixel in RGBA)
        for (let i = 0; i < data.length; i += 32) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          // Calculate perceived brightness using luminance formula
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          totalBrightness += brightness;
          pixelCount++;
        }

        const averageBrightness = totalBrightness / pixelCount;
        // Use a lower threshold to better detect light backgrounds
        // If average brightness is above 100, consider it light
        // This ensures even moderately light backgrounds are detected
        const isLightBackground = averageBrightness > 100;
        setIsLight(isLightBackground);
        setIsAnalyzed(true);
      } catch (error) {
        setIsLight(false);
        setIsAnalyzed(true);
      }
    };

    img.onerror = () => {
      // Default to dark theme if image fails to load
      setIsLight(false);
      setIsAnalyzed(true);
    };

    // Try to load with CORS, but don't require it
    try {
      img.crossOrigin = "anonymous";
    } catch (e) {
      // Ignore CORS errors
    }
    
    img.src = imageSrc;
  }, [imageSrc]);

  // Return color scheme based on background brightness
  // Default to dark theme until analysis completes
  // Use isLight only if analysis is complete
  if (isAnalyzed && isLight) {
    // Light background - use dark text and darker overlays
    return {
      isLight: true,
      isAnalyzed,
      // Glass panels - subtle white overlays for light backgrounds
      panelBg: "rgba(255, 255, 255, 0.3)",
      panelBorder: "rgba(255, 255, 255, 0.4)",
      panelShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.7)",
      // Text colors - pure black for maximum readability on light backgrounds
      textPrimary: "#000000",
      textSecondary: "#000000",
      textTertiary: "rgba(0, 0, 0, 0.7)",
      // Text shadow for light backgrounds - no shadow needed
      textShadow: "none",
      // Category buttons - subtle white backgrounds for light theme
      buttonBgActive: "rgba(255, 255, 255, 0.75)",
      buttonBgInactive: "rgba(255, 255, 255, 0.4)",
      buttonBgHover: "rgba(255, 255, 255, 0.65)",
      buttonBorderActive: "rgba(0, 0, 0, 0.35)",
      buttonBorderInactive: "rgba(0, 0, 0, 0.15)",
      // Scrollbar
      scrollbarBg: "rgba(0, 0, 0, 0.4)",
    };
  } else {
    // Dark background - use light text and lighter overlays (current style)
    // Also used as default before analysis completes
    return {
      ...defaultColors,
      isAnalyzed,
    };
  }
}

// Placeholder icon component for apps without icons
function PlaceholderIcon({ size = 40 }: { size?: number }) {
  return (
    <svg
      className="block size-full"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
    >
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M8 12H16M12 8V16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}


function Searchbox({
  searchQuery,
  setSearchQuery,
  colors,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  colors: ReturnType<typeof useAdaptiveColors>;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    // Small delay to ensure the component is fully rendered
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Handle Cmd+A / Ctrl+A
    if ((e.metaKey || e.ctrlKey) && e.key === "a") {
      e.preventDefault();
      inputRef.current?.select();
    }
  };

  // Determine text color based on state
  const getTextColor = () => {
    if (isFocused || searchQuery.length > 0) {
      return colors.textPrimary; // Typing or focused
    } else if (isHovered) {
      return colors.textSecondary; // Hover
    } else {
      return colors.textTertiary; // Default
    }
  };

  return (
    <div
      className="relative shrink-0 w-full"
      data-name="searchbox"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-row items-center justify-start overflow-clip rounded-[inherit] size-full" dir="rtl">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-start pb-[16px] pt-[8px] px-[8px] relative w-full">
          <div
            className="overflow-clip relative shrink-0 size-[24px]"
            data-name="search-refraction"
          >
            <div
              className="absolute inset-[12.5%]"
              data-name="Icon"
            >
              <div
                className="absolute inset-[-5.556%]"
                style={
                  {
                    "--stroke-0": getTextColor(),
                  } as React.CSSProperties
                }
              >
                <svg
                  className="block size-full"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    d={iconPaths.p388bbe00}
                    id="Icon"
                    stroke="var(--stroke-0, white)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity={isFocused || searchQuery.length > 0 ? "1" : isHovered ? "0.85" : "0.7"}
                    strokeWidth="2"
                    className="transition-all"
                  />
                </svg>
              </div>
            </div>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="جستجو..."
            className="font-['IRANYekanX'] font-medium leading-[normal] not-italic text-[20px] bg-transparent border-none outline-none text-right flex-1 transition-all duration-200"
            style={{
              color: getTextColor(),
            }}
            dir="rtl"
          />
          <style>{`
            input::placeholder {
              color: ${isHovered ? colors.textSecondary : colors.textTertiary} !important;
              opacity: 1;
              transition: color 0.2s ease;
            }
          `}</style>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_0.5px] border-solid inset-0 pointer-events-none transition-all duration-200"
        style={{
          borderColor: isFocused || searchQuery.length > 0 
            ? colors.textPrimary 
            : isHovered 
            ? colors.textSecondary 
            : colors.textTertiary,
        }}
      />
    </div>
  );
}

function CategoryButton({
  label,
  isActive,
  onClick,
  colors,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
  colors: ReturnType<typeof useAdaptiveColors>;
}) {
  return (
    <button
      onClick={onClick}
      className="box-border content-stretch flex gap-[8px] items-center justify-center px-[12px] py-[6px] relative rounded-full shrink-0 transition-all duration-200"
      style={{
        background: isActive ? colors.buttonBgActive : colors.buttonBgInactive,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: `1px solid ${isActive ? colors.buttonBorderActive : colors.buttonBorderInactive}`,
        borderRadius: "9999px",
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = colors.buttonBgHover;
          e.currentTarget.style.border = `1px solid ${colors.buttonBorderActive}`;
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = colors.buttonBgInactive;
          e.currentTarget.style.border = `1px solid ${colors.buttonBorderInactive}`;
        }
      }}
    >
      <p
        className="font-['IRANYekanX'] font-medium leading-[normal] not-italic relative shrink-0 text-[12px] text-nowrap whitespace-pre transition-all"
        style={{
          color: isActive ? colors.textPrimary : colors.textTertiary,
        }}
        dir="rtl"
      >
        {label}
      </p>
    </button>
  );
}

function Categories({
  selectedCategory,
  setSelectedCategory,
  colors,
}: {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  colors: ReturnType<typeof useAdaptiveColors>;
}) {
  const categories = getCategoryNames();

  return (
    <div
      className="relative shrink-0 w-full"
      data-name="categories"
      dir="rtl"
    >
      <div className="flex flex-row items-center justify-start overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[8px] items-center justify-start px-[8px] py-[16px] relative w-full">
          {categories.map((category) => (
            <CategoryButton
              key={category}
              label={category}
              isActive={selectedCategory === category}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? "" : category,
                )
              }
              colors={colors}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Scrollbar({ 
  isVisible, 
  scrollPosition, 
  scrollHeight, 
  clientHeight,
  colors,
}: { 
  isVisible: boolean;
  scrollPosition: number;
  scrollHeight: number;
  clientHeight: number;
  colors: ReturnType<typeof useAdaptiveColors>;
}) {
  // Calculate scrollbar thumb height and position
  const scrollbarHeight = clientHeight > 0 ? (clientHeight / scrollHeight) * clientHeight : 64;
  const maxScroll = scrollHeight - clientHeight;
  const scrollbarTop = maxScroll > 0 ? (scrollPosition / maxScroll) * (clientHeight - scrollbarHeight) : 0;

  return (
    <div
      className="relative shrink-0 w-[4px] h-full"
      data-name="scrollbar-track"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <motion.div
        className="rounded-[3.35544e+07px] w-[4px] absolute"
        data-name="scrollbar-thumb"
        style={{
          background: colors.scrollbarBg,
          height: `${Math.max(scrollbarHeight, 20)}px`,
          top: `${scrollbarTop}px`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

function AppIcon({
  app,
  onHover,
  onLeave,
  colors,
}: {
  app: AppData;
  onHover: () => void;
  onLeave: () => void;
  colors: ReturnType<typeof useAdaptiveColors>;
}) {
  return (
    <a
      href={`https://dhr.digikala.com${app.url}`}
      className="basis-0 grow min-h-px min-w-px relative shrink-0 cursor-pointer no-underline"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ overflow: 'visible', textDecoration: 'none', color: 'inherit' }}
    >
      <div className="flex flex-col items-center justify-center overflow-visible rounded-[inherit] size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-center justify-center p-[8px] relative w-full" style={{ overflow: 'visible' }}>
          {/* Icon wrapper - colored container */}
          <div
            className="relative shrink-0 flex items-center justify-center overflow-visible"
            style={{ 
              width: '72px',
              height: '72px',
              backgroundColor: app.bgColor,
              borderRadius: '20px',
              boxShadow: colors.isLight 
                ? "0px 4px 16px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0, 0, 0, 0.1), inset 0px 1px 0px rgba(255, 255, 255, 0.5), inset 0px -1px 0px rgba(0, 0, 0, 0.05)"
                : "0px 4px 16px rgba(0, 0, 0, 0.35), 0px 2px 6px rgba(0, 0, 0, 0.2), inset 0px 1px 0px rgba(255, 255, 255, 0.2), inset 0px -1px 0px rgba(0, 0, 0, 0.1)",
              transition: 'box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = colors.isLight 
                ? "0px 6px 20px rgba(0, 0, 0, 0.2), 0px 3px 8px rgba(0, 0, 0, 0.12), inset 0px 1px 0px rgba(255, 255, 255, 0.6), inset 0px -1px 0px rgba(0, 0, 0, 0.08)"
                : "0px 6px 20px rgba(0, 0, 0, 0.45), 0px 3px 8px rgba(0, 0, 0, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.25), inset 0px -1px 0px rgba(0, 0, 0, 0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = colors.isLight 
                ? "0px 4px 16px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0, 0, 0, 0.1), inset 0px 1px 0px rgba(255, 255, 255, 0.5), inset 0px -1px 0px rgba(0, 0, 0, 0.05)"
                : "0px 4px 16px rgba(0, 0, 0, 0.35), 0px 2px 6px rgba(0, 0, 0, 0.2), inset 0px 1px 0px rgba(255, 255, 255, 0.2), inset 0px -1px 0px rgba(0, 0, 0, 0.1)";
            }}
          >
            {/* SVG icon container */}
            {app.icon ? (
              <div 
                className="flex items-center justify-center overflow-hidden" 
                style={{ 
                  width: '45px', 
                  height: '45px', 
                  borderRadius: '13px' 
                }}
              >
                {typeof app.icon === 'string' ? (
                  <img
                    src={resolveIconUrl(app.icon)}
                    alt={`${app.name} icon`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '13px' }}
                  />
                ) : (
                  app.icon
                )}
              </div>
            ) : (
              <div 
                className="flex items-center justify-center" 
                style={{ 
                  width: '45px', 
                  height: '45px', 
                  borderRadius: '13px',
                  color: colors.isLight ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)' 
                }}
              >
                <PlaceholderIcon size={45} />
              </div>
            )}
          </div>
          <div className="content-stretch flex gap-[8px] items-center justify-center overflow-clip relative shrink-0 w-full">
            <p
              className="[white-space-collapse:collapse] basis-0 font-['IRANYekanX'] font-normal grow leading-[normal] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[12px] text-center text-nowrap"
              style={{
                color: colors.textPrimary,
                textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0, 0, 0, 0.3)"),
              }}
              dir="rtl"
            >
              {app.name}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

// Mobile App List Item Component
function AppListItem({
  app,
  colors,
}: {
  app: AppData;
  colors: ReturnType<typeof useAdaptiveColors>;
}) {
  return (
    <div style={{ position: 'relative' }}>
      <a
        href={`https://dhr.digikala.com${app.url}`}
        className="flex flex-row items-center w-full no-underline"
        style={{
          textDecoration: 'none',
          color: 'inherit',
          minHeight: '72px',
          direction: 'rtl',
          paddingTop: '16px',
          paddingBottom: '24px',
        }}
      >
        {/* App Icon - Right side (RTL) */}
        <div
          className="relative shrink-0 flex items-center justify-center"
          style={{
            width: '56px',
            height: '56px',
            backgroundColor: app.bgColor,
            borderRadius: '16px',
            boxShadow: colors.isLight
              ? "0px 4px 16px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0, 0, 0, 0.1), inset 0px 1px 0px rgba(255, 255, 255, 0.5), inset 0px -1px 0px rgba(0, 0, 0, 0.05)"
              : "0px 4px 16px rgba(0, 0, 0, 0.35), 0px 2px 6px rgba(0, 0, 0, 0.2), inset 0px 1px 0px rgba(255, 255, 255, 0.2), inset 0px -1px 0px rgba(0, 0, 0, 0.1)",
            marginLeft: '16px',
            flexShrink: 0,
          }}
        >
          {app.icon ? (
            <div
              className="flex items-center justify-center overflow-hidden"
              style={{
                width: '35px',
                height: '35px',
                borderRadius: '10px',
              }}
            >
              {app.icon}
            </div>
          ) : (
            <div
              className="flex items-center justify-center"
              style={{
                width: '35px',
                height: '35px',
                borderRadius: '10px',
                color: colors.isLight ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)',
              }}
            >
              <PlaceholderIcon size={35} />
            </div>
          )}
        </div>

        {/* App Name and Description - Left side (RTL) */}
        <div 
          className="flex-1 flex flex-col items-start justify-center min-w-0" 
          style={{ 
            direction: 'rtl',
            position: 'relative',
          }}
        >
          <p
            className="font-['IRANYekanX'] font-semibold text-[16px] w-full mb-1"
            style={{
              color: colors.textPrimary,
              textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0, 0, 0, 0.3)"),
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              textAlign: 'right',
            }}
          >
            {app.name}
          </p>
          <p
            className="font-['IRANYekanX'] font-normal text-[14px] w-full"
            style={{
              color: colors.textTertiary,
              textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0, 0, 0, 0.3)"),
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: '1.7',
              textAlign: 'right',
            }}
          >
            {app.description}
          </p>
          {/* Stroke below - spans from text to left edge */}
          <div
            style={{
              borderBottom: `1px solid ${colors.isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.15)'}`,
              marginTop: '16px',
              width: 'calc(100% + 16px)', // Extend to left edge (accounting for parent padding)
              position: 'absolute',
              bottom: '-24px',
              left: '-16px', // Extend to left edge
            }}
          />
        </div>
      </a>
    </div>
  );
}

// Mobile Search Bar Component with Zigo Button
function MobileSearchBar({
  searchQuery,
  setSearchQuery,
  colors,
  scrollContainerRef,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  colors: ReturnType<typeof useAdaptiveColors>;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to top when search query changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      // Always scroll to top when search changes (even if empty)
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTop = 0;
        }
      }, 50);
    }
  }, [searchQuery]);

  const getTextColor = () => {
    if (isFocused || searchQuery.length > 0) {
      return colors.textPrimary;
    } else {
      return colors.textTertiary;
    }
  };

  return (
    <div
      style={{
        // position: 'fixed',
        // bottom: '4px',
        // left: 0,
        // right: 0,
        width: '100%',
        padding: '16px 16px 16px 16px',
        // paddingLeft: '16px',
        // paddingRight: '16px',
        paddingBottom: 'max(0px, env(safe-area-inset-bottom))',
        // zIndex: 9999,
        pointerEvents: 'none', // Allow clicks to pass through container
        display: 'flex',
        flexDirection: 'row',
        // alignItems: 'center',
        gap: '12px',
        position: 'absolute',
        bottom: 20
        // height: '68px',
      }}
    >
      {/* Zigo Button - Left side */}
      <button
        onClick={() => {
          window.location.href = 'https://dhr.digikala.com/apps/zigo';
        }}
        className="shrink-0 flex items-center justify-center"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          // background: colors.panelBg,
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: `1px solid ${colors.panelBorder}`,
          boxShadow: colors.panelShadow,
          cursor: 'pointer',
          padding: 0,
          margin: 0,
          pointerEvents: 'auto', // Enable clicks on button
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: '28px',
            height: '28px',
            filter: colors.isLight ? 'brightness(0)' : 'brightness(1)',
          }}
        >
          {/* {createZigoIcon()} */}
        </div>
      </button>

      {/* Search Input - Takes most width with liquid glass effect */}
      <div
        className="flex-1 relative"
        style={{
          background: colors.panelBg,
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: `1px solid ${colors.panelBorder}`,
          borderRadius: '9999px', // Pill shape
          boxShadow: colors.panelShadow,
          padding: '12px 16px',
          height: '48px',
          pointerEvents: 'auto', // Enable clicks on search box
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          placeholder="جستجو..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          inputMode="text"
          data-1p-ignore="true"
          data-lpignore="true"
          className="w-full font-['IRANYekanX'] font-normal text-[16px] outline-none border-none"
          style={{
            color: getTextColor(),
            textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0, 0, 0, 0.3)"),
            background: 'transparent',
            backgroundColor: 'transparent',
            WebkitAppearance: 'none',
            appearance: 'none',
            border: 'none',
            outline: 'none',
            padding: 0,
          }}
          dir="rtl"
        />
        <style>
          {`
            input {
              background: transparent !important;
              background-color: transparent !important;
              -webkit-appearance: none !important;
              appearance: none !important;
            }
            input::placeholder {
              color: ${colors.textTertiary};
              opacity: 0.7;
            }
            input::-webkit-search-decoration,
            input::-webkit-search-cancel-button,
            input::-webkit-search-results-button,
            input::-webkit-search-results-decoration {
              display: none !important;
              -webkit-appearance: none !important;
              appearance: none !important;
            }
            input[type="search"]::-webkit-search-decoration,
            input[type="search"]::-webkit-search-cancel-button {
              display: none !important;
              -webkit-appearance: none !important;
              appearance: none !important;
            }
          `}
        </style>
      </div>
    </div>
  );
}

function ApplicationsGrid({ imageSrc, apps, categories }: { imageSrc: string; apps: AppData[]; categories: Category[] }) {
  const isMobile = useIsMobile();
  const adaptiveColors = useAdaptiveColors(imageSrc || '');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // On mobile, use dark theme colors since there's no background image
  // On desktop, use adaptive colors from background image (with fallback to default)
  const colors = isMobile 
    ? {
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
      }
    : (adaptiveColors || {
        isLight: false,
        isAnalyzed: false,
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
      });
  const [hoveredApp, setHoveredApp] = useState<AppData | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isScrollbarVisible, setIsScrollbarVisible] =
    useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      const scrollElement = scrollRef.current;
      if (scrollElement) {
        setScrollPosition(scrollElement.scrollTop);
        setScrollHeight(scrollElement.scrollHeight);
        setClientHeight(scrollElement.clientHeight);
        setIsScrollbarVisible(true);

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrollbarVisible(false);
        }, 1000);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      // Initial calculation
      setScrollHeight(scrollElement.scrollHeight);
      setClientHeight(scrollElement.clientHeight);
      
      scrollElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener(
          "scroll",
          handleScroll,
        );
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Filter apps based on search and category
  const filteredApps = apps.filter((app) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      app.name.includes(searchQuery) ||
      app.description.includes(searchQuery) ||
      (app.englishName && app.englishName.toLowerCase().includes(searchLower)) ||
      (app.keywords && app.keywords.some(keyword => keyword.toLowerCase().includes(searchLower)));
    // On mobile, don't filter by category
    const matchesCategory = isMobile
      ? true
      : selectedCategory === "" || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group apps by category
  const groupedApps = filteredApps.reduce(
    (acc, app) => {
      if (!acc[app.category]) {
        acc[app.category] = [];
      }
      acc[app.category].push(app);
      return acc;
    },
    {} as Record<string, AppData[]>,
  );

  // Mobile Layout
  if (isMobile) {
    return (
      <>
        {/* Mobile App List - Scrollable area above search bar */}
        <div
          ref={scrollContainerRef}
          className="flex-1"
          // className="fixed top-0 left-0 right-0"
          style={{
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch',
            // zIndex: 1,
            width: '100vw',
            // bottom: '68px', // Space for search bar (48px button + 4px bottom + 16px gap)
            // height: 'calc(100dvh - 68px)', // Height minus search bar
            paddingBottom: '16px', // Extra padding at bottom
          }}
        >
          <div className="w-full" style={{ paddingLeft: '16px', paddingRight: '16px' }}>
            {Object.entries(groupedApps).length === 0 ? (
              <div style={{ paddingTop: '24px', textAlign: 'center' }}>
                <p
                  className="font-['IRANYekanX'] font-normal text-[16px]"
                  style={{
                    color: colors.textTertiary,
                    textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0, 0, 0, 0.3)"),
                  }}
                  dir="rtl"
                >
                  نتیجه‌ای یافت نشد
                </p>
              </div>
            ) : (
              Object.entries(groupedApps).map(([category, categoryApps]) => (
                <div key={category} className="w-full">
                  {/* Category Title */}
                  <div style={{ paddingTop: '24px', paddingBottom: '16px' }}>
                    <p
                      className="font-['IRANYekanX'] font-bold text-right"
                      style={{
                        fontSize: '32px',
                        color: colors.textPrimary,
                        opacity: 0.5,
                        textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0, 0, 0, 0.3)"),
                        fontWeight: 700,
                      }}
                      dir="rtl"
                    >
                      {category}
                    </p>
                  </div>

                  {/* App List Items */}
                  {categoryApps.map((app) => (
                    <AppListItem key={app.name} app={app} colors={colors} />
                  ))}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Mobile Search Bar - Always visible at bottom */}
        <MobileSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          colors={colors}
          scrollContainerRef={scrollContainerRef}
        />
      </>
    );
  }

  // Desktop Layout
  return (
    <>
      <div
        className="fixed box-border flex flex-col h-[480px] items-center rounded-[24px] w-[640px] max-w-[90vw] z-10"
        data-name="ApplicationsGrid"
        style={{
          background: colors.panelBg,
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: `1px solid ${colors.panelBorder}`,
          boxShadow: colors.panelShadow,
          position: "fixed",
          left: "50%",
          top: "15%",
          marginLeft: "-320px",
        }}
      >
        {/* Fixed Search Box */}
        <div className="shrink-0 w-full px-[32px] pt-[16px]">
          <Searchbox
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            colors={colors}
          />
        </div>

        {/* Scrollable Content Area (Categories + Apps) */}
        <div className="flex-1 w-full flex gap-[8px] items-start justify-start px-[32px] pb-[16px] min-h-0" style={{ overflow: "hidden", height: "100%", direction: "rtl" }}>
          <div
            ref={scrollRef}
            className="flex-1 flex flex-col items-start min-h-0 scrollbar-hide"
            style={{
              overflowY: "auto",
              overflowX: "hidden",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              height: "100%",
              maxHeight: "100%",
              direction: "rtl",
            }}
          >
            {/* Categories inside scrollable area */}
            <div
              className="relative shrink-0 w-full"
              data-name="categories"
              dir="rtl"
            >
              <div className="flex flex-row items-center justify-start overflow-clip rounded-[inherit] size-full">
                      <div className="box-border content-stretch flex gap-[8px] items-center justify-start px-[8px] py-[16px] relative w-full">
                      {(
                        categories && categories.length
                          ? categories.map((c) => c.name)
                          : ["ابزارها", "مستندات", "پلتفرم‌ها", "ارتباطات داخلی", "درخواست‌های اداری"]
                      ).map((category) => (
                        <CategoryButton
                          key={category}
                          label={category}
                          isActive={selectedCategory === category}
                          onClick={() =>
                            setSelectedCategory(
                              selectedCategory === category
                                ? ""
                                : category,
                            )
                          }
                          colors={colors}
                        />
                      ))}
                    </div>
              </div>
            </div>

            {/* Apps Grid */}
            {Object.entries(groupedApps).map(
              ([category, apps], categoryIndex, categoriesArray) => {
                // Split apps into rows of 4
                const rows: AppData[][] = [];
                for (let i = 0; i < apps.length; i += 4) {
                  rows.push(apps.slice(i, i + 4));
                }

                const isLastCategory = categoryIndex === categoriesArray.length - 1;

                return (
                  <div
                    key={category}
                    className="box-border content-stretch flex flex-col items-start px-0 py-[6px] relative shrink-0 w-full"
                  >
                    {!isLastCategory && (
                      <div
                        aria-hidden="true"
                        className="absolute border-[0px_0px_0.5px] border-solid inset-0 pointer-events-none"
                        style={{
                          borderColor: colors.isLight 
                            ? `rgba(0, 0, 0, 0.05)` 
                            : `rgba(255, 255, 255, 0.05)`,
                        }}
                      />
                    )}

                    {/* Category Title */}
                    <div
                      className="relative shrink-0 w-full"
                      data-name="Title"
                      dir="rtl"
                    >
                      <div className="flex flex-row items-center justify-start size-full">
                        <div className="box-border content-stretch flex gap-[8px] items-center justify-start p-[8px] relative w-full">
                          <p
                            className="basis-0 font-['IRANYekanX'] font-semibold grow leading-[normal] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-right"
                            style={{
                              color: colors.textPrimary,
                              opacity: 0.5,
                              textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0, 0, 0, 0.3)"),
                            }}
                            dir="rtl"
                          >
                            {category}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Apps Grid Rows */}
                    {rows.map((row, rowIndex) => (
                      <div
                        key={rowIndex}
                        className="relative shrink-0 w-full"
                      >
                        <div className="overflow-visible rounded-[inherit] size-full">
                          <div className="box-border content-stretch flex flex-row gap-[8px] items-start py-0 relative w-full" style={{ overflow: 'visible', direction: 'rtl' }}>
                            {row.map((app, index) => (
                              <AppIcon
                                key={index}
                                app={app}
                                onHover={() => {
                                  // Clear any pending timeout
                                  if (hoverTimeoutRef.current) {
                                    clearTimeout(hoverTimeoutRef.current);
                                  }
                                  setHoveredApp(app);
                                }}
                                onLeave={() => {
                                  // Add a small delay to prevent flickering when moving between apps
                                  hoverTimeoutRef.current = setTimeout(() => {
                                    setHoveredApp(null);
                                  }, 100);
                                }}
                                colors={colors}
                              />
                            ))}
                            {/* Fill remaining spots with empty divs to maintain grid */}
                            {Array.from({
                              length: 4 - row.length,
                            }).map((_, i) => (
                              <div
                                key={`empty-${i}`}
                                className="basis-0 grow min-h-px min-w-px shrink-0"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              },
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

      {/* Bottom Info Bar - Outside and below main frame */}
      <div 
        className="fixed w-[640px] max-w-[90vw] z-10"
        style={{
          position: "fixed",
          left: "50%",
          top: "calc(15% + 480px + 1rem)",
          marginLeft: "-320px",
        }}
      >
        <motion.div
          className="flex flex-row items-center rounded-[24px]"
          style={{
            background: colors.panelBg,
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: `1px solid ${colors.panelBorder}`,
            boxShadow: colors.panelShadow,
            cursor: hoveredApp ? 'default' : 'pointer',
            paddingLeft: "16px",
            paddingRight: "16px",
            overflow: "visible",
          }}
          layout
          transition={{
            layout: {
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            },
          }}
          onClick={() => {
            if (!hoveredApp) {
              window.location.href = 'https://dhr.digikala.com/apps/zigo';
            }
          }}
        >
          <motion.div 
            className="box-border flex items-start justify-between py-[12px] relative w-full gap-[8px]" 
            dir="rtl"
            layout
            transition={{
              layout: {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
          >
            {/* Right side - Zigo icon + text (default) or App icon + description (hover) */}
            <div 
              className="flex gap-[4px] items-start flex-1 justify-start"
              style={{ minWidth: 0, position: 'relative', zIndex: 1 }}
              onMouseEnter={() => {
                // Clear timeout when mouse enters description area
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current);
                }
              }}
              onMouseLeave={() => {
                // Reset to default when mouse leaves description area
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current);
                }
                hoverTimeoutRef.current = setTimeout(() => {
                  setHoveredApp(null);
                }, 100);
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {hoveredApp && (
                  <motion.div
                    key={hoveredApp.name}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{
                      duration: 0.25,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="flex gap-[6px] items-start"
                    dir="rtl"
                    style={{ flex: 1, minWidth: 0 }}
                  >
                    {hoveredApp.icon && (
                      <motion.div
                        className="relative shrink-0 size-[24px] flex-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{
                          duration: 0.25,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        style={{
                          filter: colors.isLight ? 'brightness(0)' : 'brightness(1)',
                          marginTop: "2px",
                        }}
                      >
                        <div className="size-full flex items-center justify-center">
                          {typeof hoveredApp.icon === 'string' ? (
                            <img
                              src={resolveIconUrl(hoveredApp.icon)}
                              alt={`${hoveredApp.name} icon`}
                              style={{ width: '24px', height: '24px', objectFit: 'cover', borderRadius: '6px' }}
                            />
                          ) : (
                            hoveredApp.icon
                          )}
                        </div>
                      </motion.div>
                    )}
                    <p
                      className="font-['IRANYekanX'] font-normal not-italic text-[14px] text-right"
                      style={{ 
                        lineHeight: "1.8",
                        color: colors.textPrimary,
                        opacity: 0.7,
                        textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0, 0, 0, 0.3)"),
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        flex: 1,
                        minWidth: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                      dir="rtl"
                    >
                      {hoveredApp.description}
                    </p>
                  </motion.div>
                )}
                {!hoveredApp && (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{
                      duration: 0.25,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="flex gap-[6px] items-start justify-start flex-1 min-w-0"
                    dir="rtl"
                  >
                    <div style={{ opacity: 0.7 }}>
                      <AppLogo colors={colors} />
                    </div>
                    <p
                      className="font-['IRANYekanX'] font-normal not-italic text-[14px] text-right flex-1 min-w-0"
                      style={{
                        lineHeight: "1.8",
                        color: colors.textPrimary,
                        opacity: 0.7,
                        textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0, 0, 0, 0.3)"),
                        whiteSpace: "normal",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                      dir="rtl"
                    >
                      اول از زیگو بپرس!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Left side - cmdK (only in default state) */}
            <div className="flex gap-[4px] items-start shrink-0">
              <AnimatePresence>
                {!hoveredApp && (
                  <motion.div
                    className="flex gap-[4px] items-start shrink-0"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1],
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

function KeyboardShortcut({
  colors,
}: {
  colors: ReturnType<typeof useAdaptiveColors>;
}) {
  return (
    <div
      className="box-border content-stretch flex items-start px-[4px] py-[2px] relative rounded-[4px] shrink-0"
      data-name="Key"
    >
      <div
        aria-hidden="true"
        className="absolute border border-solid inset-0 pointer-events-none rounded-[4px]"
        style={{
          borderColor: colors.isLight ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)",
        }}
      />
      <p 
        className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-nowrap whitespace-pre"
        style={{
          color: colors.textPrimary,
          textShadow: colors.textShadow || (colors.isLight ? "0 1px 2px rgba(255, 255, 255, 0.5)" : "0 1px 2px rgba(0, 0, 0, 0.3)"),
        }}
      >
        ⌘K
      </p>
    </div>
  );
}

function AppLogo({
  colors,
}: {
  colors: ReturnType<typeof useAdaptiveColors>;
}) {
  return (
    <div
      className="relative shrink-0 size-[24px]"
      data-name="logo_red"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="logo_red">
          <path
            clipRule="evenodd"
            d={iconPaths.p391d81f2}
            fill={colors.isLight ? "#000000" : "rgba(255, 255, 255, 0.7)"}
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

export default function LauncherPage({ apps, categories }: { apps: AppData[]; categories: Category[] }) {


  const [imgSrc, setImgSrc] = useState<string>("");

  const imgRef = useRef<HTMLImageElement>(null);
  const isMobile = useIsMobile();
  const { isInstallable, isInstalled, promptInstall } = useInstallPrompt();
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  const colors = useAdaptiveColors(isMobile ? '' : (imgSrc));


  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL; 
    const imageUrl = `${backendUrl}/uploads/background.png`;

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      setImgSrc(imageUrl);
    };

    img.onerror = () => {
      console.error("Background image failed to load:", imageUrl);
    };
  }, []);


  useEffect(() => {
    if (!isMobile) {
      setImgSrc((prev) => prev);
    }
  }, [isMobile]);


  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        window.location.href = 'https://dhr.digikala.com/apps/zigo';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  // viewport calculation
  useEffect(() => {
    const setScreenHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setScreenHeight();
    window.addEventListener('resize', setScreenHeight);
    window.addEventListener('orientationchange', setScreenHeight);

    return () => {
      window.removeEventListener('resize', setScreenHeight);
      window.removeEventListener('orientationchange', setScreenHeight);
    };
  }, []);


  useEffect(() => {
    if (isInstallable && !isInstalled) {
      const timer = setTimeout(() => {
        setShowInstallBanner(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowInstallBanner(false);
    }
  }, [isInstallable, isInstalled]);


  const handleInstallClick = async () => {
    const installed = await promptInstall();
    if (installed) {
      setShowInstallBanner(false);
    }
  };


  return (
    <div
      className="relative w-full h-screen overflow-hidden flex flex-col"
      style={{ backgroundColor: '#000' }}
      data-name="Desktop - 1"
    >

      {/* Install Banner */}
      {showInstallBanner && (isInstallable && !isInstalled) && (
        <div
          style={{
            position: 'fixed',
            bottom: isMobile ? '68px' : '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10000,
            maxWidth: '90vw',
            width: isMobile ? 'calc(100% - 32px)' : '500px',
          }}
        >
          <div
            style={{
              background: colors.panelBg,
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              border: `1px solid ${colors.panelBorder}`,
              borderRadius: '16px',
              boxShadow: colors.panelShadow,
              padding: '16px',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '12px',
            }}
            dir="rtl"
          >
            <div style={{ flex: 1 }}>
              <p
                className="font-['IRANYekanX'] font-semibold text-[14px]"
                style={{
                  color: colors.textPrimary,
                  marginBottom: '4px',
                  textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0, 0, 0, 0.3)"),
                }}
                dir="rtl"
              >
                نصب لانچر دیجی‌کالا
              </p>
              <p
                className="font-['IRANYekanX'] font-normal text-[12px]"
                style={{
                  color: colors.textSecondary,
                  textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0, 0, 0, 0.3)"),
                }}
                dir="rtl"
              >
                لانچر را نصب کنید تا به صورت آفلاین نیز به این صفحه دسترسی داشته باشید
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '8px', flexShrink: 0 }}>
              <button
                onClick={() => setShowInstallBanner(false)}
                className="font-['IRANYekanX'] font-normal text-[12px]"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: colors.textTertiary,
                  cursor: 'pointer',
                  padding: '4px 8px',
                  textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0, 0, 0, 0.3)"),
                }}
                dir="rtl"
              >
                بستن
              </button>
              <button
                onClick={handleInstallClick}
                className="font-['IRANYekanX'] font-medium text-[14px]"
                style={{
                  background: colors.isLight ? 'rgba(0, 0, 0, 0.15)' : 'rgba(255, 255, 255, 0.35)',
                  border: `1px solid ${colors.isLight ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.4)'}`,
                  borderRadius: '8px',
                  padding: '8px 16px',
                  color: colors.textPrimary,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0, 0, 0, 0.3)"),
                }}
                dir="rtl"
              >
                نصب
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background Image */}
      {!isMobile && (
        <div 
          className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
          }}
        >
        <img
          ref={imgRef}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          src={imgSrc}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        </div>
      )}

      {isMobile ? (
        <ApplicationsGrid imageSrc="" apps={apps} categories={categories} />
      ) : (
        <ApplicationsGrid imageSrc={imgSrc} apps={apps} categories={categories} />
      )}

      {/* Logo */}
      {!isMobile && (
        <div
          className="fixed z-10 flex flex-col items-center justify-center"
          style={{
            position: "fixed",
            left: "50%",
            bottom: "1.5rem",
            transform: "translateX(-50%)",
            width: "auto",
            minWidth: "0",
          }}
        >
          {/* ... سایر بخش‌ها بدون تغییر ... */}
        </div>
      )}
    </div>
  );
}
