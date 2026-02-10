import { AdaptiveColors } from "../../hooks/useAdaptiveColors";
import { LAYOUT } from "../../../../constants";

interface InstallBannerProps {
  colors: AdaptiveColors;
  isMobile: boolean;
  onInstall: () => void;
  onDismiss: () => void;
}

export function InstallBanner({ colors, isMobile, onInstall, onDismiss }: InstallBannerProps) {
  return (
    <div
      className="fixed left-1/2 z-[10000] max-w-[90vw]"
      style={{
        transform: "translateX(-50%)",
        bottom: isMobile ? `${LAYOUT.MOBILE_INSTALL_BANNER_BOTTOM}px` : `${LAYOUT.DESKTOP_INSTALL_BANNER_BOTTOM}px`,
        width: isMobile ? "calc(100% - 32px)" : 500,
      }}
    >
      <div
        className="flex gap-3 items-center backdrop-blur-2xl"
        style={{
          background: colors.panelBg,
          border: `1px solid ${colors.panelBorder}`,
          borderRadius: 16,
          boxShadow: colors.panelShadow,
          padding: 16,
        }}
        dir="rtl"
      >
        <div style={{ flex: 1 }}>
          <p
            className="font-['IRANYekanX'] font-semibold text-[14px]"
            style={{
              color: colors.textPrimary,
              marginBottom: 4,
              textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
            }}
            dir="rtl"
          >
            نصب لانچر دیجی‌کالا
          </p>

          <p
            className="font-['IRANYekanX'] text-[12px]"
            style={{
              color: colors.textSecondary,
              textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
            }}
            dir="rtl"
          >
            لانچر را نصب کنید تا به صورت آفلاین نیز به این صفحه دسترسی داشته باشید
          </p>
        </div>

        <div className="flex flex-row gap-2 shrink-0">
          <button
            onClick={onDismiss}
            className="font-['IRANYekanX'] text-[12px] px-2 py-1"
            style={{
              background: "transparent",
              border: "none",
              color: colors.textTertiary,
              cursor: "pointer",
              textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
            }}
            dir="rtl"
          >
            بستن
          </button>

          <button
            onClick={onInstall}
            className="font-['IRANYekanX'] font-medium text-[14px] px-4 py-2 rounded-lg whitespace-nowrap"
            style={{
              background: colors.isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.35)",
              border: `1px solid ${colors.isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.4)"}`,
              color: colors.textPrimary,
              cursor: "pointer",
              textShadow: colors.textShadow || (colors.isLight ? "none" : "0 1px 2px rgba(0,0,0,0.3)"),
            }}
            dir="rtl"
          >
            نصب
          </button>
        </div>
      </div>
    </div>
  );
}
