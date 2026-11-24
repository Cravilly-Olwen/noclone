import { Bouton } from "@/components/ui/Bouton";
import { Champ } from "@/components/ui/Champ";
import styles from "./page.module.css";

const couleurs = [
  "cobalt",
  "orange",
  "emeraude",
  "lavande",
  "corail",
  "ambre",
  "cerise",
  "lagon",
];
const cartes = ["cobalt", "orange", "emeraude", "lavande", "cerise", "lagon"];
const fonds = ["nuit", "surface", "trait", "texte", "gris"];

export default function Home() {
  return (
    <main className={styles.page}>
      <h1>Aperçu de globals.css, ceci est un test.</h1>
      <p>
        Copiez-nous. Vous n&apos;y arriverez pas. Ce paragraphe est limité à 74
        caractères de large, avec un <a href="#liens">lien en cobalt</a> et du{" "}
        <code>code en Space Mono</code>. Redimensionnez la fenêtre pour voir les
        titres s&apos;ajuster.
      </p>

      <h2>Boutons</h2>
      <div className={styles.rangee}>
        <Bouton>Primaire</Bouton>
        <Bouton variante="secondaire">Secondaire</Bouton>
        <Bouton variante="danger">Danger</Bouton>
        <Bouton disabled>Désactivé</Bouton>
      </div>

      <h2>Champs</h2>
      <div className={styles.rangee}>
        <Champ
          label="Bénéficiaire"
          placeholder="Nom ou courriel"
          aide="Un nouveau bénéficiaire déclenche un délai de 24 h."
        />
        <Champ
          label="Montant ($)"
          type="number"
          defaultValue="10"
          erreur="Le montant doit être positif."
        />
        <Champ label="Désactivé" disabled defaultValue="Non modifiable" />
      </div>

      <h2>Titres</h2>
      <h3>Un titre de niveau 3</h3>
      <h4>Un titre de niveau 4</h4>

      <h2>Fonds et texte</h2>
      <ul className={styles.grille}>
        {fonds.map((c) => (
          <li
            key={c}
            className={styles.pastille}
            style={{ background: `var(--${c})` }}
          >
            <span
              style={{
                color:
                  c === "texte" || c === "gris"
                    ? "var(--nuit)"
                    : "var(--texte)",
              }}
            >
              --{c}
            </span>
          </li>
        ))}
      </ul>

      <h2>Couleurs de texte</h2>
      <ul className={styles.grille}>
        {couleurs.map((c) => (
          <li
            key={c}
            className={styles.pastille}
            style={{ color: `var(--${c})` }}
          >
            --{c}
          </li>
        ))}
      </ul>

      <h2>Cartes</h2>
      <ul className={styles.grille}>
        {cartes.map((c) => (
          <li
            key={c}
            className={styles.carte}
            style={{ background: `var(--carte-${c})` }}
          >
            <code>--carte-{c}</code>
          </li>
        ))}
      </ul>

      <h2 id="liens">Police de code</h2>
      <p>
        <code>0123 4567 8901 2345</code>
      </p>
    </main>
  );
}
