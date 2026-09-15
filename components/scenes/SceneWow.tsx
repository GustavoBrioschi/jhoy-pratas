"use client";

import { useRef } from "react";
import { useRevealOnScroll } from "@/lib/useRevealOnScroll";
import styles from "./SceneWow.module.css";

/**
 * Cena 06 — "Momento Wow"
 *
 * PLACEHOLDER ESTRUTURAL — o asset descrito no briefing (anel com pedra
 * laranja) não foi enviado; o vídeo/imagens disponíveis são todos do anel
 * com pedra incolor usado na Hero, então não é o asset certo para essa
 * ruptura visual. Em vez de usar a foto errada, este placeholder comunica
 * a intenção (brilho quente, surpresa, contraste com a cena fria da
 * Moissanite) com um degradê quente no lugar da foto.
 *
 * Quando a foto do anel com pedra laranja chegar: substituir o
 * .warmField por uma <Image> full-bleed, mantendo a mesma posição no
 * fluxo (logo após a Moissanite, antes de Peças com Significado).
 */
export default function SceneWow() {
  const sectionRef = useRef<HTMLElement>(null);
  useRevealOnScroll(sectionRef);

  return (
    <section ref={sectionRef} className={styles.scene} aria-label="Momento Wow">
      <div className={styles.warmField} data-reveal aria-hidden="true" />

      <div className={styles.copy}>
        <p className={styles.eyebrow} data-reveal>
          Surpresa visual
        </p>
        <h2 className={styles.heading} data-reveal>
          Nem todo brilho precisa ser previsível
        </h2>
        <p className={styles.placeholderNote} data-reveal>
          — reservado para o anel com pedra laranja —
        </p>
      </div>
    </section>
  );
}
