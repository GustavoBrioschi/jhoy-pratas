"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./BackgroundMusic.module.css";

export default function BackgroundMusic() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const media = audio.current;
    const pauseWhenHidden = () => { if (document.hidden) media?.pause(); };
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      media?.pause();
    };
  }, []);

  const toggle = async () => {
    const media = audio.current;
    if (!media) return;
    if (!media.paused) { media.pause(); return; }
    setError(false);
    setLoading(true);
    media.volume = 0.25;
    try { await media.play(); }
    catch { setError(true); }
    finally { setLoading(false); }
  };

  return <>
    <audio ref={audio} src="/audio/fundo-musical.mp3" preload="none" loop
      onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onError={() => { setError(true); setLoading(false); setPlaying(false); }} />
    <button className={styles.control} type="button" onClick={toggle} disabled={loading}
      aria-label={playing ? "Desligar música de fundo" : "Ativar música de fundo"}
      aria-pressed={playing} aria-busy={loading}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
        {playing ? <path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" /> : <path d="m16 9 5 6m0-6-5 6" />}
      </svg>
      <span>{loading ? "Carregando" : playing ? "Som ligado" : "Ativar som"}</span>
    </button>
    <span className={styles.status} role="status">{error ? "Não foi possível tocar a música. Tente ativar o som novamente." : ""}</span>
  </>;
}
