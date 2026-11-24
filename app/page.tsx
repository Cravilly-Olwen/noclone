"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Field } from "@/components/ui/Field";
import { Timer } from "@/components/ui/Timer";
import { Modal } from "@/components/ui/Modal";
import styles from "./page.module.css";

const couleurs = [
  "cobalt",
  "orange",
  "emerald",
  "lavender",
  "coral",
  "amber",
  "cherry",
  "lagoon",
];
const cartes = ["cobalt", "orange", "emerald", "lavender", "cherry", "lagoon"];
const fonds = ["night", "surface", "border", "text", "muted"];

export default function Home() {
  const [ouverte, setOuverte] = useState(false);
  const [fin, setFin] = useState<number | null>(null);
  const [termine, setTermine] = useState(false);

  return (
    <main className={styles.page}>
      <h1>Aperçu de globals.css, ceci est un test.</h1>
      <p>
        Ce paragraphe est limité à 74 caractères de large, avec un{" "}
        <a href="#liens">lien en cobalt</a> et du{" "}
        <code>code en Space Mono</code>. Redimensionnez la fenêtre pour voir les
        titres s&apos;ajuster.
      </p>

      <h2>Boutons</h2>
      <div className={styles.rangee}>
        <Button>Primaire</Button>
        <Button variant="secondary">Secondaire</Button>
        <Button variant="danger">Danger</Button>
        <Button disabled>Désactivé</Button>
      </div>

      <h2>Champs</h2>
      <div className={styles.rangee}>
        <Field
          label="Un champ de texte"
          placeholder="Jean Jean"
          inputMode="text"
          hint="Voici une aide au cas où vous ne savez pas lire. Booo"
        />
        <Field
          label="Un autre champ de texte"
          inputMode="decimal"
          defaultValue="0"
          error="Ceci est une erreur" // affiche une erreur uniquement quand le paramètre error est fourni (si undefined est passé ça n'affiche pas d'erreur)
        />
        <Field label="Désactivé" disabled defaultValue="Non modifiable" />
      </div>

      <h2>Badges</h2>
      <div className={styles.rangee}>
        <Badge>En attente</Badge>
        <Badge tone="success">Envoyé</Badge>
        <Badge tone="warning">Délai de sécurité</Badge>
        <Badge tone="danger">Annulé</Badge>
      </div>

      <h2>Modale</h2>
      <div>
        <Button onClick={() => setOuverte(true)}>Ouvrir la modale</Button>
        <Modal
          open={ouverte}
          onClose={() => setOuverte(false)}
          title="Titre du modal"
        >
          <p>Voulez vous vraiment annuler ?</p>
          <div className={styles.rangee} style={{ marginTop: 24 }}>
            <Button variant="danger" onClick={() => setOuverte(false)}>
              Oui, annuler
            </Button>
            <Button variant="secondary" onClick={() => setOuverte(false)}>
              Non
            </Button>
          </div>
        </Modal>
      </div>

      <h2>Minuteur</h2>
      <div className={styles.rangee} style={{ alignItems: "center" }}>
        <Button
          variant="secondary"
          onClick={() => {
            setFin(Date.now() + 5000);
            setTermine(false);
          }}
        >
          Démarrer (5 s)
        </Button>
        {fin !== null && (
          <>
            <span>
              {termine ? "Minuteur termine :" : "Minuteur en cours... :"}{" "}
              <Timer end={fin} onEnd={() => setTermine(true)} />
            </span>
          </>
        )}
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
                  c === "text" || c === "muted"
                    ? "var(--night)"
                    : "var(--text)",
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
            style={{ background: `var(--card-${c})` }}
          >
            <code>--card-{c}</code>
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
