import { useState, useRef, useEffect, CSSProperties } from "react";
import { AdaptiveColors } from "../../hooks/useAdaptiveColors";
import { TIMING, URLS } from "../../../../constants";

interface MobileSearchBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  colors: AdaptiveColors;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

const SEARCH_BAR_CONFIG = {
  height: 48, // h-12 = 3rem = 48px
  iconSize: 28,
  gap: 12, // gap-3 = 0.75rem = 12px
  padding: 16, // px-4 = 1rem = 16px
  bottomMargin: 20, // bottom-5 = 1.25rem = 20px
} as const;

const getGlassMorphismStyle = (colors: AdaptiveColors): CSSProperties => ({
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  border: `1px solid ${colors.panelBorder}`,
  boxShadow: colors.panelShadow,
});

export function MobileSearchBar({
  searchQuery,
  setSearchQuery,
  colors,
  scrollContainerRef,
}: MobileSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      setTimeout(() => {
        scrollContainerRef.current?.scrollTo({ top: 0 });
      }, TIMING.SCROLL_TO_TOP_DELAY);
    }
  }, [searchQuery, scrollContainerRef]);

  const getTextColor = (): string => {
    return (isFocused || searchQuery.length > 0) ? colors.textPrimary : colors.textTertiary;
  };

  const containerStyle: CSSProperties = {
    paddingBottom: `max(0px, env(safe-area-inset-bottom))`,
  };

  const zigoButtonStyle: CSSProperties = {
    ...getGlassMorphismStyle(colors),
  };

  const iconFilterStyle: CSSProperties = {
    width: SEARCH_BAR_CONFIG.iconSize,
    height: SEARCH_BAR_CONFIG.iconSize,
    filter: colors.isLight ? "brightness(0)" : "brightness(1)",
  };

  const searchInputContainerStyle: CSSProperties = {
    background: colors.panelBg,
    ...getGlassMorphismStyle(colors),
  };

  const inputStyle: CSSProperties = {
    color: getTextColor(),
    textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
    padding: 0,
  };

  const inputPlaceholderColor = colors.textTertiary;

  return (
    <div
      className="absolute left-0 right-0 bottom-5 flex w-full gap-3 px-4 pb-safe pointer-events-none"
      style={containerStyle}
    >
      <button
        onClick={() => { window.location.href = URLS.ZIGO_APP; }}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full p-0 m-0 cursor-pointer pointer-events-auto"
        style={zigoButtonStyle}
        aria-label="باز کردن زیگو"
      >
        <div
          className="flex items-center justify-center"
          style={iconFilterStyle}
        />
      </button>

      <div
        className="relative flex-1 h-12 rounded-full px-4 py-3 pointer-events-auto"
        style={searchInputContainerStyle}
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
          className="w-full bg-transparent border-none outline-none text-[16px] font-['IRANYekanX']"
          style={inputStyle}
          dir="rtl"
        />
        
        <style>{`
          input {
            background: transparent !important;
            -webkit-appearance: none !important;
            appearance: none !important;
          }
          
          input::placeholder {
            color: ${inputPlaceholderColor};
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