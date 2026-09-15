"use client";

import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let lenisInstance: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;
let removeMotionListener: (() => void) | null = null;

/**
 * Instância global única do Lenis, sincronizada ao ticker do GSAP e ao
 * ScrollTrigger. O lerp é propositalmente curto: a ideia é preparar o
 * scroll suave para uso global sem produzir uma sensação de scroll
 * excessivamente amortecido/flutuante.
 */
export function getLenis() {
  if (typeof window === "undefined") return null;

  if (!lenisInstance) {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    lenisInstance = new Lenis({
      duration: 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: !preference.matches,
      touchMultiplier: 1,
    });
    const updateMotion = () => {
      if (lenisInstance) {
        lenisInstance.scrollTo(window.scrollY, { immediate: true });
        lenisInstance.options.smoothWheel = !preference.matches;
      }
    };
    preference.addEventListener("change", updateMotion);
    removeMotionListener = () => preference.removeEventListener("change", updateMotion);

    lenisInstance.on("scroll", ScrollTrigger.update);

    tickerFn = (time: number) => {
      lenisInstance?.raf(time * 1000);
    };
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);
  }

  return lenisInstance;
}

export function destroyLenis() {
  removeMotionListener?.();
  removeMotionListener = null;
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }
  lenisInstance?.destroy();
  lenisInstance = null;
}
