import { CSSProperties } from "react";
import { motion } from "motion/react";
import { AdaptiveColors } from "../../hooks/useAdaptiveColors";

interface ScrollbarProps {
  isVisible: boolean;
  scrollPosition: number;
  scrollHeight: number;
  clientHeight: number;
  colors: AdaptiveColors;
}

const SCROLLBAR_CONFIG = {
  width: 4, // w-1 = 0.25rem = 4px
  minHeight: 20,
  animationDuration: 0.3,
} as const;

const calculateScrollbarMetrics = (
  scrollPosition: number,
  scrollHeight: number,
  clientHeight: number
) => {
  const scrollbarHeight = clientHeight > 0 
    ? (clientHeight / scrollHeight) * clientHeight 
    : SCROLLBAR_CONFIG.minHeight;
    
  const maxScroll = scrollHeight - clientHeight;
  const scrollbarTop = maxScroll > 0
    ? (scrollPosition / maxScroll) * (clientHeight - scrollbarHeight)
    : 0;

  return {
    height: Math.max(scrollbarHeight, SCROLLBAR_CONFIG.minHeight),
    top: scrollbarTop,
  };
};

export function Scrollbar({
  isVisible,
  scrollPosition,
  scrollHeight,
  clientHeight,
  colors,
}: ScrollbarProps) {
  const { height, top } = calculateScrollbarMetrics(scrollPosition, scrollHeight, clientHeight);

  const containerStyle: CSSProperties = {
    opacity: isVisible ? 1 : 0,
  };

  const thumbStyle: CSSProperties = {
    background: colors.scrollbarBg,
    height: `${height}px`,
    top: `${top}px`,
  };

  return (
    <div
      className="relative h-full w-1"
      style={containerStyle}
    >
      <motion.div
        className="absolute w-1 rounded-full"
        style={thumbStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: SCROLLBAR_CONFIG.animationDuration }}
      />
    </div>
  );
}