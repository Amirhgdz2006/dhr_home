import { CSSProperties } from "react";
import { AppData } from "../../../data/types";
import { AdaptiveColors } from "../../hooks/useAdaptiveColors";
import { resolveIconUrl } from "../../utils/resolveIconUrl";
import { PlaceholderIcon } from "../UI/PlaceholderIcon";

interface AppListItemProps {
  app: AppData;
  colors: AdaptiveColors;
}

const ITEM_SIZES = {
  icon: {
    container: 56,
    inner: 35,
    borderRadius: {
      container: 16,
      inner: 10,
    },
  },
  minHeight: 72,
} as const;

const getIconContainerShadow = (isLight: boolean): string => {
  return isLight
    ? "0px 4px 16px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0,0,0,0.1), inset 0px 1px 0px rgba(255,255,255,0.5), inset 0px -1px 0px rgba(0,0,0,0.05)"
    : "0px 4px 16px rgba(0, 0, 0, 0.35), 0px 2px 6px rgba(0,0,0,0.2), inset 0px 1px 0px rgba(255,255,255,0.2), inset 0px -1px 0px rgba(0,0,0,0.1)";
};

export function AppListItem({ app, colors }: AppListItemProps) {
  const iconContainerStyle: CSSProperties = {
    backgroundColor: app.bgColor,
    boxShadow: getIconContainerShadow(colors.isLight),
  };

  const titleStyle: CSSProperties = {
    color: colors.textPrimary,
    textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
  };

  const descriptionStyle: CSSProperties = {
    color: colors.textTertiary,
    textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  };

  const dividerStyle: CSSProperties = {
    borderColor: colors.isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)",
  };

  const placeholderColor = colors.isLight ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)";

  const renderIcon = () => {
    if (!app.icon) {
      return (
        <div
          className={`flex items-center justify-center w-[${ITEM_SIZES.icon.inner}px] h-[${ITEM_SIZES.icon.inner}px] rounded-[${ITEM_SIZES.icon.borderRadius.inner}px]`}
          style={{ color: placeholderColor }}
        >
          <PlaceholderIcon size={ITEM_SIZES.icon.inner} />
        </div>
      );
    }

    if (typeof app.icon === "string") {
      return (
        <img
          src={resolveIconUrl(app.icon)}
          alt={`${app.name} icon`}
          className={`w-full h-full object-cover rounded-[${ITEM_SIZES.icon.borderRadius.inner}px]`}
        />
      );
    }

    return app.icon;
  };

  return (
    <div className="relative">
      <a
        href={`https://dhr.digikala.com${app.url}`}
        className={`flex items-center w-full no-underline min-h-[${ITEM_SIZES.minHeight}px] pt-4 pb-6`}
        style={{ direction: "rtl" }}
      >
        <div
          className={`relative flex items-center justify-center shrink-0 w-[${ITEM_SIZES.icon.container}px] h-[${ITEM_SIZES.icon.container}px] rounded-[${ITEM_SIZES.icon.borderRadius.container}px] ml-4`}
          style={iconContainerStyle}
        >
          <div className={`flex items-center justify-center overflow-hidden w-[${ITEM_SIZES.icon.inner}px] h-[${ITEM_SIZES.icon.inner}px] rounded-[${ITEM_SIZES.icon.borderRadius.inner}px]`}>
            {renderIcon()}
          </div>
        </div>

        <div
          className="flex-1 flex flex-col items-start justify-center min-w-0 relative"
          style={{ direction: "rtl" }}
        >
          <p
            className="font-['IRANYekanX'] font-semibold text-[16px] w-full mb-1 truncate text-right"
            style={titleStyle}
          >
            {app.name}
          </p>

          <p
            className="font-['IRANYekanX'] text-[14px] w-full text-right overflow-hidden leading-[1.7]"
            style={descriptionStyle}
          >
            {app.description}
          </p>

          <div
            className="absolute bottom-[-24px] left-[-16px] mt-4 w-[calc(100%+16px)] border-b"
            style={dividerStyle}
          />
        </div>
      </a>
    </div>
  );
}