import iconPaths from "../../../iconPaths";
import { AdaptiveColors } from "../../hooks/useAdaptiveColors";

interface AppLogoProps {
  colors: AdaptiveColors;
}

export function AppLogo({ colors }: AppLogoProps) {
  return (
    <div className="relative shrink-0 w-6 h-6" data-name="logo_red">
      <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="logo_red">
          <path
            clipRule="evenodd"
            d={iconPaths.p391d81f2}
            fill={colors.isLight ? "#000000" : "rgba(255, 255, 255, 0.7)"}
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}