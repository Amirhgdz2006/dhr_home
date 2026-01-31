import { AdaptiveColors } from "../../hooks/useAdaptiveColors";

interface CategoryButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  colors: AdaptiveColors;
}

export function CategoryButton({ label, isActive, onClick, colors }: CategoryButtonProps) {
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