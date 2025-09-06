const API_LINK = "https://wheres-naruto.onrender.com/score";
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

  // get high scores
  const getHighScoresResponse = await fetch(API_LINK);
  const getHighScoresParsed = await getHighScoresResponse.json();
  if (!getHighScoresResponse.ok) {
    throw new Error(getHighScoresParsed.message);
  }
  return getHighScoresParsed.highScores;
};
