const API_LINK = "http://localhost:8000/";

export const getCharactersList = async () => {
  const response = await fetch(API_LINK);
  const parsed = await response.json();

  if (!response.ok) {
    throw new Error(parsed.message);
  }
  const token = parsed.token;

  localStorage.setItem("token", token);
  console.log("received from backend: " + JSON.stringify(parsed));

  return parsed.characters;
};
