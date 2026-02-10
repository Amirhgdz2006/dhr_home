import { useState, useEffect } from "react";
import { IMAGE_ANALYSIS } from "../../../constants";

export interface AdaptiveColors {
  isLight: boolean;
  isAnalyzed: boolean;
  panelBg: string;
  panelBorder: string;
  panelShadow: string;
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textShadow: string;
  buttonBgActive: string;
  buttonBgInactive: string;
  buttonBgHover: string;
  buttonBorderActive: string;
  buttonBorderInactive: string;
  scrollbarBg: string;
}

const DARK_COLORS: AdaptiveColors = {
  isLight: false,
  isAnalyzed: false,
  panelBg: "rgba(255, 255, 255, 0.15)",
  panelBorder: "rgba(255, 255, 255, 0.18)",
  panelShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)",
  textPrimary: "rgba(255, 255, 255, 1)",
  textSecondary: "rgba(255, 255, 255, 0.8)",
  textTertiary: "rgba(255, 255, 255, 0.7)",
  textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
  buttonBgActive: "rgba(255, 255, 255, 0.35)",
  buttonBgInactive: "rgba(255, 255, 255, 0.1)",
  buttonBgHover: "rgba(255, 255, 255, 0.22)",
  buttonBorderActive: "rgba(255, 255, 255, 0.4)",
  buttonBorderInactive: "rgba(255, 255, 255, 0.15)",
  scrollbarBg: "rgba(255, 255, 255, 0.4)",
};

const LIGHT_COLORS: AdaptiveColors = {
  isLight: true,
  isAnalyzed: true,
  panelBg: "rgba(255, 255, 255, 0.3)",
  panelBorder: "rgba(255, 255, 255, 0.4)",
  panelShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.7)",
  textPrimary: "#000000",
  textSecondary: "#000000",
  textTertiary: "rgba(0, 0, 0, 0.7)",
  textShadow: "none",
  buttonBgActive: "rgba(255, 255, 255, 0.75)",
  buttonBgInactive: "rgba(255, 255, 255, 0.4)",
  buttonBgHover: "rgba(255, 255, 255, 0.65)",
  buttonBorderActive: "rgba(0, 0, 0, 0.35)",
  buttonBorderInactive: "rgba(0, 0, 0, 0.15)",
  scrollbarBg: "rgba(0, 0, 0, 0.4)",
};

const calculateBrightness = (r: number, g: number, b: number): number => {
  return (r * 299 + g * 587 + b * 114) / 1000;
};

const analyzeImageBrightness = (imageData: ImageData): number => {
  const data = imageData.data;
  let totalBrightness = 0;
  let pixelCount = 0;

  for (let i = 0; i < data.length; i += IMAGE_ANALYSIS.PIXEL_SAMPLE_INTERVAL) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = calculateBrightness(r, g, b);
    
    totalBrightness += brightness;
    pixelCount++;
  }

  return totalBrightness / pixelCount;
};

const loadAndAnalyzeImage = (
  imageSrc: string,
  onComplete: (isLight: boolean) => void
): void => {
  const img = new Image();

  img.onload = () => {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        onComplete(false);
        return;
      }

      const sampleSize = IMAGE_ANALYSIS.SAMPLE_SIZE;
      canvas.width = sampleSize;
      canvas.height = sampleSize;

      const scale = Math.min(sampleSize / img.width, sampleSize / img.height);
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      const x = (sampleSize - scaledWidth) / 2;
      const y = (sampleSize - scaledHeight) / 2;

      ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

      let imageData;
      try {
        imageData = ctx.getImageData(0, 0, sampleSize, sampleSize);
      } catch (e) {
        onComplete(false);
        return;
      }

      const averageBrightness = analyzeImageBrightness(imageData);
      const isLightBackground = averageBrightness > IMAGE_ANALYSIS.BRIGHTNESS_THRESHOLD;
      
      onComplete(isLightBackground);
    } catch (error) {
      onComplete(false);
    }
  };

  img.onerror = () => {
    onComplete(false);
  };

  try {
    img.crossOrigin = "anonymous";
  } catch {}

  img.src = imageSrc;
};

export function useAdaptiveColors(imageSrc: string): AdaptiveColors {
  const [isLight, setIsLight] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  useEffect(() => {
    setIsAnalyzed(false);
    setIsLight(false);

    if (!imageSrc || imageSrc.trim() === "") {
      setIsLight(false);
      setIsAnalyzed(true);
      return;
    }

    loadAndAnalyzeImage(imageSrc, (detectedIsLight) => {
      setIsLight(detectedIsLight);
      setIsAnalyzed(true);
    });
  }, [imageSrc]);

  if (isAnalyzed && isLight) {
    return LIGHT_COLORS;
  }

  return {
    ...DARK_COLORS,
    isAnalyzed,
  };
}