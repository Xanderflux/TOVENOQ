"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** A once-only enhancement: server-rendered content is never hidden without JS. */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches) return;

    const show = () => {
      element.classList.remove("motion-reveal--pending");
      element.classList.add("motion-reveal--visible");
    };
    const revealWithoutMotion = () => {
      element.classList.remove("motion-reveal--pending");
    };
    preference.addEventListener("change", revealWithoutMotion);

    // Above-the-fold content should never blink out while hydration completes.
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) {
      return () => preference.removeEventListener("change", revealWithoutMotion);
    }

    element.classList.add("motion-reveal--pending");
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", revealWithoutMotion);
      element.classList.remove("motion-reveal--pending");
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`motion-reveal ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
