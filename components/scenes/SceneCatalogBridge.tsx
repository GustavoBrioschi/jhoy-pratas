"use client";
import { useEffect, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import styles from "./SceneCatalogBridge.module.css";
const panels = [
  ["/collection/panel-1.png", "CONHEÇA AS PEÇAS", "Joias para marcar momentos, carregar significado e revelar beleza nos detalhes.", "MAIS QUE JOIAS\nHISTÓRIAS REAIS"],
  ["/collection/panel-2.png", "ANÉIS", "Delicadeza que acompanha você nos detalhes.", "DETALHES\nQUE PERMANECEM"],
  ["/collection/panel-3.png", "MOISSANITE", "Um brilho que foge do óbvio.", "COR, BRILHO\nE PERSONALIDADE"],
  ["/collection/panel-4.png", "COLARES", "Leveza e significado em cada detalhe.", "SIMPLES\nE EXTRAORDINÁRIO"],
  ["/collection/panel-5.png", "BRINCOS", "Para iluminar a beleza com sutileza.", "BELEZA\nEM CADA ÂNGULO"],
  ["/collection/panel-6.png", "PULSEIRAS", "Detalhes que acompanham você em todos os momentos.\n\nEscolha a peça que mais conversa com a sua história.", "VOCÊ É PRECIOSA\nVOCÊ TEM VALOR\nVOCÊ É AMADA"],
];
export default function SceneCatalogBridge() {
  const section = useRef<HTMLElement>(null); const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const distance = () => Math.max(0, track.current!.scrollWidth - section.current!.clientWidth);
        const panels = gsap.utils.toArray<HTMLElement>("article", track.current!);
        const setters = panels.map(panel => gsap.quickSetter(panel.querySelector("img"), "y", "px"));
        gsap.set(panels.map(panel => panel.querySelector("img")), { y: 0 });
        let centers: number[] = [];
        let travel = 0;
        let viewport = 1;
        const measure = () => {
          travel = distance();
          viewport = section.current!.clientWidth;
          centers = panels.map(panel => panel.offsetLeft + panel.offsetWidth / 2);
        };
        measure();
        gsap.to(track.current, {
          x: () => -distance(), ease: "none",
          onUpdate: function () {
            const offset = this.progress() * travel;
            centers.forEach((center, index) => setters[index](gsap.utils.clamp(-4, 4, (center - offset - viewport / 2) / viewport * 8)));
          },
          scrollTrigger: {
            trigger: section.current, start: "top top", end: () => `+=${Math.max(distance(), section.current!.clientHeight)}`,
            pin: true, scrub: .8, anticipatePin: 1, invalidateOnRefresh: true,
            onRefresh: measure,
          },
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);
  const dimensions = [[887,1774],[941,1672],[941,1672],[887,1774],[948,1659],[941,1672]];
  return <section ref={section} className={styles.scene} aria-label="Conheça as peças"><div ref={track} className={styles.track}>{panels.map(([src,title,body,footer], index) => <article className={styles.panel} key={src} style={{ "--panel-ratio": dimensions[index][0] / dimensions[index][1] } as CSSProperties}><Image onLoad={event => { event.currentTarget.dataset.loaded = "true"; }} src={src} alt={`${title}. ${body} ${footer}`} width={dimensions[index][0]} height={dimensions[index][1]} sizes="(max-width: 760px) 84vw, 52vh" /></article>)}</div></section>;
}
