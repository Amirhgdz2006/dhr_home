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
        className="flex items-center w-full no-underline min-h-[72px] pt-4 pb-6"
        style={{
          direction: "rtl",
        }}
      >
        <div
          className="relative flex items-center justify-center shrink-0 w-[56px] h-[56px] rounded-[16px] ml-4"
          style={{
            backgroundColor: app.bgColor,
            boxShadow: colors.isLight
              ? "0px 4px 16px rgba(0, 0, 0, 0.15), 0px 2px 6px rgba(0,0,0,0.1), inset 0px 1px 0px rgba(255,255,255,0.5), inset 0px -1px 0px rgba(0,0,0,0.05)"
              : "0px 4px 16px rgba(0, 0, 0, 0.35), 0px 2px 6px rgba(0,0,0,0.2), inset 0px 1px 0px rgba(255,255,255,0.2), inset 0px -1px 0px rgba(0,0,0,0.1)",
          }}
        >
          {app.icon ? (
            <div className="flex items-center justify-center overflow-hidden w-[35px] h-[35px] rounded-[10px]">
              {typeof app.icon === "string" ? (
                <img
                  src={resolveIconUrl(app.icon)}
                  alt={`${app.name} icon`}
                  className="w-full h-full object-cover rounded-[10px]"
                />
              ) : (
                app.icon
              )}
            </div>
          ) : (
            <div
              className="flex items-center justify-center w-[35px] h-[35px] rounded-[10px]"
              style={{
                color: colors.isLight
                  ? "rgba(0,0,0,0.5)"
                  : "rgba(255,255,255,0.5)",
              }}
            >
              <PlaceholderIcon size={35} />
            </div>
          )}
        </div>

        <div
          className="flex-1 flex flex-col items-start justify-center min-w-0 relative"
          style={{ direction: "rtl" }}
        >
          <p
            className="font-['IRANYekanX'] font-semibold text-[16px] w-full mb-1 truncate text-right"
            style={{
              color: colors.textPrimary,
              textShadow:
                colors.textShadow ||
                (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
            }}
          >
            {app.name}
          </p>

          <p
            className="font-['IRANYekanX'] text-[14px] w-full text-right overflow-hidden leading-[1.7]"
            style={{
              color: colors.textTertiary,
              textShadow:
                colors.textShadow ||
                (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {app.description}
          </p>

          <div
            className="absolute bottom-[-24px] left-[-16px] mt-4 w-[calc(100%+16px)] border-b"
            style={{
              borderColor: colors.isLight
                ? "rgba(0,0,0,0.15)"
                : "rgba(255,255,255,0.15)",
            }}
          />
        </div>
      </a>
    </div>
  );
}
