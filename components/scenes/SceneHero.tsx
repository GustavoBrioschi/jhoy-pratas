"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { destroyLenis, getLenis } from "@/lib/lenis";
import { useVisibleVideo } from "@/lib/useVisibleVideo";
import ScrollIndicator from "./ScrollIndicator";
import styles from "./SceneHero.module.css";

/**
 * Cena 01 — HERO OFICIAL V1
 *
 * Substitui a antiga "Revelação da Marca" (estrela + logo) como abertura
 * do site. Asset principal: o vídeo aprovado do anel (Hero Candidate A),
 * em loop, tratado como protagonista absoluto da cena — a copy acompanha,
 * nunca compete.
 *
 * Timeline conceitual (fração do scroll pinado da cena):
 *   0%–12%   silêncio visual — só o vídeo e o indicador de scroll
 *   12%–18%  indicador de scroll desaparece
 *   20%–36%  headline "Você é preciosa" entra
 *   40%–58%  subheadline "e isso vai além do que os olhos podem ver" entra;
 *            a headline recua sutilmente (perde peso, mas não some)
 *   74%–88%  pausa contemplativa — composição completa, sem novas tweens
 *   88%–100% tudo recua suavemente, preparando a transição de cena
 */
export default function SceneHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);

  useVisibleVideo(videoRef);

  useEffect(() => {
    getLenis();

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 641px)",
          isMobile: "(max-width: 640px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduceMotion, isMobile } = context.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
            reduceMotion: boolean;
          };

          // Sem pin ou scrub; useVisibleVideo pausa o vídeo neste modo.
          if (reduceMotion) {
            gsap.set(scrollIndicatorRef.current, { opacity: 0 });
            gsap.set(headlineRef.current, { opacity: 1, y: 0 });
            gsap.set(subheadlineRef.current, { opacity: 1, y: 0 });
            return;
          }

          const sceneHeight = isMobile ? 150 : 170; // vh — dentro da faixa 140–190vh pedida

          gsap.set(scrollIndicatorRef.current, { opacity: 1, y: 0 });
          gsap.set(headlineRef.current, { opacity: 0, y: 22 });
          gsap.set(subheadlineRef.current, { opacity: 0, y: 16 });

          const scrollGlyph =
            scrollIndicatorRef.current?.querySelector<HTMLElement>("[data-scroll-glyph]");
          const glyphLoop = scrollGlyph
            ? gsap.to(scrollGlyph, {
                y: 4,
                duration: 1.4,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
              })
            : null;

          const tl = gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${sceneHeight}%`,
              scrub: 1,
              pin: stageRef.current,
              anticipatePin: 1,
            },
          });

          // 0%–12%: silêncio — só a atmosfera do vídeo.
          tl.to({}, { duration: 0.12 });

          // 12%–18%: indicador de scroll some.
          tl.to(
            scrollIndicatorRef.current,
            {
              opacity: 0,
              y: 10,
              duration: 0.06,
              ease: "power1.out",
              onComplete: () => glyphLoop?.kill(),
            },
            0.12,
          );

          // 20%–36%: "Você é preciosa".
          tl.to(headlineRef.current, { opacity: 1, y: 0, duration: 0.16 }, 0.2);

          // 40%–58%: subheadline entra; headline recua um pouco (não some).
          tl.to(subheadlineRef.current, { opacity: 1, y: 0, duration: 0.18 }, 0.4);
          tl.to(headlineRef.current, { opacity: 0.78, duration: 0.18 }, 0.4);

          // 74%–88%: pausa contemplativa — sem tweens propositalmente.

          // 88%–100%: recuo suave preparando a transição.
          tl.to(headlineRef.current, { opacity: 0.5, duration: 0.12 }, 0.88);
          tl.to(subheadlineRef.current, { opacity: 0.5, duration: 0.12 }, 0.88);
        },
      );
    }, sectionRef);

    // Measure downstream pins only after every scene has built its timeline.
    let disposed = false;
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    void document.fonts.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh(true);
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      ctx.revert();
      destroyLenis();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.scene} aria-label="Você é preciosa">
      <div ref={stageRef} className={styles.stage}>
        <video
          ref={videoRef}
          className={styles.video}
          src="/hero/jhoy-hero-ring.mp4"
          poster="/hero/jhoy-hero-poster.jpg"
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.copy}>
          <h1 ref={headlineRef} className={styles.headline}>
            Você é preciosa
          </h1>
          <p ref={subheadlineRef} className={styles.subheadline}>
            e isso vai além do que os olhos <span style={{ whiteSpace: "nowrap" }}>podem ver</span>
          </p>
        </div>

        <ScrollIndicator ref={scrollIndicatorRef} tone="offwhite" className={styles.scrollIndicator} />
      </div>
    </section>
  );
}
