"use client";

import { useEffect, useEffectEvent, useState } from "react";
import styles from "./Timer.module.css";

type Props = {
  end: number;
  onEnd?: () => void;
};

export function Timer({ end, onEnd }: Props) {
  const [remaining, setRemaining] = useState<number | null>(null);

  const notifyEnd = useEffectEvent(() => onEnd?.());

  useEffect(() => {
    const id = setInterval(() => {
      const seconds = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      setRemaining(seconds);
      if (seconds === 0) {
        clearInterval(id);
        notifyEnd();
      }
    }, 250);
    return () => clearInterval(id);
  }, [end]);

  if (remaining === null) return <span className={styles.timer}>--:--:--</span>;

  const days = Math.floor(remaining / 86400);
  const hours = Math.floor(remaining / 3600) % 24;
  const minutes = Math.floor(remaining / 60) % 60;
  const seconds = remaining % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <time className={styles.timer} role="timer" dateTime={`PT${remaining}S`}>
      {days > 0 && `${days} j `}
      {pad(hours)}:{pad(minutes)}:{pad(seconds)}
    </time>
  );
}
