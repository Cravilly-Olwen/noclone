import type { ReactNode } from "react";
import styles from "./Badge.module.css";

type Props = {
  ton?: "neutre" | "succes" | "attention" | "danger";
  children: ReactNode;
};

export function Badge({ ton = "neutre", children }: Props) {
  return (
    <span className={`${styles.badge} ${styles[ton] ?? ""}`}>{children}</span>
  );
}
