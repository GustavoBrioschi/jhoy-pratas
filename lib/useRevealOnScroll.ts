"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "./gsap";

/**
 * Hook compartilhado pelas cenas mais estruturais/placeholder (ainda sem
 * asset final). Em vez de repetir uma timeline de pin+scrub em cada uma,
 * ele revela — uma única vez, com stagger — todo elemento marcado com
 * `data-reveal` dentro do container, assim que a cena entra ~30% na
 * viewport. Simples, elegante, e fácil de "promover" para uma timeline
 * mais rica quando o asset final da cena chegar.
 *
 * Respeita prefers-reduced-motion (conteúdo aparece direto, sem tween).
 */
export function useRevealOnScroll(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add({ all: "all", reduceMotion: "(prefers-reduced-motion: reduce)" }, (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };

        const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]", containerRef.current!);

        if (reduceMotion) {
          gsap.set(targets, { opacity: 1, y: 0, scale: 1 });
          return;
        }

        gsap.set(targets, { opacity: 0, y: 32 });
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}
