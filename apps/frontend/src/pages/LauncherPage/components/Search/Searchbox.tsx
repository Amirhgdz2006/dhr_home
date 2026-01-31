import { useState, useRef, useEffect } from "react";
import iconPaths from "../../../iconPaths";
import { AdaptiveColors } from "../../hooks/useAdaptiveColors";
import { TIMING, KEYBOARD_SHORTCUTS } from "../../../../constants";

interface SearchboxProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  colors: AdaptiveColors;
}

export function Searchbox({ searchQuery, setSearchQuery, colors }: SearchboxProps) {
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