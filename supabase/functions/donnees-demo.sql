-- T03, données de démonstration
-- À exécuter une fois dans Supabase > SQL Editor, après schema.sql.
-- Crée les comptes bancaires et leurs opérations, puis remplit automatiquement
-- chaque nouveau client avec un mois de données fictives.

-- 1. Comptes bancaires d'un client (chèques, épargne)
create table public.comptes (
    id             uuid        primary key default gen_random_uuid(),
    client_id      uuid        not null references public.clients (id) on delete cascade,
    type           text        not null check (type in ('cheque', 'epargne')),
    nom            text        not null,
    date_creation  timestamptz not null default now()
);
create index comptes_client_id_idx on public.comptes (client_id);

-- 2. Opérations d'un compte, qui forment son historique et son solde
-- Montant en cents, pour éviter les erreurs d'arrondi des nombres à virgule.
-- Positif pour une entrée d'argent, négatif pour une sortie.
-- Le solde d'un compte est la somme de ses opérations.
create table public.operations (
    id              bigint      generated always as identity primary key,
    compte_id       uuid        not null references public.comptes (id) on delete cascade,
    libelle         text        not null,
    montant_cents   bigint      not null check (montant_cents <> 0),
    categorie       text,
    date_operation  timestamptz not null default now()
);
create index operations_compte_id_idx on public.operations (compte_id);

-- Row Level Security
-- Un client connecté lit seulement ses propres comptes et opérations.
-- Aucune règle d'écriture, donc rien ne peut être modifié depuis le navigateur.
alter table public.comptes    enable row level security;
alter table public.operations enable row level security;

create policy "Un client lit ses propres comptes"
    on public.comptes for select to authenticated
    using ((select auth.uid()) = client_id);

create policy "Un client lit les opérations de ses comptes"
    on public.operations for select to authenticated
    using (compte_id in (select id from public.comptes where client_id = (select auth.uid())));

-- 3. Données de démonstration
-- Fonction appelée automatiquement à la création d'une fiche client (voir le déclencheur plus bas).
-- Elle ouvre un compte chèques et un compte épargne avec un mois d'historique fictif.
-- « security definer » lui permet d'écrire malgré le RLS.
-- « search_path » fixé empêche de la détourner vers d'autres tables.
create function public.creer_donnees_demo()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    cheque  uuid;
    epargne uuid;
begin
    insert into comptes (client_id, type, nom) values (new.id, 'cheque', 'Compte chèques')
        returning id into cheque;
    insert into comptes (client_id, type, nom) values (new.id, 'epargne', 'Compte épargne')
        returning id into epargne;

    -- Montants en cents, par exemple 148735 = 1 487,35 $
    insert into operations (compte_id, libelle, montant_cents, categorie, date_operation) values
        (cheque,  'Solde reporté (démo)',          124560, 'Ouverture',    now() - interval '30 days'),
        (cheque,  'Paie',                          148735, 'Revenu',       now() - interval '29 days'),
        (cheque,  'Loyer',                         -89500, 'Logement',     now() - interval '29 days'),
        (cheque,  'Épicerie',                      -14287, 'Alimentation', now() - interval '26 days'),
        (cheque,  'Électricité',                    -8412, 'Factures',     now() - interval '24 days'),
        (cheque,  'Essence',                        -6840, 'Transport',    now() - interval '22 days'),
        (cheque,  'Internet',                       -6499, 'Factures',     now() - interval '20 days'),
        (cheque,  'Restaurant',                     -4725, 'Loisirs',      now() - interval '18 days'),
        (cheque,  'Paie',                          148735, 'Revenu',       now() - interval '15 days'),
        (cheque,  'Virement vers l''épargne',      -20000, 'Épargne',      now() - interval '15 days'),
        (cheque,  'Épicerie',                      -12854, 'Alimentation', now() - interval '12 days'),
        (cheque,  'Forfait cellulaire',             -5500, 'Factures',     now() - interval '10 days'),
        (cheque,  'Abonnement de diffusion',        -1839, 'Loisirs',      now() - interval '9 days'),
        (cheque,  'Pharmacie',                      -2347, 'Santé',        now() - interval '7 days'),
        (cheque,  'Remboursement d''un ami',         3000, 'Virement',     now() - interval '6 days'),
        (cheque,  'Essence',                        -7115, 'Transport',    now() - interval '4 days'),
        (cheque,  'Café',                            -575, 'Alimentation', now() - interval '1 day'),
        (epargne, 'Solde reporté (démo)',          486000, 'Ouverture',    now() - interval '30 days'),
        (epargne, 'Virement du compte chèques',     20000, 'Épargne',      now() - interval '15 days'),
        (epargne, 'Intérêts',                         812, 'Revenu',       now() - interval '1 day');

    return new;
end;
$$;

-- Personne ne peut appeler cette fonction directement, seul le déclencheur l'utilise.
revoke execute on function public.creer_donnees_demo() from public, anon, authenticated;

-- Déclencheur qui donne à chaque nouvelle fiche client ses comptes de démonstration.
create trigger donnees_demo
    after insert on public.clients
    for each row execute function public.creer_donnees_demo();