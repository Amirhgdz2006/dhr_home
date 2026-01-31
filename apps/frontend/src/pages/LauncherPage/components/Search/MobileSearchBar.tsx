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