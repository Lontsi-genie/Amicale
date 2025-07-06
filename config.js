// config.js
// Version avec JSONBin.io (accès dynamique)

const JSONBIN_URL = "https://api.jsonbin.io/v3/b/686a9bbd8960c979a5b81842/latest"; // C'est le NOUVEL ID du bin
const JSONBIN_API_KEY = "$2a$10$N2Z/S6fvmG9oTVs0Wsi0g.qQhisn.z0y1RuepOk5nnM8YJKDy.Qrm"; // Ta clé API Master

async function getPassword() {
  try {
    const response = await fetch(JSONBIN_URL, {
      headers: {
        'X-Master-Key': JSONBIN_API_KEY
      }
    });

    if (!response.ok) throw new Error("Erreur de récupération du mot de passe.");


    const data = await response.json();
    return data.record.password;
  } catch (error) {
    console.error("Erreur lors de la récupération du mot de passe :", error);
    return null;
  }
}
