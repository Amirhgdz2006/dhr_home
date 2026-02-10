import { CSSProperties } from "react";
import { AppData } from "../../../data/types";
import { AdaptiveColors } from "../../hooks/useAdaptiveColors";
import { resolveIconUrl } from "../../utils/resolveIconUrl";
import { PlaceholderIcon } from "../UI/PlaceholderIcon";

interface AppIconProps {
  app: AppData;
  onHover: () => void;
  onLeave: () => void;
  colors: AdaptiveColors;
}

const ICON_SIZES = {
  container: 72,
  icon: 45,
  borderRadius: {
    container: 20,
    icon: 13,
  },
  label: {
    width: 88,
  },
} as const;

const getIconContainerShadow = (isLight: boolean, isHover: boolean = false): string => {
  if (isLight) {
    return isHover
      ? "0px 6px 20px rgba(0, 0, 0, 0.2), 0px 3px 8px rgba(0, 0, 0, 0.12), inset 0px 1px 0px rgba(255,255,255,0.6), inset 0px -1px 0px rgba(0,0,0,0.08)"
      : "0px 4px 16px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0, 0, 0, 0.1), inset 0px 1px 0px rgba(255,255,255,0.5), inset 0px -1px 0px rgba(0,0,0,0.05)";
  }
  
  return isHover
    ? "0px 6px 20px rgba(0, 0, 0, 0.45), 0px 3px 8px rgba(0, 0, 0, 0.25), inset 0px 1px 0px rgba(255,255,255,0.25), inset 0px -1px 0px rgba(0,0,0,0.15)"
    : "0px 4px 16px rgba(0, 0, 0, 0.35), 0px 2px 6px rgba(0, 0, 0, 0.2), inset 0px 1px 0px rgba(255,255,255,0.2), inset 0px -1px 0px rgba(0,0,0,0.1)";
};

export function AppIcon({ app, onHover, onLeave, colors }: AppIconProps) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).style.boxShadow = getIconContainerShadow(colors.isLight, true);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).style.boxShadow = getIconContainerShadow(colors.isLight, false);
  };

  const containerStyle: CSSProperties = {
    width: ICON_SIZES.container,
    height: ICON_SIZES.container,
    backgroundColor: app.bgColor,
    borderRadius: ICON_SIZES.borderRadius.container,
    boxShadow: getIconContainerShadow(colors.isLight),
    transition: "box-shadow 0.3s ease",
    overflow: "visible",
  };

  const iconStyle: CSSProperties = {
    width: ICON_SIZES.icon,
    height: ICON_SIZES.icon,
    borderRadius: ICON_SIZES.borderRadius.icon,
  };

  const labelStyle: CSSProperties = {
    color: colors.textPrimary,
    textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
    width: ICON_SIZES.label.width,
  };

  const placeholderColor = colors.isLight ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)";

  const renderIcon = () => {
    if (!app.icon) {
      return (
        <div style={{ ...iconStyle, color: placeholderColor }}>
          <PlaceholderIcon size={ICON_SIZES.icon} />
        </div>
      );
    }

    if (typeof app.icon === "string") {
      return (
        <img
          src={resolveIconUrl(app.icon)}
          alt=""
          role="presentation"
          style={{ ...iconStyle, objectFit: "cover" }}
        />
      );
    }

    return (
      <div 
        style={iconStyle} 
        role="img" 
        aria-label={`آیکون ${app.name}`}
      >
        {app.icon}
      </div>
    );
  };

  return (
    <a
      href={`https://dhr.digikala.com${app.url}`}
      className="flex-1 min-w-0 shrink-0 block no-underline"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      style={{ color: "inherit", overflow: "visible" }}
      aria-label={`باز کردن ${app.name}`}
    >
      <div className="flex flex-col items-center justify-center p-2">
        <div
          className="relative flex items-center justify-center"
          style={containerStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {renderIcon()}
        </div>

        <p
          className="mt-2 text-center text-xs font-['IRANYekanX'] truncate"
          style={labelStyle}
          dir="rtl"
        >
          {app.name}
        </p>
      </div>
    </a>
  );
}