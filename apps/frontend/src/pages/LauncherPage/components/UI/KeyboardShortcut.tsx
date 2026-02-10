import { CSSProperties } from "react";
import { AdaptiveColors } from "../../hooks/useAdaptiveColors";

interface KeyboardShortcutProps {
  colors: AdaptiveColors;
}

const SHORTCUT_CONFIG = {
  borderRadius: 2, // rounded-sm
  borderWidth: 1,
  label: "⌘K",
} as const;

export function KeyboardShortcut({ colors }: KeyboardShortcutProps) {
  const borderStyle: CSSProperties = {
    borderStyle: "solid",
    borderWidth: SHORTCUT_CONFIG.borderWidth,
    borderColor: colors.isLight ? "rgba(0, 0, 0, 0.2)" : "rgba(255, 255, 255, 0.2)",
  };

  const textStyle: CSSProperties = {
    color: colors.textPrimary,
    textShadow: colors.textShadow || (colors.isLight 
      ? "0 1px 2px rgba(255,255,255,0.5)" 
      : "0 1px 2px rgba(0,0,0,0.3)"),
  };

  return (
    <div className="relative rounded-sm px-1 py-0.5" data-name="Key">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-sm"
        style={borderStyle}
      />
      
      <p
        className="relative whitespace-nowrap text-sm font-medium"
        style={textStyle}
      >
        {SHORTCUT_CONFIG.label}
      </p>
    </div>
  );
}