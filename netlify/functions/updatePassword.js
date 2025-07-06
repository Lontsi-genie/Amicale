// .netlify/functions/updatePassword.js

const fetch = require("node-fetch");

const BIN_ID = "686a9bbd8960c979a5b81842"; // C'est le NOUVEL ID du bin
const API_KEY = "$2a$10$N2Z/S6fvmG9oTVs0Wsi0g.qQhisn.z0y1RuepOk5nnM8YJKDy.Qrm"; // Ta clé API Master

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
