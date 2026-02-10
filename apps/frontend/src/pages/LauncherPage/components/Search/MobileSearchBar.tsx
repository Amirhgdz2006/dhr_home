import { useState, useRef, useEffect } from "react";
import { AdaptiveColors } from "../../hooks/useAdaptiveColors";
import { TIMING, URLS } from "../../../../constants";

interface MobileSearchBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  colors: AdaptiveColors;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

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
        if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
      }, TIMING.SCROLL_TO_TOP_DELAY);
    }
  }, [searchQuery, scrollContainerRef]);

  const getTextColor = () =>
    isFocused || searchQuery.length > 0 ? colors.textPrimary : colors.textTertiary;

  return (
    <div
      className="absolute left-0 right-0 bottom-5 flex w-full gap-3 px-4 pb-safe pointer-events-none"
      style={{
        paddingBottom: `max(0px, env(safe-area-inset-bottom))`,
      }}
    >
      <button
        onClick={() => {
          window.location.href = URLS.ZIGO_APP;
        }}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full p-0 m-0 cursor-pointer pointer-events-auto"
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: `1px solid ${colors.panelBorder}`,
          boxShadow: colors.panelShadow,
        }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 28,
            height: 28,
            filter: colors.isLight ? "brightness(0)" : "brightness(1)",
          }}
        />
      </button>

      <div
        className="relative flex-1 h-12 rounded-full px-4 py-3 pointer-events-auto"
        style={{
          background: colors.panelBg,
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: `1px solid ${colors.panelBorder}`,
          boxShadow: colors.panelShadow,
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
          className="w-full bg-transparent border-none outline-none text-[16px] font-['IRANYekanX']"
          style={{
            color: getTextColor(),
            textShadow:
              colors.textShadow ||
              (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
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
