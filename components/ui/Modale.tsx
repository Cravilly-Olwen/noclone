"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import styles from "./Modale.module.css";

type Props = {
  ouverte: boolean;
  onFermer: () => void;
  titre: string;
  children: ReactNode;
};

export function Modale({ ouverte, onFermer, titre, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const idTitre = useId();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (ouverte && !d.open) d.showModal();
    if (!ouverte && d.open) d.close();
  }, [ouverte]);

  return (
    <dialog
      ref={ref}
      className={styles.modale}
      aria-labelledby={idTitre}
      onClose={onFermer}
    >
      <div className={styles.tete}>
        <h2 id={idTitre}>{titre}</h2>
        <button
          type="button"
          className={styles.fermer}
          aria-label="Fermer"
          onClick={onFermer}
        >
          x
        </button>
      </div>
      {children}
    </dialog>
  );
}
