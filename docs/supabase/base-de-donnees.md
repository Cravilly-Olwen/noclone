# Base de données

Noclone utilise **Supabase** (PostgreSQL).

Les comptes eux-mêmes (courriel, sessions) sont gérés par **Supabase Auth**, dans la table `auth.users`. Nos tables ajoutent ce que Supabase ne gère pas : la fiche du client, ses passkeys et les défis WebAuthn.

## Tables

### `clients`

La fiche d'identité du client. Une seule par compte.

| Colonne | Type | Description |
| --- | --- | --- |
| `id` | uuid | Clé primaire, identique à l'`id` du compte dans `auth.users` |
| `prenom` | texte | Prénom, de 1 à 50 caractères |
| `nom` | texte | Nom, de 1 à 50 caractères |
| `date_creation` | date et heure | Date d'ouverture du compte |

### `passkeys`

Les passkeys enregistrées. Un client peut en avoir plusieurs : téléphone, ordinateur, clé USB.

| Colonne | Type | Description |
| --- | --- | --- |
| `id` | entier | Clé primaire, générée automatiquement |
| `client_id` | uuid | Client propriétaire (référence `clients.id`) |
| `identifiant_webauthn` | texte | Identifiant aléatoire du client, remis à l'appareil. Jamais le courriel |
| `identifiant_passkey` | texte | Identifiant de la passkey, choisi par l'appareil. Unique |
| `cle_publique` | texte | Clé publique qui sert à vérifier les signatures. La clé privée ne quitte jamais l'appareil |
| `compteur_signatures` | entier | Augmente à chaque utilisation sur certains appareils ; un recul signale un possible clonage |
| `transports` | liste de textes | Moyens de communication de l'appareil (ex. : `internal`, `hybrid`) |
| `date_creation` | date et heure | Date d'enregistrement de la passkey |
| `date_derniere_utilisation` | date et heure | Date de la dernière connexion avec cette passkey |

### `defis`

Les défis (challenges) en attente. Une fonction Edge ne garde rien en mémoire entre deux appels : le défi envoyé à l'appareil est donc stocké ici, puis **supprimé dès qu'il est utilisé**, ce qui empêche de rejouer une ancienne réponse.

| Colonne | Type | Description |
| --- | --- | --- |
| `id` | uuid | Clé primaire, transmise au navigateur |
| `type` | texte | `inscription` ou `connexion` |
| `valeur` | texte | Le défi aléatoire que l'appareil doit signer |
| `domaine` | texte | Domaine du site pour lequel le défi a été émis |
| `donnees` | JSON | Informations liées, par exemple le prénom et le nom saisis à l'inscription |
| `date_expiration` | date et heure | Au-delà, le défi est refusé |

## Relations

- Un compte `auth.users` a **au plus une** fiche `clients`.
- Une fiche `clients` a **zéro ou plusieurs** `passkeys`.
- Supprimer un compte supprime automatiquement sa fiche et ses passkeys (`on delete cascade`).
- `defis` n'est liée à aucune table : un défi ne vit que le temps d'une inscription ou d'une connexion.

## Sécurité (Row Level Security)

La clé *publishable* de Supabase est visible dans le JavaScript du site : n'importe qui peut interroger l'API. Le RLS est donc activé sur toutes les tables.

| Table | Lecture depuis le navigateur | Écriture depuis le navigateur |
| --- | --- | --- |
| `clients` | Le client connecté, sa propre fiche uniquement | Interdite |
| `passkeys` | Le client connecté, ses propres passkeys uniquement | Interdite |
| `defis` | Interdite | Interdite |

Toutes les écritures passent par la fonction Edge `passkeys`, qui utilise la clé secrète du projet après avoir vérifié la passkey.