import Image from "next/image";
import styles from "./FloatingSticker.module.css";

export default function FloatingSticker() {
  return <div className={styles.sticker} aria-label="Jhoy Prata">
    <Image src="/brand/jhoy-sticker.png" alt="Jhoy Prata" width={180} height={180} priority />
  </div>;
}
