"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./SceneMoissanite.module.css";

export default function SceneMoissanite() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const spark = useRef<HTMLDivElement>(null);
  const eyebrow = useRef<HTMLParagraphElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const support = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add({ mobile: "(max-width: 760px)", desktop: "(min-width: 761px)", reduced: "(prefers-reduced-motion: reduce)" }, context => {
        const { mobile, reduced } = context.conditions!;
        if (reduced) return;
        const revealDistance = () => stage.current!.clientHeight * (mobile ? 3.5 : 4);
        // The next scene covers this stage during its extra viewport of pinning.
        const reserveSpace = () => { gsap.set(section.current, { paddingBottom: revealDistance() }); };
        reserveSpace();
        ScrollTrigger.create({
          trigger: section.current, start: "top top",
          end: () => `+=${revealDistance() + stage.current!.offsetHeight}`,
          pin: stage.current, pinSpacing: false, anticipatePin: 1,
          invalidateOnRefresh: true, onRefreshInit: reserveSpace,
        });
        gsap.set(stage.current, { backgroundColor: "#571E23" });
        gsap.set(ring.current, { opacity: 0, scale: mobile ? 1.9 : 2.25, clipPath: "circle(2% at 50% 35%)" });
        gsap.set(spark.current, { opacity: .5, scale: .6 });
        gsap.set([eyebrow.current, headline.current, support.current], { opacity: 0, y: 18 });
        const tl = gsap.timeline({ defaults: { ease: "sine.inOut" }, scrollTrigger: {
          trigger: section.current, start: "top top", end: () => `+=${revealDistance()}`,
          scrub: .8, invalidateOnRefresh: true,
        } });
        tl.to(stage.current, { backgroundColor: "#100608", duration: .25 }, 0)
          .to(spark.current, { opacity: .8, scale: 1.3, duration: .15 }, 0)
          .to(ring.current, { opacity: 1, clipPath: "circle(22% at 50% 35%)", duration: .2 }, .15)
          .to(spark.current, { opacity: 0, duration: .15 }, .2)
          .to(ring.current, { scale: 1, clipPath: "circle(85% at 50% 35%)", duration: .3 }, .35)
          .to(eyebrow.current, { opacity: .8, y: 0, duration: .12 }, .6)
          .to(headline.current, { opacity: 1, y: 0, duration: .18 }, .7)
          .to(support.current, { opacity: .85, y: 0, duration: .16 }, .82)
          .to({}, { duration: .15 }, .98);
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className={styles.scene} aria-label="Moissanite">
      <div ref={stage} className={styles.stage}>
        <div className={styles.visual}>
          <div ref={spark} className={styles.spark} aria-hidden="true" />
          <div ref={ring} className={styles.ring}>
            <Image src="/moissanite/orange-ring.png" alt="Anel Jhoy Prata com pedra laranja e halo de pedras incolores" fill unoptimized sizes="(max-width: 760px) 92vw, 55vw" style={{ objectFit: "contain" }} />
          </div>
        </div>
        <div className={styles.copy}>
          <p ref={eyebrow} className={styles.eyebrow}>MOISSANITE</p>
          <h2 ref={headline} className={styles.heading}>Nem todo brilho precisa ser previsível.</h2>
          <p ref={support} className={styles.support}>Uma pedra feita para surpreender nos detalhes.</p>
        </div>
      </div>
    </section>
  );
}
