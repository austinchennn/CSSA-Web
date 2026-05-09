"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook to detect when an element enters the viewport.
 * Returns a ref to attach to the element and an isVisible boolean.
 *
 * Usage:
 * const { ref, isVisible } = useScrollAnimation();
 * <div ref={ref} className={isVisible ? "animate-fade-in" : "opacity-0"}>
 */
export function useScrollAnimation(options?: UseScrollAnimationOptions) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options || {};
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}
