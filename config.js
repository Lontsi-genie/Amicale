// config.js
// Cette version va chercher le mot de passe depuis password.json

async function getPassword() {
  const response = await fetch('password.json');
  const data = await response.json();
  return data.password;
}
