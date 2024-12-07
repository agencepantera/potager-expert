document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      
      // Mettre à jour l'état du bouton
      menuButton.setAttribute('aria-expanded', !isExpanded);
      
      // Afficher/masquer le menu
      mobileMenu.classList.toggle('hidden');
      
      // Annoncer le changement d'état aux technologies d'assistance
      const menuState = !isExpanded ? 'ouvert' : 'fermé';
      menuButton.setAttribute('aria-label', `Menu principal (${menuState})`);
    });

    // Gérer la fermeture avec la touche Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        menuButton.click();
      }
    });

    // Fermer le menu en cliquant en dehors
    document.addEventListener('click', (e) => {
      if (menuButton.getAttribute('aria-expanded') === 'true' &&
          !menuButton.contains(e.target) &&
          !mobileMenu.contains(e.target)) {
        menuButton.click();
      }
    });
  }
});
