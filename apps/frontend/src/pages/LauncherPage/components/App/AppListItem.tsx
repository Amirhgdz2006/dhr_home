import { AppData } from "../../../data/types";
import { AdaptiveColors } from "../../hooks/useAdaptiveColors";
import { resolveIconUrl } from "../../utils/resolveIconUrl";
import { PlaceholderIcon } from "../UI/PlaceholderIcon";

interface AppListItemProps {
  app: AppData;
  colors: AdaptiveColors;
}

export function AppListItem({ app, colors }: AppListItemProps) {
  return (
    <div className="relative">
      <a
        href={`https://dhr.digikala.com${app.url}`}
        className="flex items-center w-full no-underline"
        style={{
          minHeight: 72,
          paddingTop: 16,
          paddingBottom: 24,
          direction: "rtl",
        }}
      >
        <div
          className="relative flex items-center justify-center shrink-0"
          style={{
            width: 56,
            height: 56,
            backgroundColor: app.bgColor,
            borderRadius: 16,
            boxShadow: colors.isLight
              ? "0px 4px 16px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0,0,0,0.1), inset 0px 1px 0px rgba(255,255,255,0.5), inset 0px -1px 0px rgba(0,0,0,0.05)"
              : "0px 4px 16px rgba(0, 0, 0, 0.35), 0px 2px 6px rgba(0,0,0,0.2), inset 0px 1px 0px rgba(255,255,255,0.2), inset 0px -1px 0px rgba(0,0,0,0.1)",
            marginLeft: 16,
            flexShrink: 0,
          }}
        >
          {app.icon ? (
            <div className="flex items-center justify-center overflow-hidden" style={{ width: 35, height: 35, borderRadius: 10 }}>
              {typeof app.icon === "string" ? (
                <img src={resolveIconUrl(app.icon)} alt={`${app.name} icon`} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} />
              ) : (
                app.icon
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center" style={{ width: 35, height: 35, borderRadius: 10, color: colors.isLight ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)" }}>
              <PlaceholderIcon size={35} />
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col items-start justify-center min-w-0" style={{ direction: "rtl", position: "relative" }}>
          <p
            className="font-['IRANYekanX'] font-semibold text-[16px] w-full mb-1 truncate"
            style={{
              color: colors.textPrimary,
              textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
              textAlign: "right",
            }}
          >
            {app.name}
          </p>

          <p
            className="font-['IRANYekanX'] text-[14px] w-full"
            style={{
              color: colors.textTertiary,
              textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: 1.7,
              textAlign: "right",
              overflow: "hidden",
            }}
          >
            {app.description}
          </p>

          <div
            style={{
              borderBottom: `1px solid ${colors.isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)"}`,
              marginTop: 16,
              width: "calc(100% + 16px)",
              position: "absolute",
              bottom: -24,
              left: -16,
            }}
          />
        </div>
      </a>
    </div>
  );
}