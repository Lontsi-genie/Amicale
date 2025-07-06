// .netlify/functions/updatePassword.js

const fetch = require("node-fetch");

const BIN_ID = "686A5BBA8960C979A5B8018B"; // Remplace par ton ID
const API_KEY = "$2a$10$1FmC391QqDBD0/g6KInxuMT1WapHd2XM1D2KAH8HOU6cDHL5h1ce"; // Remplace par ta clé API

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Méthode non autorisée" })
    };
  }

  try {
    const { password } = JSON.parse(event.body);

    if (!password || password.length < 4) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Mot de passe invalide." })
      };
    }

    const updateResponse = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY,
        "X-Bin-Private": "true"
      },
      body: JSON.stringify({ password })
    });

    if (!updateResponse.ok) {
      throw new Error("Échec de mise à jour");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Mot de passe mis à jour avec succès." })
    };
  } catch (err) {
    console.error("Erreur updatePassword.js :", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur serveur." })
    };
  }
};
