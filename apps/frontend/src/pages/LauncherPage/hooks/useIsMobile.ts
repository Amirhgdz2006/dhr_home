import { useState, useEffect } from "react";
import { BREAKPOINTS } from "../../../constants";

const checkIfMobile = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.innerWidth < BREAKPOINTS.MOBILE;
};

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(checkIfMobile);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIfMobile());
    };

    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile;
}