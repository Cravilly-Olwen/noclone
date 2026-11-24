// Page d'accueil : ouverture et fermeture de la pop-up d'inscription.
// La balise <dialog> gère elle-même la touche Échap, le fond grisé et le focus du clavier.

document.addEventListener('click', (evenement) => {
  // Bouton qui ouvre une pop-up : son attribut data-ouvrir contient l'id de la pop-up.
  const boutonOuvrir = evenement.target.closest('[data-ouvrir]');
  if (boutonOuvrir) {
    document.getElementById(boutonOuvrir.dataset.ouvrir).showModal();
    return;
  }

  // Bouton qui ferme la pop-up dans laquelle il se trouve.
  if (evenement.target.closest('[data-fermer]')) {
    evenement.target.closest('dialog').close();
  }
});

// Provisoire, en attendant les passkeys.
// Empêche le rechargement de la page, qui mettrait les données saisies dans l'adresse.
for (const formulaire of document.querySelectorAll('form')) {
  formulaire.addEventListener('submit', (evenement) => {
    evenement.preventDefault();
    formulaire.querySelector('[role="status"]').textContent = 'Bientôt disponible.';
  });
}