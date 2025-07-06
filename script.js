// Apparition des éléments au scroll
function revealOnScroll() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 100) {
      el.classList.add('visible');
    }
  });
}

// Bouton retour en haut
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  // Apparition des éléments
  revealOnScroll();

  // Affichage du bouton retour en haut
  if (window.scrollY > 200) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }

  // Highlight de la section active dans la filter-bar
  const sections = document.querySelectorAll('.moment, .contact');
  let current = "";

  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = sec.getAttribute("id");
    }
  });

  document.querySelectorAll('.filter-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Déclencher au chargement
window.addEventListener("load", revealOnScroll);

// LIGHTBOX
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

document.querySelectorAll('.lightbox-trigger').forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  });
});

closeLightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});

async function checkPassword() {
  const input = document.getElementById("password").value.trim();
  const error = document.getElementById("error-msg");

  // Ajoutez la configuration pour JSONBin.io ici
  const JSONBIN_URL_READ = "https://api.jsonbin.io/v3/b/686a9bbd8960c979a5b81842/latest"; // Utilisez /latest pour obtenir la dernière version
  const JSONBIN_API_KEY = "$2a$10$N2Z/S6fvmG9oTVs0Wsi0g.qQhisn.z0y1RuepOk5nnM8YJKDy.Qrm";

  try {
    const response = await fetch(JSONBIN_URL_READ, {
      method: "GET", // On utilise GET pour lire
      headers: {
        "X-Master-Key": JSONBIN_API_KEY,
        "X-Bin-Meta": "false" // Pour récupérer seulement le contenu du bin, sans les métadonnées
      }
    });

    const data = await response.json();

    if (response.ok && data.password) { // Vérifiez que la réponse est OK et que 'password' existe dans les données
      if (input === data.password) {
        window.location.href = "index.html"; // ou whatever your main content page is
      } else {
        error.textContent = "Mot de passe incorrect.";
        error.style.color = "red";
      }
    } else {
      error.textContent = "Erreur lors de la récupération du mot de passe.";
      error.style.color = "red";
      console.error("Erreur JSONBin API:", data);
    }
  } catch (err) {
    console.error("Erreur réseau ou API lors de la lecture:", err);
    error.textContent = "Erreur réseau ou API.";
    error.style.color = "red";
  }
}
