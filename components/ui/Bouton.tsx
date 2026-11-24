import type { ButtonHTMLAttributes } from "react";
import styles from "./Bouton.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: "primaire" | "secondaire" | "danger";
};

export function Bouton({
  variante = "primaire",
  className = "",
  type = "button",
  ...rest
}: Props) {
  return (
    <button
      type={type}
      className={`${styles.bouton} ${styles[variante]} ${className}`}
      {...rest}
    />
  );
}
