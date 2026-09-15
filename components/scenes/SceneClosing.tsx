"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./SceneClosing.module.css";

const whatsappUrl = "https://api.whatsapp.com/send/?phone=5519995125309&text=Oi+Jhoy%2C+conheci+mais+da+loja+atrav%C3%A9s+da+p%C3%A1gina+e+fiquei+encantada+com+os+produtos%21+%F0%9F%A5%B0%0AGostaria+de+saber+mais+sobre+a+loja+e+os+produtos.+Meu+nome+%C3%A9%3A&utm_source=chatgpt.com";

export default function SceneClosing() {
  const [opening, setOpening] = useState(false);
  useEffect(() => {
    const reset = () => setOpening(false);
    window.addEventListener("pageshow", reset);
    const timer = opening ? window.setTimeout(reset, 6000) : undefined;
    return () => { window.removeEventListener("pageshow", reset); window.clearTimeout(timer); };
  }, [opening]);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-closing-reveal]", {
          opacity: 0, y: 16, duration: .85, stagger: .12, ease: "power2.out",
          scrollTrigger: { trigger: section.current, start: "top 78%", once: true },
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    document.getElementById("inicio")?.focus({ preventScroll: true });
  };

  return <>
    <section ref={section} className={styles.closing} aria-labelledby="closing-heading">
      <h2 id="closing-heading" data-closing-reveal>Escolha a peça que mais conversa com a sua história.</h2>
      <div className={styles.actions} data-closing-reveal>
        <a onClick={event => { if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) setOpening(true); }} aria-busy={opening} className={styles.primary} href="https://www.gdpratascontrol.online/catalogo/jhoy-pratas"><span className={styles.label}>Conhecer o catálogo</span><span className={styles.arrow} aria-hidden="true">→</span></a>
        <a className={styles.secondary} href={whatsappUrl} target="_blank" rel="noopener noreferrer">Falar no WhatsApp<span className={styles.srOnly}> (abre em nova aba)</span></a>
      </div>
      <span className={styles.srOnly} role="status">{opening ? "Abrindo o catálogo…" : ""}</span></section>
    <footer className={styles.footer}>
      <div className={styles.footerRow}>
        <p>© 2026 Jhoy Pratas. Todos os direitos reservados.</p>
        <button type="button" onClick={backToTop}>Voltar ao início <span aria-hidden="true">↑</span></button>
      </div>
      <p className={styles.easterEgg}>Porque eu amo minhas coisinhas.</p>
    </footer>
  </>;
}
