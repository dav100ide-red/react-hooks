import { useSyncExternalStore, useCallback, useDebugValue } from "react";
import { BREAKPOINTS } from "../constants/breakpoints";

// Utility to map width to Tailwind breakpoint
const getBreakpoint = (width: number): string => {
  if (width >= BREAKPOINTS["2xl"]) return "2xl";
  if (width >= BREAKPOINTS.xl) return "xl";
  if (width >= BREAKPOINTS.lg) return "lg";
  if (width >= BREAKPOINTS.md) return "md";
  if (width >= BREAKPOINTS.sm) return "sm";
  return "base";
};

// Debounce utility
const debounce = (callback: (...args: unknown[]) => void, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: unknown[]) => {
    clearTimeout(timeout); //ensures that only the most recent invocation of the debounced function triggers the callback
    timeout = setTimeout(() => callback(...args), delay);
  };
};

export const useResponsiveBreakpoint = (debounceTime: number = 200): string => {
  const getSnapshot = useCallback((): string => {
    const width = window.innerWidth;
    return getBreakpoint(width);
  }, []);

  const subscribe = useCallback(
    (onStoreChange: () => void): (() => void) => {
      const debouncedResizeHandler = debounce(onStoreChange, debounceTime);

      window.addEventListener("resize", debouncedResizeHandler);
      return () => {
        window.removeEventListener("resize", debouncedResizeHandler);
      };
    },
    [debounceTime]
  );

  const breakpoint = useSyncExternalStore<string>(subscribe, getSnapshot);
  useDebugValue(breakpoint);

  return breakpoint;
};
