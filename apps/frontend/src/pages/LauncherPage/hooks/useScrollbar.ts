import { useState, useEffect, useRef, RefObject } from "react";
import { TIMING } from "../../../constants";

interface ScrollbarState {
  isScrollbarVisible: boolean;
  scrollPosition: number;
  scrollHeight: number;
  clientHeight: number;
}

export function useScrollbar(scrollRef: RefObject<HTMLDivElement>): ScrollbarState {
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleScroll = () => {
      const scrollElement = scrollRef.current;
      if (!scrollElement) return;
      
      setScrollPosition(scrollElement.scrollTop);
      setScrollHeight(scrollElement.scrollHeight);
      setClientHeight(scrollElement.clientHeight);
      setIsScrollbarVisible(true);

      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(
        () => setIsScrollbarVisible(false),
        TIMING.SCROLLBAR_HIDE_DELAY
      );
    };

    const el = scrollRef.current;
    if (el) {
      setScrollHeight(el.scrollHeight);
      setClientHeight(el.clientHeight);
      el.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [scrollRef]);

  return {
    isScrollbarVisible,
    scrollPosition,
    scrollHeight,
    clientHeight,
  };
}