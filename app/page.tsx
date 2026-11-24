"use client";

import { useState } from "react";
import { Bouton } from "@/components/ui/Bouton";
import { Badge } from "@/components/ui/Badge";
import { Champ } from "@/components/ui/Champ";
import { Minuteur } from "@/components/ui/Minuteur";
import { Modale } from "@/components/ui/Modale";
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
        <Bouton>Primaire</Bouton>
        <Bouton variante="secondaire">Secondaire</Bouton>
        <Bouton variante="danger">Danger</Bouton>
        <Bouton disabled>Désactivé</Bouton>
      </div>

      <h2>Champs</h2>
      <div className={styles.rangee}>
        <Champ
          label="Bénéficiaire"
          placeholder="Julie Tremblay"
          inputMode="text"
          aide="Lettres seulement. Un nouveau bénéficiaire déclenche un délai de 24 h."
        />
        <Champ
          label="Montant"
          inputMode="decimal"
          defaultValue="0"
          erreur="Le montant doit être positif." // affiche une erreur uniquement quand le paramètre error est fournis (si undefined est passé ça n'affiche pas d'erreur)
        />
        <Champ label="Désactivé" disabled defaultValue="Non modifiable" />
      </div>

      <h2>Badges</h2>
      <div className={styles.rangee}>
        <Badge>En attente</Badge>
        <Badge ton="succes">Envoyé</Badge>
        <Badge ton="attention">Délai de sécurité</Badge>
        <Badge ton="danger">Annulé</Badge>
      </div>

      <h2>Modale</h2>
      <div>
        <Bouton onClick={() => setOuverte(true)}>Ouvrir la modale</Bouton>
        <Modale
          ouverte={ouverte}
          onFermer={() => setOuverte(false)}
          titre="Titre du modal"
        >
          <p>Voulez vous vraiment annuler ?</p>
          <div className={styles.rangee} style={{ marginTop: 24 }}>
            <Bouton variante="danger" onClick={() => setOuverte(false)}>
              Oui, annuler
            </Bouton>
            <Bouton variante="secondaire" onClick={() => setOuverte(false)}>
              Non
            </Bouton>
          </div>
        </Modale>
      </div>

      <h2>Minuteur</h2>
      <div className={styles.rangee} style={{ alignItems: "center" }}>
        <Bouton
          variante="secondaire"
          onClick={() => {
            setFin(Date.now() + 5000);
            setTermine(false);
          }}
        >
          Démarrer (5 s)
        </Bouton>
        {fin !== null && (
          <>
            <span>
              {termine ? "Minuteur termine :" : "Minuteur en cours... :"}{" "}
              <Minuteur fin={fin} onFin={() => setTermine(true)} />
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
