import { useId, type InputHTMLAttributes } from "react";
import styles from "./Champ.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  aide?: string;
  erreur?: string;
};

export function Champ({
  label,
  aide,
  erreur,
  id,
  className = "",
  ...rest
}: Props) {
  const auto = useId();
  const champ = id ?? auto;
  const decrit = [aide && `${champ}-aide`, erreur && `${champ}-erreur`]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={styles.champ}>
      <label htmlFor={champ}>{label}</label>
      <input
        id={champ}
        className={`${styles.saisie} ${className}`}
        aria-invalid={erreur ? true : undefined}
        aria-describedby={decrit || undefined}
        {...rest}
      />
      {aide && (
        <span id={`${champ}-aide`} className={styles.aide}>
          {aide}
        </span>
      )}
      {erreur && (
        <span id={`${champ}-erreur`} role="alert" className={styles.erreur}>
          {erreur}
        </span>
      )}
    </div>
  );
}
