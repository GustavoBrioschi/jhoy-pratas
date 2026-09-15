"use client";
import { useEffect, useRef } from "react";
import { useVisibleVideo } from "@/lib/useVisibleVideo";
import { gsap } from "@/lib/gsap";
import styles from "./ScenePieces.module.css";
export default function ScenePieces() {
  const section = useRef<HTMLElement>(null); const image = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  useVisibleVideo(video);
  useEffect(() => { const ctx = gsap.context(() => { const mm = gsap.matchMedia(); mm.add({ all: "all", reduced: "(prefers-reduced-motion: reduce)" }, ({ conditions }) => { if (conditions?.reduced) return; gsap.fromTo(image.current, { y: 28, scale: .96 }, { y: -18, scale: 1, ease: "none", scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: .8 } }); }); }, section); return () => ctx.revert(); }, []);
  return <section ref={section} className={styles.scene} aria-label="Peças com significado"><div ref={image} className={styles.image}>
    <video
      ref={video}
      className={styles.video}
      src="/collection/pieces-loop.mp4"
      poster="/collection/pieces-poster.jpg"
      aria-label="Mão feminina usando anéis Jhoy Prata"
      muted
      loop
      playsInline
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      preload="metadata"
      tabIndex={-1}
    />
  </div><div className={styles.copy}><p className={styles.eyebrow}>PEÇAS COM SIGNIFICADO</p><h2>Mais do que complementar o que você veste, queremos revelar o que você carrega.</h2><p>Cada detalhe pode carregar uma lembrança, um valor ou uma história.</p><p>Porque uma joia pode ser mais do que aquilo que os olhos veem. Ela pode representar aquilo que você nunca quer esquecer.</p><span>Agora, descubra as peças que contam essa história.</span></div></section>;
}
