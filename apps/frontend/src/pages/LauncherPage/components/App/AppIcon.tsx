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

export function AppIcon({ app, onHover, onLeave, colors }: AppIconProps) {
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
          style={{
            width: 72,
            height: 72,
            backgroundColor: app.bgColor,
            borderRadius: 20,
            boxShadow: colors.isLight
              ? "0px 4px 16px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0, 0, 0, 0.1), inset 0px 1px 0px rgba(255,255,255,0.5), inset 0px -1px 0px rgba(0,0,0,0.05)"
              : "0px 4px 16px rgba(0, 0, 0, 0.35), 0px 2px 6px rgba(0, 0, 0, 0.2), inset 0px 1px 0px rgba(255,255,255,0.2), inset 0px -1px 0px rgba(0,0,0,0.1)",
            transition: "box-shadow 0.3s ease",
            overflow: "visible",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = colors.isLight
              ? "0px 6px 20px rgba(0, 0, 0, 0.2), 0px 3px 8px rgba(0, 0, 0, 0.12), inset 0px 1px 0px rgba(255,255,255,0.6), inset 0px -1px 0px rgba(0,0,0,0.08)"
              : "0px 6px 20px rgba(0, 0, 0, 0.45), 0px 3px 8px rgba(0, 0, 0, 0.25), inset 0px 1px 0px rgba(255,255,255,0.25), inset 0px -1px 0px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = colors.isLight
              ? "0px 4px 16px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0,0,0,0.1), inset 0px 1px 0px rgba(255,255,255,0.5), inset 0px -1px 0px rgba(0,0,0,0.05)"
              : "0px 4px 16px rgba(0, 0, 0, 0.35), 0px 2px 6px rgba(0,0,0,0.2), inset 0px 1px 0px rgba(255,255,255,0.2), inset 0px -1px 0px rgba(0,0,0,0.1)";
          }}
        >
          {app.icon ? (
            typeof app.icon === "string" ? (
              <img
                src={resolveIconUrl(app.icon)}
                alt=""
                role="presentation"
                style={{ width: 45, height: 45, objectFit: "cover", borderRadius: 13 }}
              />
            ) : (
              <div style={{ width: 45, height: 45, borderRadius: 13 }} role="img" aria-label={`آیکون ${app.name}`}>
                {app.icon}
              </div>
            )
          ) : (
            <div
              style={{
                width: 45,
                height: 45,
                borderRadius: 13,
                color: colors.isLight ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)",
              }}
            >
              <PlaceholderIcon size={45} />
            </div>
          )}
        </div>

        <p
          className="mt-2 text-center text-xs font-['IRANYekanX'] truncate"
          style={{
            color: colors.textPrimary,
            textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
            width: 88,
          }}
          dir="rtl"
        >
          {app.name}
        </p>
      </div>
    </a>
  );
}
