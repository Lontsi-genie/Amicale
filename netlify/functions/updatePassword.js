const fs = require("fs");
const path = require("path");

exports.handler = async function(event, context) {
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
        body: JSON.stringify({ error: "Mot de passe invalide" })
      };
    }

    const filePath = path.join(__dirname, "../../password.json");

    fs.writeFileSync(filePath, JSON.stringify({ password }, null, 2), "utf8");

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Mot de passe mis à jour avec succès !" })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erreur serveur : " + error.message })
    };
  }
};
