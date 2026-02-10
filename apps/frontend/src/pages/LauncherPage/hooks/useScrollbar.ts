import { useState, useEffect, useRef, RefObject } from "react";
import { TIMING } from "../../../constants";

interface ScrollbarState {
  isScrollbarVisible: boolean;
  scrollPosition: number;
  scrollHeight: number;
  clientHeight: number;
}

const updateScrollMetrics = (element: HTMLDivElement): Omit<ScrollbarState, 'isScrollbarVisible'> => ({
  scrollPosition: element.scrollTop,
  scrollHeight: element.scrollHeight,
  clientHeight: element.clientHeight,
});

export function useScrollbar(scrollRef: RefObject<HTMLDivElement>): ScrollbarState {
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handleScroll = () => {
      const metrics = updateScrollMetrics(scrollElement);
      
      setScrollPosition(metrics.scrollPosition);
      setScrollHeight(metrics.scrollHeight);
      setClientHeight(metrics.clientHeight);
      setIsScrollbarVisible(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrollbarVisible(false);
      }, TIMING.SCROLLBAR_HIDE_DELAY);
    };

    // Initialize metrics
    const initialMetrics = updateScrollMetrics(scrollElement);
    setScrollHeight(initialMetrics.scrollHeight);
    setClientHeight(initialMetrics.clientHeight);
    
    scrollElement.addEventListener("scroll", handleScroll);

    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [scrollRef]);

  return {
    isScrollbarVisible,
    scrollPosition,
    scrollHeight,
    clientHeight,
  };
}