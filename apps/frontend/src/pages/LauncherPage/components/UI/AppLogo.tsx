import { CSSProperties } from "react";
import iconPaths from "../../../iconPaths";
import { AdaptiveColors } from "../../hooks/useAdaptiveColors";

interface AppLogoProps {
  colors: AdaptiveColors;
}

const LOGO_CONFIG = {
  size: 24, // h-6 w-6
  fillLight: "#000000",
  fillDark: "rgba(255, 255, 255, 0.7)",
} as const;

export function AppLogo({ colors }: AppLogoProps) {
  const fillColor = colors.isLight ? LOGO_CONFIG.fillLight : LOGO_CONFIG.fillDark;

  const pathStyle: CSSProperties = {
    fill: fillColor,
  };

  return (
    <div className="relative h-6 w-6 shrink-0" data-name="logo_red">
      <svg 
        className="block h-full w-full" 
        fill="none" 
        preserveAspectRatio="none" 
        viewBox={`0 0 ${LOGO_CONFIG.size} ${LOGO_CONFIG.size}`}
      >
        <g id="logo_red">
          <path
            clipRule="evenodd"
            d={iconPaths.p391d81f2}
            fillRule="evenodd"
            id="Vector"
            style={pathStyle}
          />
        </g>
      </svg>
    </div>
  );
}