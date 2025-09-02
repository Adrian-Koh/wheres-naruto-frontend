const API_LINK = "http://localhost:8000/score";
import { getTokenHeader } from "../token/token";

export const submitHighScore = async (playername) => {
  const tokenHeader = getTokenHeader();
  const response = await fetch(API_LINK, {
    method: "POST",
    headers: { ...tokenHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ playername }),
  });
  const parsed = await response.json();

  if (!response.ok) {
    throw new Error(parsed.message);
  }

  return parsed;
};
