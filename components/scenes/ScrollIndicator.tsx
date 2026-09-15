"use client";

import { forwardRef } from "react";
import styles from "./ScrollIndicator.module.css";

interface ScrollIndicatorProps {
  className?: string;
  /**
   * "wine" (padrão) para fundos claros (off-white); "offwhite" para cenas
   * de fundo escuro/vídeo, como a nova Hero — mantém o mesmo componente
   * sem duplicar marcação para os dois contextos de cor.
   */
  tone?: "wine" | "offwhite";
}

/**
 * Indicador discreto de scroll, reutilizado em várias cenas.
 *
 * A cena controla, via a ref encaminhada:
 *   - a visibilidade (começa visível, some após os primeiros % de scroll)
 *   - a oscilação contínua e sutil da haste/seta (elemento marcado com
 *     data-scroll-glyph), que roda fora da timeline de scroll (um loop
 *     independente, não atrelado ao scrub).
 *
 * Puramente decorativo/informativo — aria-hidden e pointer-events: none,
 * já que não é um controle interativo.
 */
const ScrollIndicator = forwardRef<HTMLDivElement, ScrollIndicatorProps>(
  function ScrollIndicator({ className, tone = "wine" }, ref) {
    const strokeColor = tone === "offwhite" ? "#E3D1C3" : "#571E23";

    return (
      <div
        ref={ref}
        className={`${styles.indicator} ${tone === "offwhite" ? styles.offwhite : ""} ${className ?? ""}`}
        aria-hidden="true"
      >
        <span className={styles.label}>Role para descobrir</span>
        <svg
          className={styles.glyph}
          data-scroll-glyph=""
          width="10"
          height="16"
          viewBox="0 0 10 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="5" y1="0" x2="5" y2="9" stroke={strokeColor} strokeWidth="1" />
          <path
            d="M1 6.5L5 10.5L9 6.5"
            stroke={strokeColor}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    );
  },
);

export default ScrollIndicator;
