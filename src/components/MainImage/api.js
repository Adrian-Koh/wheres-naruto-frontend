const API_LINK = "http://localhost:8000/";
import { jwtDecode } from "jwt-decode";
import { getTokenHeader } from "../token/token";

export const getCharactersList = async () => {
  const response = await fetch(API_LINK);
  const parsed = await response.json();

  if (!response.ok) {
    throw new Error(parsed.message);
  }
  const token = parsed.token;

  localStorage.setItem("token", token);

  return parsed.characters;
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
      complete: false,
      message: "character chosen was correct.",
      remainingCharacters: decoded.remainingCharacters,
    };
  } else if (result === "false") {
    return { complete: false, message: parsed.message };
  } else if (result === "complete") {
    if (parsed.isHighScore) {
      // save token
      localStorage.setItem("token", parsed.token);
    }
    return {
      complete: true,
      message: parsed.message,
      isHighScore: parsed.isHighScore,
      highScores: parsed.highScores,
    };
  }
};
