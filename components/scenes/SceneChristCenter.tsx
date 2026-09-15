"use client";

import type { RefObject } from "react";
import styles from "./SceneChristCenter.module.css";

export default function SceneChristCenter({ videoRef }: { videoRef: RefObject<HTMLVideoElement | null> }) {
  return (
    <section className={styles.scene} data-christ-scene aria-label="Cristo é o centro">
      <video ref={videoRef} className={styles.video} data-convergence src="/christ/convergence-v3-scroll.mp4" muted playsInline preload="none" aria-hidden="true" />
      <div className={styles.finale} data-star-finale aria-hidden="true" />
      <div className={styles.words} aria-label="Valor, amor, propósito, graça">
        {["VALOR", "AMOR", "PROPÓSITO", "GRAÇA"].map(word => <span key={word} data-word aria-hidden="true">{word}</span>)}
      </div>
      <div className={styles.illustration} data-illustration role="img" aria-label="Ilustração linear de Cristo em perfil" />
      <div className={styles.copy}>
        <h2 data-christ-title><strong>CRISTO</strong><span>É O CENTRO.</span></h2>
        <p data-christ-copy>É dEle que vem o nosso propósito.</p>
        <p data-christ-copy>E é para Ele que queremos apontar.</p>
      </div>
    </section>
  );
}
