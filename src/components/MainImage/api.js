const API_LINK = "https://wheres-naruto.onrender.com/";
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

  const result = parsed.result;
  if (result === "correct") {
    const token = parsed.token;
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);

    return {
      complete: false,
      remainingCharacters: decoded.remainingCharacters,
      characterPosition: parsed.characterPosition,
    };
  } else if (result === "false") {
    return { complete: false };
  } else if (result === "complete") {
    if (parsed.isHighScore) {
      // save token to submit name later on
      localStorage.setItem("token", parsed.token);
    }
    return {
      complete: true,
      isHighScore: parsed.isHighScore,
      score: parsed.score,
      highScores: parsed.highScores,
      characterPosition: parsed.characterPosition,
    };
  }
};
