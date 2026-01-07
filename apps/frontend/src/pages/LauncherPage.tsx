import iconPaths from "./iconPaths";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AppData, Category } from "../data/types";
import { getCategoryNames } from "../data/categories";
import { useInstallPrompt } from "../hooks/useInstallPrompt";
import { BREAKPOINTS, TIMING, IMAGE_ANALYSIS, URLS, KEYBOARD_SHORTCUTS, DEFAULTS, LAYOUT } from "../constants";

/* ---------- Utilities & hooks ---------- */

function resolveIconUrl(url: string): string {
  if (!url) return "";
  const iconBase = import.meta.env.VITE_BACKEND_URL;
  return url.startsWith("http") ? url : `${iconBase}${url}`;
}

function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < BREAKPOINTS.MOBILE;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < BREAKPOINTS.MOBILE);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

function useAdaptiveColors(imageSrc: string) {
  const [isLight, setIsLight] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const defaultColors = {
    isLight: false,
    isAnalyzed: false,
    panelBg: "rgba(255, 255, 255, 0.15)",
    panelBorder: "rgba(255, 255, 255, 0.18)",
    panelShadow:
      "0 8px 32px 0 rgba(0, 0, 0, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
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
    setIsAnalyzed(false);
    setIsLight(false);

    if (!imageSrc || imageSrc.trim() === "") {
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

        const sampleSize = IMAGE_ANALYSIS.SAMPLE_SIZE;
        canvas.width = sampleSize;
        canvas.height = sampleSize;

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
          setIsLight(false);
          setIsAnalyzed(true);
          return;
        }

        const data = imageData.data;
        let totalBrightness = 0;
        let pixelCount = 0;

        for (let i = 0; i < data.length; i += IMAGE_ANALYSIS.PIXEL_SAMPLE_INTERVAL) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          totalBrightness += brightness;
          pixelCount++;
        }

        const averageBrightness = totalBrightness / pixelCount;
        const isLightBackground = averageBrightness > IMAGE_ANALYSIS.BRIGHTNESS_THRESHOLD;
        setIsLight(isLightBackground);
        setIsAnalyzed(true);
      } catch (error) {
        setIsLight(false);
        setIsAnalyzed(true);
      }
    };

    img.onerror = () => {
      setIsLight(false);
      setIsAnalyzed(true);
    };

    try {
      img.crossOrigin = "anonymous";
    } catch {}

    img.src = imageSrc;
  }, [imageSrc]);

  if (isAnalyzed && isLight) {
    return {
      isLight: true,
      isAnalyzed,
      panelBg: "rgba(255, 255, 255, 0.3)",
      panelBorder: "rgba(255, 255, 255, 0.4)",
      panelShadow:
        "0 8px 32px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.7)",
      textPrimary: "#000000",
      textSecondary: "#000000",
      textTertiary: "rgba(0, 0, 0, 0.7)",
      textShadow: "none",
      buttonBgActive: "rgba(255, 255, 255, 0.75)",
      buttonBgInactive: "rgba(255, 255, 255, 0.4)",
      buttonBgHover: "rgba(255, 255, 255, 0.65)",
      buttonBorderActive: "rgba(0, 0, 0, 0.35)",
      buttonBorderInactive: "rgba(0, 0, 0, 0.15)",
      scrollbarBg: "rgba(0, 0, 0, 0.4)",
    };
  }

  return {
    ...defaultColors,
    isAnalyzed,
  };
}

/* ---------- Small presentational components ---------- */

function PlaceholderIcon({ size = 40 }: { size?: number }) {
  return (
    <svg
      className="block"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
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

function AppLogo({ colors }: { colors: ReturnType<typeof useAdaptiveColors> }) {
  return (
    <div className="relative shrink-0 w-6 h-6" data-name="logo_red">
      <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
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

function KeyboardShortcut({ colors }: { colors: ReturnType<typeof useAdaptiveColors> }) {
  return (
    <div className="relative rounded-sm px-1 py-0.5" data-name="Key">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none rounded-sm"
        style={{
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: colors.isLight ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)",
        }}
      />
      <p
        className="relative text-sm font-medium whitespace-nowrap"
        style={{
          color: colors.textPrimary,
          textShadow: colors.textShadow || (colors.isLight ? "0 1px 2px rgba(255,255,255,0.5)" : "0 1px 2px rgba(0,0,0,0.3)"),
        }}
      >
        ⌘K
      </p>
    </div>
  );
}

/* ---------- Searchbox & category components ---------- */

function Searchbox({
  searchQuery,
  setSearchQuery,
  colors,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  colors: ReturnType<typeof useAdaptiveColors>;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), TIMING.AUTO_FOCUS_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === KEYBOARD_SHORTCUTS.SELECT_ALL) {
      e.preventDefault();
      inputRef.current?.select();
    }
  };

  const getTextColor = () => {
    if (isFocused || searchQuery.length > 0) return colors.textPrimary;
    if (isHovered) return colors.textSecondary;
    return colors.textTertiary;
  };

  return (
    <div
      className="relative w-full shrink-0"
      data-name="searchbox"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      dir="rtl"
    >
      <div className="flex items-center w-full rounded inherit overflow-hidden">
        <div className="flex items-center gap-2 w-full p-2">
          <div className="relative w-6 h-6 shrink-0">
            <div
              className="absolute inset-0"
              style={
                {
                  "--stroke-0": getTextColor(),
                } as React.CSSProperties
              }
            >
              <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
                <path
                  d={iconPaths.p388bbe00}
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

          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder="جستجو..."
            className="flex-1 bg-transparent border-none outline-none text-right text-[20px] font-['IRANYekanX'] font-medium"
            style={{ color: getTextColor() }}
            dir="rtl"
          />
        </div>
      </div>

      <style>{`
        input::placeholder {
          color: ${isHovered ? colors.textSecondary : colors.textTertiary} !important;
          opacity: 1;
          transition: color 0.2s ease;
        }
      `}</style>

      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none transition-all duration-200"
        style={{
          borderStyle: "solid",
          borderWidth: "0 0 0.5px 0",
          borderColor:
            isFocused || searchQuery.length > 0 ? colors.textPrimary : isHovered ? colors.textSecondary : colors.textTertiary,
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
      className="flex items-center justify-center px-3 py-1 rounded-full transition-all duration-200"
      style={{
        background: isActive ? colors.buttonBgActive : colors.buttonBgInactive,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: `1px solid ${isActive ? colors.buttonBorderActive : colors.buttonBorderInactive}`,
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLButtonElement).style.background = colors.buttonBgHover;
          (e.currentTarget as HTMLButtonElement).style.border = `1px solid ${colors.buttonBorderActive}`;
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLButtonElement).style.background = colors.buttonBgInactive;
          (e.currentTarget as HTMLButtonElement).style.border = `1px solid ${colors.buttonBorderInactive}`;
        }
      }}
      dir="rtl"
    >
      <p
        className="text-xs font-['IRANYekanX'] font-medium whitespace-nowrap transition-all"
        style={{ color: isActive ? colors.textPrimary : colors.textTertiary }}
      >
        {label}
      </p>
    </button>
  );
}

/* ---------- App item components ---------- */

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
      className="flex-1 min-w-0 shrink-0 block no-underline"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ color: "inherit", overflow: "visible" }}
    >
      <div className="flex flex-col items-center justify-center p-2">
        <div
          className="relative flex items-center justify-center"
          style={{
            width: 72,
            height: 72,
            backgroundColor: app.bgColor,
            borderRadius: 20,
            boxShadow: colors.isLight
              ? "0px 4px 16px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0, 0, 0, 0.1), inset 0px 1px 0px rgba(255,255,255,0.5), inset 0px -1px 0px rgba(0,0,0,0.05)"
              : "0px 4px 16px rgba(0, 0, 0, 0.35), 0px 2px 6px rgba(0, 0, 0, 0.2), inset 0px 1px 0px rgba(255,255,255,0.2), inset 0px -1px 0px rgba(0,0,0,0.1)",
            transition: "box-shadow 0.3s ease",
            overflow: "visible",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = colors.isLight
              ? "0px 6px 20px rgba(0, 0, 0, 0.2), 0px 3px 8px rgba(0, 0, 0, 0.12), inset 0px 1px 0px rgba(255,255,255,0.6), inset 0px -1px 0px rgba(0,0,0,0.08)"
              : "0px 6px 20px rgba(0, 0, 0, 0.45), 0px 3px 8px rgba(0, 0, 0, 0.25), inset 0px 1px 0px rgba(255,255,255,0.25), inset 0px -1px 0px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = colors.isLight
              ? "0px 4px 16px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0,0,0,0.1), inset 0px 1px 0px rgba(255,255,255,0.5), inset 0px -1px 0px rgba(0,0,0,0.05)"
              : "0px 4px 16px rgba(0, 0, 0, 0.35), 0px 2px 6px rgba(0,0,0,0.2), inset 0px 1px 0px rgba(255,255,255,0.2), inset 0px -1px 0px rgba(0,0,0,0.1)";
          }}
        >
          {app.icon ? (
            typeof app.icon === "string" ? (
              <img
                src={resolveIconUrl(app.icon)}
                alt={`${app.name} icon`}
                style={{ width: 45, height: 45, objectFit: "cover", borderRadius: 13 }}
              />
            ) : (
              <div style={{ width: 45, height: 45, borderRadius: 13 }}>{app.icon}</div>
            )
          ) : (
            <div style={{ width: 45, height: 45, borderRadius: 13, color: colors.isLight ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)" }}>
              <PlaceholderIcon size={45} />
            </div>
          )}
        </div>

        <p
          className="mt-2 text-center text-xs font-['IRANYekanX'] truncate"
          style={{
            color: colors.textPrimary,
            textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
            width: 88,
          }}
          dir="rtl"
        >
          {app.name}
        </p>
      </div>
    </a>
  );
}

function AppListItem({ app, colors }: { app: AppData; colors: ReturnType<typeof useAdaptiveColors> }) {
  return (
    <div className="relative">
      <a
        href={`https://dhr.digikala.com${app.url}`}
        className="flex items-center w-full no-underline"
        style={{
          minHeight: 72,
          paddingTop: 16,
          paddingBottom: 24,
          direction: "rtl",
        }}
      >
        <div
          className="relative flex items-center justify-center shrink-0"
          style={{
            width: 56,
            height: 56,
            backgroundColor: app.bgColor,
            borderRadius: 16,
            boxShadow: colors.isLight
              ? "0px 4px 16px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0,0,0,0.1), inset 0px 1px 0px rgba(255,255,255,0.5), inset 0px -1px 0px rgba(0,0,0,0.05)"
              : "0px 4px 16px rgba(0, 0, 0, 0.35), 0px 2px 6px rgba(0,0,0,0.2), inset 0px 1px 0px rgba(255,255,255,0.2), inset 0px -1px 0px rgba(0,0,0,0.1)",
            marginLeft: 16,
            flexShrink: 0,
          }}
        >
          {app.icon ? (
            <div className="flex items-center justify-center overflow-hidden" style={{ width: 35, height: 35, borderRadius: 10 }}>
              {typeof app.icon === "string" ? (
                <img src={resolveIconUrl(app.icon)} alt={`${app.name} icon`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} />
              ) : (
                app.icon
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center" style={{ width: 35, height: 35, borderRadius: 10, color: colors.isLight ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)" }}>
              <PlaceholderIcon size={35} />
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col items-start justify-center min-w-0" style={{ direction: "rtl", position: "relative" }}>
          <p
            className="font-['IRANYekanX'] font-semibold text-[16px] w-full mb-1 truncate"
            style={{
              color: colors.textPrimary,
              textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
              textAlign: "right",
            }}
          >
            {app.name}
          </p>

          <p
            className="font-['IRANYekanX'] text-[14px] w-full"
            style={{
              color: colors.textTertiary,
              textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: 1.7,
              textAlign: "right",
              overflow: "hidden",
            }}
          >
            {app.description}
          </p>

          <div
            style={{
              borderBottom: `1px solid ${colors.isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)"}`,
              marginTop: 16,
              width: "calc(100% + 16px)",
              position: "absolute",
              bottom: -24,
              left: -16,
            }}
          />
        </div>
      </a>
    </div>
  );
}

/* ---------- Scrollbar ---------- */

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
  const scrollbarHeight = clientHeight > 0 ? (clientHeight / scrollHeight) * clientHeight : 64;
  const maxScroll = scrollHeight - clientHeight;
  const scrollbarTop = maxScroll > 0 ? (scrollPosition / maxScroll) * (clientHeight - scrollbarHeight) : 0;

  return (
    <div className="relative w-1 h-full" style={{ opacity: isVisible ? 1 : 0 }}>
      <motion.div
        className="absolute rounded-full w-1"
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

/* ---------- Applications grid (desktop + mobile) ---------- */

function ApplicationsGrid({ imageSrc, apps, categories }: { imageSrc: string; apps: AppData[]; categories: Category[] }) {
  const isMobile = useIsMobile();
  const adaptiveColors = useAdaptiveColors(imageSrc || "");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const colors = isMobile
    ? {
        isLight: false,
        isAnalyzed: true,
        panelBg: "rgba(255, 255, 255, 0.15)",
        panelBorder: "rgba(255, 255, 255, 0.18)",
        panelShadow:
          "0 8px 32px 0 rgba(0, 0, 0, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
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
    : adaptiveColors || {
        isLight: false,
        isAnalyzed: false,
        panelBg: "rgba(255, 255, 255, 0.15)",
        panelBorder: "rgba(255, 255, 255, 0.18)",
        panelShadow:
          "0 8px 32px 0 rgba(0, 0, 0, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
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

  const [hoveredApp, setHoveredApp] = useState<AppData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      const scrollElement = scrollRef.current;
      if (!scrollElement) return;
      setScrollPosition(scrollElement.scrollTop);
      setScrollHeight(scrollElement.scrollHeight);
      setClientHeight(scrollElement.clientHeight);
      setIsScrollbarVisible(true);

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsScrollbarVisible(false), TIMING.SCROLLBAR_HIDE_DELAY);
    };

    const el = scrollRef.current;
    if (el) {
      setScrollHeight(el.scrollHeight);
      setClientHeight(el.clientHeight);
      el.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

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

        <MobileSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} colors={colors} scrollContainerRef={scrollContainerRef} />
      </>
    );
  }

  return (
    <>
      <div
        className="fixed flex flex-col items-center rounded-[24px] w-[640px] max-w-[90vw] z-10"
        data-name="ApplicationsGrid"
        style={{
          transform: "translateX(-50%)",
          left: "50%",
          top: "15%",
          background: colors.panelBg,
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: `1px solid ${colors.panelBorder}`,
          boxShadow: colors.panelShadow,
          height: 480,
        }}
      >
        <div className="w-full px-8 pt-4 shrink-0">
          <Searchbox searchQuery={searchQuery} setSearchQuery={setSearchQuery} colors={colors} />
        </div>

        <div className="flex-1 w-full flex gap-2 items-start px-8 pb-4 min-h-0" style={{ overflow: "hidden", direction: "rtl" }}>
          <div
            ref={scrollRef}
            className="flex-1 flex flex-col items-start min-h-0"
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
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        borderStyle: "solid",
                        borderWidth: "0 0 0.5px 0",
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
                        <div className="flex gap-2 py-0 w-full" style={{ overflow: "visible", direction: "rtl" }}>
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

          <Scrollbar isVisible={isScrollbarVisible} scrollPosition={scrollPosition} scrollHeight={scrollHeight} clientHeight={clientHeight} colors={colors} />
        </div>
      </div>

      <div
        className="fixed w-[640px] max-w-[90vw] z-10"
        style={{
          left: "50%",
          top: "calc(15% + 480px + 1rem)",
          transform: "translateX(-50%)",
        }}
      >
        <motion.div
          className="flex items-center rounded-[24px"
          style={{
            background: colors.panelBg,
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: `1px solid ${colors.panelBorder}`,
            boxShadow: colors.panelShadow,
            cursor: hoveredApp ? "default" : "pointer",
            paddingLeft: 16,
            paddingRight: 16,
            overflow: "visible",
            borderRadius: 24,
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
              className="flex gap-1 items-start flex-1"
              style={{ minWidth: 0, position: "relative", zIndex: 1 }}
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
                    className="flex gap-1 items-start"
                    dir="rtl"
                    style={{ flex: 1, minWidth: 0 }}
                  >
                    {hoveredApp.icon && (
                      <motion.div
                        className="relative shrink-0 w-6 h-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                        style={{ filter: colors.isLight ? "brightness(0)" : "brightness(1)", marginTop: 2 }}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          {typeof hoveredApp.icon === "string" ? (
                            <img src={resolveIconUrl(hoveredApp.icon)} alt={`${hoveredApp.name} icon`} style={{ width: 24, height: 24, objectFit: "cover", borderRadius: 6 }} />
                          ) : (
                            hoveredApp.icon
                          )}
                        </div>
                      </motion.div>
                    )}

                    <p
                      className="text-sm font-['IRANYekanX']"
                      style={{
                        lineHeight: 1.8,
                        color: colors.textPrimary,
                        opacity: 0.7,
                        textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        wordWrap: "break-word",
                        whiteSpace: "normal",
                        flex: 1,
                        minWidth: 0,
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
                    <div style={{ opacity: 0.7 }}>
                      <AppLogo colors={colors} />
                    </div>

                    <p
                      className="text-sm font-['IRANYekanX']"
                      style={{
                        lineHeight: 1.8,
                        color: colors.textPrimary,
                        opacity: 0.7,
                        textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        flex: 1,
                        minWidth: 0,
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
              <AnimatePresence>{!hoveredApp && <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}><KeyboardShortcut colors={colors} /></motion.div>}</AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

/* ---------- Mobile search bar (Zigo + input) ---------- */

function MobileSearchBar({
  searchQuery,
  setSearchQuery,
  colors,
  scrollContainerRef,
}: {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  colors: ReturnType<typeof useAdaptiveColors>;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      setTimeout(() => {
        if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
      }, TIMING.SCROLL_TO_TOP_DELAY);
    }
  }, [searchQuery]);

  const getTextColor = () => (isFocused || searchQuery.length > 0 ? colors.textPrimary : colors.textTertiary);

  return (
    <div
      className="w-full px-4 pb-safe absolute left-0 right-0 flex gap-3"
      style={{
        paddingBottom: `max(0px, env(safe-area-inset-bottom))`,
        pointerEvents: "none",
        bottom: 20,
      }}
    >
      <button
        onClick={() => {
          window.location.href = URLS.ZIGO_APP;
        }}
        className="shrink-0 flex items-center justify-center"
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: `1px solid ${colors.panelBorder}`,
          boxShadow: colors.panelShadow,
          cursor: "pointer",
          padding: 0,
          margin: 0,
          pointerEvents: "auto",
        }}
      >
        <div style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", filter: colors.isLight ? "brightness(0)" : "brightness(1)" }} />
      </button>

      <div
        className="flex-1 relative"
        style={{
          background: colors.panelBg,
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: `1px solid ${colors.panelBorder}`,
          borderRadius: 9999,
          boxShadow: colors.panelShadow,
          padding: "12px 16px",
          height: 48,
          pointerEvents: "auto",
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="جستجو..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          inputMode="text"
          data-1p-ignore="true"
          data-lpignore="true"
          className="w-full font-['IRANYekanX'] text-[16px] outline-none border-none bg-transparent"
          style={{
            color: getTextColor(),
            textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
            padding: 0,
          }}
          dir="rtl"
        />
        <style>{`
          input {
            background: transparent !important;
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
        `}</style>
      </div>
    </div>
  );
}

/* ---------- LauncherPage (root export) ---------- */

export default function LauncherPage({ apps, categories }: { apps: AppData[]; categories: Category[] }) {
  const [imgSrc, setImgSrc] = useState<string>("");
  const imgRef = useRef<HTMLImageElement>(null);
  const isMobile = useIsMobile();
  const { isInstallable, isInstalled, promptInstall } = useInstallPrompt();
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  const colors = useAdaptiveColors(isMobile ? "" : imgSrc);

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const imageUrl = `${backendUrl}${URLS.BACKGROUND_IMAGE_PATH}`;

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => setImgSrc(imageUrl);
    img.onerror = () => console.error("Background image failed to load:", imageUrl);
  }, []);

  useEffect(() => {
    if (!isMobile) setImgSrc((p) => p);
  }, [isMobile]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === KEYBOARD_SHORTCUTS.SEARCH) {
        e.preventDefault();
        window.location.href = URLS.ZIGO_APP;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const setScreenHeight = () => {
      const vh = window.innerHeight * DEFAULTS.VIEWPORT_HEIGHT_MULTIPLIER;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setScreenHeight();
    window.addEventListener("resize", setScreenHeight);
    window.addEventListener("orientationchange", setScreenHeight);
    return () => {
      window.removeEventListener("resize", setScreenHeight);
      window.removeEventListener("orientationchange", setScreenHeight);
    };
  }, []);

  useEffect(() => {
    if (isInstallable && !isInstalled) {
      const timer = setTimeout(() => setShowInstallBanner(true), TIMING.INSTALL_BANNER_DELAY);
      return () => clearTimeout(timer);
    } else {
      setShowInstallBanner(false);
    }
  }, [isInstallable, isInstalled]);

  const handleInstallClick = async () => {
    const installed = await promptInstall();
    if (installed) setShowInstallBanner(false);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col" style={{ backgroundColor: "#000" }} data-name="Desktop - 1">
      {showInstallBanner && isInstallable && !isInstalled && (
        <div
          className="fixed left-1/2 z-[10000] max-w-[90vw]"
          style={{
            transform: "translateX(-50%)",
            bottom: isMobile ? `${LAYOUT.MOBILE_INSTALL_BANNER_BOTTOM}px` : `${LAYOUT.DESKTOP_INSTALL_BANNER_BOTTOM}px`,
            width: isMobile ? "calc(100% - 32px)" : 500,
          }}
        >
          <div
            className="flex gap-3 items-center"
            style={{
              background: colors.panelBg,
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: `1px solid ${colors.panelBorder}`,
              borderRadius: 16,
              boxShadow: colors.panelShadow,
              padding: 16,
            }}
            dir="rtl"
          >
            <div style={{ flex: 1 }}>
              <p
                className="font-['IRANYekanX'] font-semibold text-[14px]"
                style={{ color: colors.textPrimary, marginBottom: 4, textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)") }}
                dir="rtl"
              >
                نصب لانچر دیجی‌کالا
              </p>

              <p className="font-['IRANYekanX'] text-[12px]" style={{ color: colors.textSecondary, textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)") }} dir="rtl">
                لانچر را نصب کنید تا به صورت آفلاین نیز به این صفحه دسترسی داشته باشید
              </p>
            </div>

            <div className="flex flex-row gap-2" style={{ flexShrink: 0 }}>
              <button
                onClick={() => setShowInstallBanner(false)}
                className="font-['IRANYekanX'] text-[12px]"
                style={{
                  background: "transparent",
                  border: "none",
                  color: colors.textTertiary,
                  cursor: "pointer",
                  padding: "4px 8px",
                  textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
                }}
                dir="rtl"
              >
                بستن
              </button>

              <button
                onClick={handleInstallClick}
                className="font-['IRANYekanX'] font-medium text-[14px]"
                style={{
                  background: colors.isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.35)",
                  border: `1px solid ${colors.isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.4)"}`,
                  borderRadius: 8,
                  padding: "8px 16px",
                  color: colors.textPrimary,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
                }}
                dir="rtl"
              >
                نصب
              </button>
            </div>
          </div>
        </div>
      )}

      {!isMobile && (
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <img ref={imgRef} alt="" className="absolute inset-0 w-full h-full object-cover" src={imgSrc} style={{ objectFit: "cover" }} />
        </div>
      )}

      {isMobile ? <ApplicationsGrid imageSrc="" apps={apps} categories={categories} /> : <ApplicationsGrid imageSrc={imgSrc} apps={apps} categories={categories} />}

      {!isMobile && <div className="fixed z-10 left-1/2 bottom-6 transform -translate-x-1/2 flex flex-col items-center justify-center" />}
    </div>
  );
}
