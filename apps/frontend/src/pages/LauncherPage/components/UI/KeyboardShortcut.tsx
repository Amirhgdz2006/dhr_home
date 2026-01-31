import { AdaptiveColors } from "../../hooks/useAdaptiveColors";

interface KeyboardShortcutProps {
  colors: AdaptiveColors;
}

export function KeyboardShortcut({ colors }: KeyboardShortcutProps) {
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