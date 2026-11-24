import { useId, type InputHTMLAttributes } from "react";
import styles from "./Field.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Field({
  label,
  hint,
  error,
  id,
  className = "",
  ...rest
}: Props) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const describedBy = [hint && `${fieldId}-hint`, error && `${fieldId}-error`]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={styles.field}>
      <label htmlFor={fieldId}>{label}</label>
      <input
        id={fieldId}
        className={`${styles.input} ${className}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        {...rest}
      />
      {hint && (
        <span id={`${fieldId}-hint`} className={styles.hint}>
          {hint}
        </span>
      )}
      {error && (
        <span id={`${fieldId}-error`} role="alert" className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}
