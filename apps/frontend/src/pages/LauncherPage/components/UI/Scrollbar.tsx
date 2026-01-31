import { motion } from "motion/react";
import { AdaptiveColors } from "../../hooks/useAdaptiveColors";

interface ScrollbarProps {
  isVisible: boolean;
  scrollPosition: number;
  scrollHeight: number;
  clientHeight: number;
  colors: AdaptiveColors;
}

export function Scrollbar({
  isVisible,
  scrollPosition,
  scrollHeight,
  clientHeight,
  colors,
}: ScrollbarProps) {
  const scrollbarHeight = clientHeight > 0 ? (clientHeight / scrollHeight) * clientHeight : 64;
  const maxScroll = scrollHeight - clientHeight;
  const scrollbarTop = maxScroll > 0 ? (scrollPosition / maxScroll) * (clientHeight - scrollbarHeight) : 0;

  return (
    <div className="relative w-1 h-full" style={{ opacity: isVisible ? 1 : 0 }}>
      <motion.div
        className="absolute rounded-full w-1"
        style={{
          background: colors.scrollbarBg,
          height: `${Math.max(scrollbarHeight, 20)}px`,
          top: `${scrollbarTop}px`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}