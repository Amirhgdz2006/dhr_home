import { CSSProperties } from "react";
import { AdaptiveColors } from "../../hooks/useAdaptiveColors";

interface CategoryButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  colors: AdaptiveColors;
}

export function CategoryButton({ label, isActive, onClick, colors }: CategoryButtonProps) {
  const getButtonStyle = (isHover: boolean = false): CSSProperties => {
    if (isActive) {
      return {
        background: colors.buttonBgActive,
        border: `1px solid ${colors.buttonBorderActive}`,
      };
    }

    return {
      background: isHover ? colors.buttonBgHover : colors.buttonBgInactive,
      border: `1px solid ${isHover ? colors.buttonBorderActive : colors.buttonBorderInactive}`,
    };
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isActive) return;
    
    const button = e.currentTarget;
    button.style.background = colors.buttonBgHover;
    button.style.border = `1px solid ${colors.buttonBorderActive}`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isActive) return;
    
    const button = e.currentTarget;
    button.style.background = colors.buttonBgInactive;
    button.style.border = `1px solid ${colors.buttonBorderInactive}`;
  };

  const textStyle: CSSProperties = {
    color: isActive ? colors.textPrimary : colors.textTertiary,
  };

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center px-3 py-1 rounded-full transition-all duration-200 backdrop-blur-md"
      style={getButtonStyle()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      dir="rtl"
    >
      <p
        className="text-xs font-['IRANYekanX'] font-medium whitespace-nowrap transition-all"
        style={textStyle}
      >
        {label}
      </p>
    </button>
  );
}