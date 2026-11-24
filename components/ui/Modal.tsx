"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import styles from "./Modal.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export function Modal({ open, onClose, title, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={styles.modal}
      aria-labelledby={titleId}
      onClose={onClose}
    >
      <div className={styles.header}>
        <h2 id={titleId}>{title}</h2>
        <button
          type="button"
          className={styles.close}
          aria-label="Fermer"
          onClick={onClose}
        >
          x
        </button>
      </div>
      {children}
    </dialog>
  );
}
