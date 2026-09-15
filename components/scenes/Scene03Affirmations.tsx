"use client";

import Image from "next/image";
import JhoyStar from "@/components/brand/JhoyStar";
import styles from "./Scene03Affirmations.module.css";

export default function Scene03Affirmations() {
  return (
    <section className={styles.scene} aria-label="Você é amada">
      <div className={styles.spark} data-spark aria-hidden="true"><JhoyStar /></div>
      <span className={styles.amada} data-amada aria-hidden="true">AMADA</span>
      <div className={styles.ring} data-ring>
        <Image src="/scene02/heart-ring-transparent.png" alt="Anel coração da Jhoy Prata" fill unoptimized sizes="100vw" style={{ objectFit: "contain" }} />
      </div>
      <div className={styles.messages}>
        <p data-affirmation>Você é preciosa.</p>
        <p data-affirmation>Você tem valor.</p>
        <p data-affirmation className={styles.loved}>Você é amada.</p>
      </div>
      <p className={styles.closing} data-closing><span>Nunca se esqueça disso.</span></p>
    </section>
  );
}
