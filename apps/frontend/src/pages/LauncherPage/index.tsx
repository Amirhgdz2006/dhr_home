import { useState, useRef, useEffect } from "react";
import { AppData, Category } from "../../data/types";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";
import { useIsMobile } from "./hooks/useIsMobile";
import { useAdaptiveColors } from "./hooks/useAdaptiveColors";
import { ApplicationsGrid } from "./components/ApplicationsGrid";
import { InstallBanner } from "./components/InstallBanner";
import { KEYBOARD_SHORTCUTS, DEFAULTS, TIMING, URLS } from "../../constants";

interface LauncherPageProps {
  apps: AppData[];
  categories: Category[];
}

export default function LauncherPage({ apps, categories }: LauncherPageProps) {
  const [imgSrc, setImgSrc] = useState<string>("");
  const imgRef = useRef<HTMLImageElement>(null);
  const isMobile = useIsMobile();
  const { isInstallable, isInstalled, promptInstall } = useInstallPrompt();
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  const colors = useAdaptiveColors(isMobile ? "" : imgSrc);

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const imageUrl = `${backendUrl}${URLS.BACKGROUND_IMAGE_PATH}`;

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => setImgSrc(imageUrl);
    img.onerror = () => console.error("Background image failed to load:", imageUrl);
  }, []);

  useEffect(() => {
    if (!isMobile) setImgSrc((p) => p);
  }, [isMobile]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === KEYBOARD_SHORTCUTS.SEARCH) {
        e.preventDefault();
        window.location.href = URLS.ZIGO_APP;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const setScreenHeight = () => {
      const vh = window.innerHeight * DEFAULTS.VIEWPORT_HEIGHT_MULTIPLIER;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    setScreenHeight();
    window.addEventListener("resize", setScreenHeight);
    window.addEventListener("orientationchange", setScreenHeight);
    return () => {
      window.removeEventListener("resize", setScreenHeight);
      window.removeEventListener("orientationchange", setScreenHeight);
    };
  }, []);

  useEffect(() => {
    if (isInstallable && !isInstalled) {
      const timer = setTimeout(() => setShowInstallBanner(true), TIMING.INSTALL_BANNER_DELAY);
      return () => clearTimeout(timer);
    } else {
      setShowInstallBanner(false);
    }
  }, [isInstallable, isInstalled]);

  const handleInstallClick = async () => {
    const installed = await promptInstall();
    if (installed) setShowInstallBanner(false);
  };

  return (
    <div 
      className="relative w-full h-screen overflow-hidden flex flex-col" 
      style={{ backgroundColor: "#000" }} 
      data-name="Desktop - 1"
    >
      {showInstallBanner && isInstallable && !isInstalled && (
        <InstallBanner
          colors={colors}
          isMobile={isMobile}
          onInstall={handleInstallClick}
          onDismiss={() => setShowInstallBanner(false)}
        />
      )}

      {!isMobile && (
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <img 
            ref={imgRef} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover" 
            src={imgSrc} 
            style={{ objectFit: "cover" }} 
          />
        </div>
      )}

      {isMobile ? (
        <ApplicationsGrid imageSrc="" apps={apps} categories={categories} />
      ) : (
        <ApplicationsGrid imageSrc={imgSrc} apps={apps} categories={categories} />
      )}

      {!isMobile && (
        <div className="fixed z-10 left-1/2 bottom-6 transform -translate-x-1/2 flex flex-col items-center justify-center" />
      )}
    </div>
  );
}