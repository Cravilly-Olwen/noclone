// Fonction Edge « passkeys », le serveur de Noclone pour les passkeys.

// Sites autorisés à appeler la fonction.
// Définis dans Supabase > Edge Functions > Secrets, séparés par des virgules.
const sitesAutorises = (Deno.env.get('SITES_AUTORISES') ?? '')
  .split(',')
  .map((site) => site.trim());

Deno.serve(async (requete) => {
  // Adresse du site qui appelle la fonction.
  const site = requete.headers.get('Origin');

  // Un site absent de la liste est refusé immédiatement.
  if (!sitesAutorises.includes(site)) {
    return new Response('Site non autorisé', { status: 403 });
  }

  // En-têtes CORS, nécessaires car le site et la fonction sont sur deux domaines différents.
  // Le navigateur ne transmet la réponse que si la fonction autorise ce site.
  const entetes = {
    'Access-Control-Allow-Origin': site,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  // Avant le vrai appel, le navigateur demande la permission avec une requête OPTIONS.
  if (requete.method === 'OPTIONS') {
    return new Response(null, { headers: entetes });
  }

  // Lecture des données envoyées par le site.
  const corps = await requete.json().catch(() => ({}));

  // Réponse de test, qui renvoie l'action reçue pour confirmer l'aller-retour.
  const reponse = { message: 'Fonction passkeys opérationnelle', action: corps.action };

  return new Response(JSON.stringify(reponse), {
    headers: { ...entetes, 'Content-Type': 'application/json' },
  });
});