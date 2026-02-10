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
  const scrollbarHeight =
    clientHeight > 0 ? (clientHeight / scrollHeight) * clientHeight : 64;
  const maxScroll = scrollHeight - clientHeight;
  const scrollbarTop =
    maxScroll > 0
      ? (scrollPosition / maxScroll) * (clientHeight - scrollbarHeight)
      : 0;

  return (
    <div
      className="relative h-full w-1"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <motion.div
        className="absolute w-1 rounded-full"
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
