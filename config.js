// config.js
// Version avec JSONBin.io (accès dynamique)

const JSONBIN_URL = "https://api.jsonbin.io/v3/b/686A5BBA8960C979A5B8018B/latest";
const JSONBIN_API_KEY = "$2a$10$1FmC391QqDBD0/g6KInxuMT1WapHd2XM1D2KAH8HOU6cDHL5h1ce";

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