"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useVisibleVideo } from "@/lib/useVisibleVideo";
import styles from "./SceneManifesto.module.css";

/**
 * Cena 02 — "Manifesto"
 *
 * "Por trás da Jhoy existe um sonho" — responde à hero, mostrando que há
 * alma e propósito por trás da marca. Asset principal: o vídeo aprovado
 * do coração anatômico com joias, batendo suavemente em loop. O fundo do
 * próprio vídeo já é quase idêntico ao off-white da marca (~#e2d1c1 vs.
 * --jhoy-offwhite #e3d1c3), então a borda retangular do vídeo já se
 * integra bem à página sem precisar de máscara — o coração (vasos,
 * brincos, pingente) chega bem perto das bordas do próprio frame, então
 * qualquer máscara ali cortaria conteúdo real em vez de só "aparar" fundo
 * (era exatamente isso que acontecia antes, e ficava mais visível durante
 * o zoom).
 *
 * Composição: texto e coração em colunas separadas (desktop) — o texto
 * nunca sobrepõe o coração, evitando cobrir qualquer parte importante da
 * composição (colar, brincos, o brilho central). Em mobile, empilham-se
 * verticalmente.
 *
 * Movimento:
 *   - entrada: texto e coração surgem com um fade + leve translateY ao
 *     entrar na viewport (uma vez só, não é uma timeline pinada — a cena
 *     não precisa "prender" o scroll, o vídeo já carrega vida sozinho).
 *   - durante a passagem pela cena: zoom-in bem sutil e contínuo do
 *     coração (scale 1 → 1.03), atrelado ao progresso do scroll, aplicado
 *     numa camada separada da entrada para não conflitar com ela.
 */
export default function SceneManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const heartWrapRef = useRef<HTMLDivElement>(null);
  const heartInnerRef = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  useVisibleVideo(videoRef);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add({ all: "all", reduceMotion: "(prefers-reduced-motion: reduce)" }, (context) => {
        const { reduceMotion } = context.conditions as { reduceMotion: boolean };

        // Composição estática; useVisibleVideo pausa o vídeo neste modo.
        if (reduceMotion) {
          gsap.set(textRef.current, { opacity: 1, y: 0 });
          gsap.set(heartWrapRef.current, { opacity: 1, y: 0 });
          gsap.set(heartInnerRef.current, { scale: 1 });
          return;
        }

        gsap.set(textRef.current, { opacity: 0, y: 26 });
        gsap.set(heartWrapRef.current, { opacity: 0, y: 20, scale: 0.97 });

        // Entrada delicada — texto e coração surgem juntos, com uma
        // defasagem mínima entre os dois.
        gsap.to(textRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.to(heartWrapRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.3,
          delay: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        // Aprofundamento sutil enquanto a cena atravessa a viewport — não
        // é a mesma camada da entrada (heartInnerRef, não heartWrapRef),
        // então as duas animações não competem pela mesma propriedade.
        // Escala máxima propositalmente pequena (1.03): o vídeo já ocupa
        // quase todo o próprio frame, então qualquer zoom mais forte
        // arrisca "estourar" as pontas dos vasos/brincos/pingente para
        // fora da área visível.
        gsap.fromTo(
          heartInnerRef.current,
          { scale: 1 },
          {
            scale: 1.03,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.scene} aria-label="Manifesto">
        <div className={styles.inner} data-manifesto-exit>
        <div ref={textRef} className={styles.textCol}>
          <p className={styles.eyebrow}>Manifesto</p>
          <h2 className={styles.heading}>
            Por trás da Jhoy
            <br />
            existe um sonho
          </h2>
          <p className={styles.body}>
            Mais do que vender joias, queremos carregar significado.
            <br />
            Lembrar mulheres de que são preciosas, valiosas e amadas.
            <br />
            E fazer com que cada detalhe revele algo maior do que aquilo que os olhos podem ver.
          </p>
        </div>

        <div ref={heartWrapRef} className={styles.heartWrap}>
          <div ref={heartInnerRef} className={styles.heartInner}>
            <video ref={videoRef}
              className={styles.heartVideo}
              src="/manifesto/coracao-jhoy-loop.mp4"
              poster="/manifesto/coracao-jhoy-loop-poster.jpg"
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          </div>
          <span className={styles.srOnly}>
            Coração anatômico da Jhoy Prata, adornado com joias, batendo suavemente — símbolo do
            propósito por trás da marca.
          </span>
        </div>
      </div>
    </section>
  );
}
