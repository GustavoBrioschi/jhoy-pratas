"use client";

import Image from "next/image";
import { forwardRef } from "react";
import styles from "./JhoyLogo.module.css";

interface JhoyLogoProps {
  className?: string;
}

/**
 * Logotipo oficial da Jhoy (vinho sobre transparente).
 *
 * O asset original é uma imagem rasterizada (não há paths vetoriais
 * editáveis na geometria da logo), então a "revelação progressiva" pedida
 * na especificação é simulada com uma máscara CSS (mask-image) cuja borda
 * de corte é controlada pela custom property --reveal (0 a 100), animada
 * pela cena via GSAP. A geometria da logo em si nunca é alterada.
 */
const JhoyLogo = forwardRef<HTMLDivElement, JhoyLogoProps>(function JhoyLogo(
  { className },
  ref,
) {
  return (
    <div ref={ref} className={`${styles.logo} ${className ?? ""}`}>
      <Image
        src="/brand/jhoy-logo-vinho.png"
        alt="Jhoy Prata"
        fill
        priority
        sizes="(max-width: 640px) 320px, 520px"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
});

export default JhoyLogo;
