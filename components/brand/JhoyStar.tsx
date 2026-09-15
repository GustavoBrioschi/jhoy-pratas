"use client";

import Image from "next/image";
import { forwardRef } from "react";
import styles from "./JhoyStar.module.css";

interface JhoyStarProps {
  className?: string;
}

/**
 * Estrela oficial da Jhoy (vinho sobre off-white). A geometria é a do
 * asset original — este componente só posiciona e expõe uma ref para a
 * cena controlar opacidade/escala/blur via GSAP.
 */
const JhoyStar = forwardRef<HTMLDivElement, JhoyStarProps>(function JhoyStar(
  { className },
  ref,
) {
  return (
    <div ref={ref} className={`${styles.star} ${className ?? ""}`}>
      <Image
        src="/brand/jhoy-star-vinho.png"
        alt=""
        fill
        priority
        sizes="(max-width: 640px) 32px, 44px"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
});

export default JhoyStar;
