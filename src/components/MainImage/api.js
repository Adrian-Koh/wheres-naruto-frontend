const API_LINK = "http://localhost:8000/";
import { jwtDecode } from "jwt-decode";

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

const getTokenHeader = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token not found.");
  }
  return { authorization: `Bearer ${token}` };
};

export const registerImageClick = async (character, x, y) => {
  const tokenHeader = getTokenHeader();
  const response = await fetch(API_LINK, {
    method: "POST",
    headers: { ...tokenHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ character, x, y }),
  });
  const parsed = await response.json();

  if (!response.ok) {
    throw new Error(parsed.message);
  }
  console.log(
    "parsed response in registerImageClick: " + JSON.stringify(parsed)
  );

  const result = parsed.result;
  if (result === "correct") {
    const token = parsed.token;
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    console.log("Decoded token: " + JSON.stringify(decoded));
    return {
      message: "character chosen was correct.",
      remainingCharacters: decoded.remainingCharacters,
    };
  } else if (result === "false") {
    return { message: parsed.message };
  } else if (result === "complete") {
    return { message: parsed.message };
  }
};
