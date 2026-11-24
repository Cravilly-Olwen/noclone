"use client";

import { useEffect, useEffectEvent, useState } from "react";
import styles from "./Minuteur.module.css";

type Props = {
  fin: number;
  onFin?: () => void;
};

export function Minuteur({ fin, onFin }: Props) {
  const [reste, setReste] = useState<number | null>(null);

  const prevenirFin = useEffectEvent(() => onFin?.());

  useEffect(() => {
    const id = setInterval(() => {
      const secondes = Math.max(0, Math.ceil((fin - Date.now()) / 1000));
      setReste(secondes);
      if (secondes === 0) {
        clearInterval(id);
        prevenirFin();
      }
    }, 250);
    return () => clearInterval(id);
  }, [fin]);

  if (reste === null) return <span className={styles.minuteur}>--:--:--</span>;

  const jours = Math.floor(reste / 86400);
  const heures = Math.floor(reste / 3600) % 24;
  const minutes = Math.floor(reste / 60) % 60;
  const secondes = reste % 60;
  return (
    <time className={styles.minuteur} role="timer" dateTime={`PT${reste}S`}>
      {jours > 0 && `${jours} j `}
      {String(heures).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(secondes).padStart(2, "0")}
    </time>
  );
}
