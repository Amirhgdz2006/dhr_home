import { useState, useRef, useEffect, CSSProperties } from "react";
import iconPaths from "../../../iconPaths";
import { AdaptiveColors } from "../../hooks/useAdaptiveColors";
import { TIMING, KEYBOARD_SHORTCUTS } from "../../../../constants";

interface SearchboxProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  colors: AdaptiveColors;
}

const ICON_SIZE = 6; // Tailwind units (h-6 w-6)

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

  const getTextColor = (): string => {
    if (isFocused || searchQuery.length > 0) return colors.textPrimary;
    if (isHovered) return colors.textSecondary;
    return colors.textTertiary;
  };

  const getStrokeOpacity = (): string => {
    if (isFocused || searchQuery.length > 0) return "1";
    if (isHovered) return "0.85";
    return "0.7";
  };

  const iconStyle: CSSProperties = {
    "--stroke-0": getTextColor(),
  } as CSSProperties;

  const inputStyle: CSSProperties = {
    color: getTextColor(),
  };

  const borderStyle: CSSProperties = {
    borderStyle: "solid",
    borderWidth: "0 0 0.5px 0",
    borderColor: isFocused || searchQuery.length > 0 
      ? colors.textPrimary 
      : isHovered 
        ? colors.textSecondary 
        : colors.textTertiary,
  };

  const placeholderColor = isHovered ? colors.textSecondary : colors.textTertiary;

  return (
    <div
      className="relative w-full shrink-0"
      data-name="searchbox"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      dir="rtl"
    >
      <div className="flex w-full items-center overflow-hidden rounded-inherit">
        <div className="flex w-full items-center gap-2 p-2">
          <div className={`relative h-${ICON_SIZE} w-${ICON_SIZE} shrink-0`}>
            <div className="absolute inset-0" style={iconStyle}>
              <svg 
                className="block h-full w-full transition-all" 
                fill="none" 
                preserveAspectRatio="none" 
                viewBox="0 0 20 20"
              >
                <path
                  d={iconPaths.p388bbe00}
                  stroke="var(--stroke-0, white)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeOpacity={getStrokeOpacity()}
                  strokeWidth="2"
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
            className="flex-1 bg-transparent border-none outline-none text-right text-[20px] font-medium font-['IRANYekanX']"
            style={inputStyle}
            dir="rtl"
          />
        </div>
      </div>

      <style>{`
        input::placeholder {
          color: ${placeholderColor} !important;
          opacity: 1;
          transition: color 0.2s ease;
        }
      `}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-all duration-200"
        style={borderStyle}
      />
    </div>
  );
}