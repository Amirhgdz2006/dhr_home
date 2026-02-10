import { useState, useRef, useEffect, CSSProperties } from "react";
import { IAppData, ICategory } from "@/types";
import { useInstallPrompt } from "../../hooks/useInstallPrompt";
import { useIsMobile } from "./hooks/useIsMobile";
import { useAdaptiveColors } from "./hooks/useAdaptiveColors";
import { ApplicationsGrid } from "./components/ApplicationsGrid";
import { InstallBanner } from "./components/InstallBanner";
import { KEYBOARD_SHORTCUTS, DEFAULTS, TIMING, URLS } from "../../constants";

interface LauncherPageProps {
  apps: IAppData[];
  categories: ICategory[];
}

const PAGE_STYLES = {
  backgroundColor: "#000",
} as const;

export default function LauncherPage({ apps, categories }: LauncherPageProps) {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  
  const imgRef = useRef<HTMLImageElement>(null);
  const isMobile = useIsMobile();
  const { isInstallable, isInstalled, promptInstall } = useInstallPrompt();
  const colors = useAdaptiveColors(isMobile ? "" : imgSrc);

  // Load background image
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const imageUrl = `${backendUrl}${URLS.BACKGROUND_IMAGE_PATH}`;

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => setImgSrc(imageUrl);
    img.onerror = () => {
      console.error("Background image failed to load:", imageUrl);
    };
  }, []);

  // Keyboard shortcuts
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

  // Set viewport height for mobile
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

  // Install banner visibility
  useEffect(() => {
    if (isInstallable && !isInstalled) {
      const timer = setTimeout(() => {
        setShowInstallBanner(true);
      }, TIMING.INSTALL_BANNER_DELAY);
      
      return () => clearTimeout(timer);
    } else {
      setShowInstallBanner(false);
    }
  }, [isInstallable, isInstalled]);

  const handleInstallClick = async () => {
    const installed = await promptInstall();
    if (installed) {
      setShowInstallBanner(false);
    }
  };

  const backgroundImageStyle: CSSProperties = {
    objectFit: "cover",
  };

  const shouldShowInstallBanner = showInstallBanner && isInstallable && !isInstalled;
  const shouldShowBackgroundImage = !isMobile && imgSrc;

  return (
    <div 
      className="relative w-full h-screen overflow-hidden flex flex-col" 
      style={PAGE_STYLES} 
      data-name="Desktop - 1"
    >
      {/* Install Banner */}
      {shouldShowInstallBanner && (
        <InstallBanner
          colors={colors}
          isMobile={isMobile}
          onInstall={handleInstallClick}
          onDismiss={() => setShowInstallBanner(false)}
        />
      )}

      {/* Background Image (Desktop Only) */}
      {shouldShowBackgroundImage && (
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <img 
            ref={imgRef} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover" 
            src={imgSrc} 
            style={backgroundImageStyle} 
          />
        </div>
      )}

      {/* Applications Grid */}
      <ApplicationsGrid 
        imageSrc={isMobile ? "" : imgSrc} 
        apps={apps} 
        categories={categories} 
      />
    </div>
  );
}