"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Scene03Affirmations from "./Scene03Affirmations";
import SceneChristCenter from "./SceneChristCenter";
import styles from "./ScenePurposeJourney.module.css";

/** One pinned stage keeps scene 3 stationary during the rising chapter cover. */
export default function ScenePurposeJourney() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const media = video.current;
    if (!media) return;
    const playhead = { progress: 0 };
    let disposed = false;
    // Coalesce seeks: a slow decoder always catches up to the latest scroll target.
    const seek = () => {
      if (disposed || media.readyState < 1 || !Number.isFinite(media.duration) || media.seeking) return;
      const target = playhead.progress * Math.max(0, media.duration - 0.04);
      if (Math.abs(media.currentTime - target) > 0.025) media.currentTime = target;
    };
    media.pause();
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        media.preload = "auto";
        media.load();
        observer.disconnect();
      }
    }, { rootMargin: "100% 0px" });
    if (root.current) observer.observe(root.current);
    media.addEventListener("loadedmetadata", seek);
    media.addEventListener("seeked", seek);
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add({ reduced: "(prefers-reduced-motion: reduce)", mobile: "(max-width: 700px)", desktop: "(min-width: 701px)" }, context => {
        const { reduced, mobile } = context.conditions!;
        if (reduced) {
          playhead.progress = 1;
          seek();
          return;
        }
        const select = gsap.utils.selector(root);
        const manifesto = root.current?.previousElementSibling;
        const manifestoContent = manifesto?.querySelector("[data-manifesto-exit]");
        if (manifestoContent) gsap.to(manifestoContent, { opacity: 0, ease: "none", scrollTrigger: {
          trigger: root.current, start: "top 65%", end: "top top", scrub: true,
        } });
        const words = select("[data-word]");
        const phrases = select("[data-affirmation]");
        gsap.set("[data-affirmation], [data-amada], [data-closing], [data-word], [data-illustration], [data-christ-title], [data-christ-copy]", { opacity: 0 });
        gsap.set("[data-star-finale]", { opacity: 0 });
        gsap.set("[data-christ-scene]", { yPercent: 100 });
        gsap.set("[data-ring]", { scale: .94, opacity: .85 });
        gsap.set("[data-spark]", { opacity: .4 });
        const tl = gsap.timeline({ defaults: { ease: "sine.inOut" }, scrollTrigger: {
          trigger: root.current, start: "top top", end: () => `+=${stage.current!.clientHeight * (mobile ? 10 : 12)}`,
          pin: stage.current, scrub: 0.9, anticipatePin: 1, invalidateOnRefresh: true,
        } });
        tl.to("[data-spark]", { opacity: 0, duration: .35 }, 0)
          .to("[data-ring]", { opacity: 1, duration: .45 }, 0)
          .to("[data-ring]", { scale: 1.06, duration: 5.5, ease: "sine.inOut" }, 0);
        phrases.forEach((phrase, i) => {
          const start = .8 + i * 1.65;
          tl.fromTo(phrase, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .4 }, start)
            .to(phrase, { opacity: 0, y: -8, duration: .35 }, start + 1.25);
        });
        // Ring is completely stationary before the editorial closing and overlap.
        tl.to("[data-amada]", { opacity: .13, duration: .7 }, 6)
          .to("[data-closing]", { opacity: 1, duration: .6 }, 6.35)
          .to("[data-christ-scene]", { yPercent: 0, duration: 1.7, ease: "none" }, 7.8)
          .fromTo(playhead, { progress: 0 }, { progress: 1, duration: 5.4, ease: "none", onUpdate: seek }, 9.5);
        const origins = mobile ? [[-24,-22],[23,-10],[-18,22],[22,27]] : [[-30,-23],[29,-16],[-26,25],[27,27]];
        words.forEach((word, i) => {
          const [x, y] = origins[i];
          const start = 9.7 + i * .92;
          tl.fromTo(word, { x: `${x}vw`, y: `${y}svh`, opacity: 0, scale: 1 }, { opacity: 1, duration: .3 }, start)
            .to(word, { x: 0, y: 0, scale: .45, opacity: 0, duration: 1.25 }, start + .4);
        });
        // Let the new clip finish forming its star before revealing the supplied still.
        tl.to("[data-star-finale]", { opacity: 1, duration: .35 }, 14.9)
          .set("[data-convergence]", { opacity: 0 }, 15.25)
          .to("[data-star-finale]", { opacity: 0, duration: .8 }, 15.7)
          .to("[data-illustration]", { opacity: mobile ? .38 : .65, duration: 1.2 }, 16)
          .to("[data-christ-title]", { opacity: 1, duration: .8 }, 16.7)
          .to(select("[data-christ-copy]")[0], { opacity: 1, duration: .7 }, 17.7)
          .to(select("[data-christ-copy]")[1], { opacity: 1, duration: .7 }, 18.7)
          .to({}, { duration: 1.6 });
        seek();
      });
    }, root);
    return () => {
      disposed = true;
      observer.disconnect();
      media.removeEventListener("loadedmetadata", seek);
      media.removeEventListener("seeked", seek);
      ctx.revert();
    };
  }, []);

  return <div ref={root} className={styles.journey}><div ref={stage} className={styles.stage}>
    <Scene03Affirmations /><SceneChristCenter videoRef={video} />
  </div></div>;
}
