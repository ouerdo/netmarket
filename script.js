/* =============================================================
   NetMarket : comportements de la page d'accueil
   1) Les données (produits, techniciens)
   2) L'affichage des cartes à partir des données
   3) Les interactions (onglets, menu mobile, recherche)
   ============================================================= */

/* ---------- 1) Données ----------
   Pour l'instant, ce sont des exemples écrits à la main.
   Plus tard, ces listes viendront d'une base de données :
   seule cette partie changera, l'affichage restera le même. */

const PRODUITS = [
  { categorie: 'router',  nom: 'hAP ax²',                 modele: 'C52iG-5HaxD2HaxD-TC', type: 'Routeur Wi-Fi 6',         prix: 78000,  etat: 'Neuf',     vendeur: 'Faso Réseaux',        ville: 'Ouagadougou',    stock: 'En stock' },
  { categorie: 'switch',  nom: 'Cloud Router Switch 326', modele: 'CRS326-24G-2S+RM',    type: 'Switch 24 ports',         prix: 155000, etat: 'Neuf',     vendeur: 'TechImport BF',       ville: 'Ouagadougou',    stock: 'En stock' },
  { categorie: 'antenne', nom: 'LHG 5 ac',                modele: 'LHGG-5acD',           type: 'Antenne 5 GHz',           prix: 42000,  etat: 'Neuf',     vendeur: 'Sahel Connect',       ville: 'Bobo-Dioulasso', stock: '3 unités' },
  { categorie: 'router',  nom: 'RB4011 rack',             modele: 'RB4011iGS+RM',        type: 'Routeur 10 ports',        prix: 95000,  etat: 'Occasion', vendeur: 'Kaboré Informatique', ville: 'Koudougou',      stock: 'En stock' },
  { categorie: 'wifi',    nom: 'cAP ax',                  modele: 'cAPGi-5HaxD2HaxD',    type: "Point d'accès plafond",   prix: 72000,  etat: 'Neuf',     vendeur: 'Faso Réseaux',        ville: 'Ouagadougou',    stock: 'En stock' },
  { categorie: 'switch',  nom: 'CSS610 8 ports',          modele: 'CSS610-8G-2S+IN',     type: 'Switch 8 ports',          prix: 68000,  etat: 'Occasion', vendeur: 'NetPro Bamako',       ville: 'Bamako',         stock: '1 unité' },
  { categorie: 'antenne', nom: 'SXTsq 5 ac',              modele: 'RBSXTsqG-5acD',       type: 'Antenne CPE 5 GHz',       prix: 39000,  etat: 'Neuf',     vendeur: 'Sahel Connect',       ville: 'Bobo-Dioulasso', stock: 'En stock' },
  { categorie: 'wifi',    nom: 'wAP ax',                  modele: 'wAPG-5HaxD2HaxD',     type: "Point d'accès extérieur", prix: 81000,  etat: 'Neuf',     vendeur: 'TechImport BF',       ville: 'Ouagadougou',    stock: 'Sur commande' }
];

const TECHNICIENS = [
  { nom: 'Ousmane Sawadogo', ville: 'Ouagadougou',    certifs: ['MTCNA', 'MTCRE'],  specialites: ['Hotspot', 'VPN'],            note: '4,9', avis: 87, reponse: '~10 min', tarif: 15000 },
  { nom: 'Aminata Traoré',   ville: 'Bobo-Dioulasso', certifs: ['MTCNA', 'MTCWE'],  specialites: ['Wi-Fi hôtel', 'Formation'],  note: '4,9', avis: 54, reponse: '~20 min', tarif: 20000 },
  { nom: 'Ibrahim Kaboré',   ville: 'Ouagadougou',    certifs: ['MTCNA'],           specialites: ['Point à point', 'WISP'],     note: '4,8', avis: 63, reponse: '~30 min', tarif: 25000 },
  { nom: 'Moussa Ouédraogo', ville: 'Koudougou',      certifs: ['MTCNA', 'MTCTCE'], specialites: ['Maintenance', 'Cybercafé'],  note: '4,8', avis: 41, reponse: '~15 min', tarif: 12000 }
];

// Nombre de produits affichés sur l'accueil
const NB_PRODUITS_ACCUEIL = 4;


/* ---------- 2) Affichage ---------- */

// 78000 devient « 78 000 » (format français, espace des milliers)
function formaterPrix(nombre) {
  return nombre.toLocaleString('fr-FR').replace(/ /g, ' ');
}

// Construit le HTML d'une carte produit à partir d'un objet produit.
// Les `backticks` permettent d'insérer des variables avec ${...}
function carteProduit(p) {
  const classeEtat = p.etat === 'Neuf' ? 'product__state--new' : 'product__state--used';
  return `
    <article class="card product">
      <div class="product__photo placeholder mono">
        <span class="product__state ${classeEtat}">${p.etat}</span>
        photo · ${p.nom}
      </div>
      <div class="product__body">
        <div>
          <div class="product__cat">${p.type}</div>
          <h3 class="product__name">${p.nom}</h3>
          <div class="product__model mono">${p.modele}</div>
        </div>
        <div class="product__price">${formaterPrix(p.prix)} <small>FCFA</small></div>
        <div class="product__meta">
          <span class="product__seller">${p.vendeur}<span class="icon icon--filled verified">verified</span></span>
          <span><span class="icon">location_on</span>${p.ville} · ${p.stock}</span>
        </div>
        <a href="#" class="btn btn--whatsapp"><span class="icon">chat</span>WhatsApp</a>
      </div>
    </article>`;
}

function carteTechnicien(t) {
  // .map() transforme chaque certification en badge, .join('') colle le tout
  const badges = t.certifs.map(c => `<span class="cert mono">${c}</span>`).join('');
  const tags = t.specialites.map(s => `<span class="tag">${s}</span>`).join('');
  return `
    <article class="card tech">
      <div class="tech__head">
        <span class="tech__photo placeholder mono">photo</span>
        <div>
          <h3 class="tech__name">${t.nom}<span class="icon icon--filled verified">verified</span></h3>
          <div class="tech__city"><span class="icon">location_on</span>${t.ville}</div>
        </div>
      </div>
      <div class="tech__tags">${badges}${tags}</div>
      <div class="tech__stats">
        <span><span class="star">★</span> <strong>${t.note}</strong> (${t.avis} avis)</span>
        <span class="tech__resp"><span class="icon">bolt</span>${t.reponse}</span>
      </div>
      <div class="tech__foot">
        <div class="tech__rate"><small>À partir de</small><strong>${formaterPrix(t.tarif)} FCFA</strong></div>
        <div class="tech__contact">
          <a href="#" class="tech__call" aria-label="Appeler ${t.nom}"><span class="icon">call</span></a>
          <a href="#" class="btn btn--whatsapp"><span class="icon">chat</span>WhatsApp</a>
        </div>
      </div>
    </article>`;
}

// Affiche les produits d'une catégorie ('all' = toutes)
function afficherProduits(filtre) {
  const liste = PRODUITS
    .filter(p => filtre === 'all' || p.categorie === filtre)
    .slice(0, NB_PRODUITS_ACCUEIL);
  document.getElementById('products-grid').innerHTML = liste.map(carteProduit).join('');
}

function afficherTechniciens() {
  document.getElementById('techs-grid').innerHTML = TECHNICIENS.map(carteTechnicien).join('');
}


/* ---------- 3) Interactions ---------- */

// Onglets « Tous / Routeurs / Switches… »
function activerOnglets() {
  const onglets = document.querySelectorAll('.tab');
  onglets.forEach(onglet => {
    onglet.addEventListener('click', () => {
      // On désélectionne tout, puis on sélectionne celui cliqué
      onglets.forEach(o => o.setAttribute('aria-selected', 'false'));
      onglet.setAttribute('aria-selected', 'true');
      afficherProduits(onglet.dataset.filter); // data-filter="router" → "router"
    });
  });
}

// Bouton burger du menu mobile
function activerMenuMobile() {
  const bouton = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const icone = bouton.querySelector('.icon');

  function fermer() {
    menu.hidden = true;
    bouton.setAttribute('aria-expanded', 'false');
    bouton.setAttribute('aria-label', 'Ouvrir le menu');
    icone.textContent = 'menu';
  }

  bouton.addEventListener('click', () => {
    const ouvert = !menu.hidden;
    if (ouvert) {
      fermer();
    } else {
      menu.hidden = false;
      bouton.setAttribute('aria-expanded', 'true');
      bouton.setAttribute('aria-label', 'Fermer le menu');
      icone.textContent = 'close';
    }
  });

  // Un clic sur un lien du menu le referme
  menu.querySelectorAll('a').forEach(lien => lien.addEventListener('click', fermer));
}

// Recherche : pas encore de catalogue, on empêche juste le rechargement
function activerRecherche() {
  document.getElementById('search-form').addEventListener('submit', evenement => {
    evenement.preventDefault();
  });
  // La loupe du menu mobile remonte vers la barre de recherche
  document.getElementById('mobile-search').addEventListener('click', () => {
    const champ = document.getElementById('search-input');
    champ.scrollIntoView({ behavior: 'smooth', block: 'center' });
    champ.focus({ preventScroll: true });
  });
}


/* ---------- Démarrage ---------- */
afficherProduits('all');
afficherTechniciens();
activerOnglets();
activerMenuMobile();
activerRecherche();
