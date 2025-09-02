import { useState } from "react";
import styles from "./HighScores.module.css";
import { submitHighScore } from "./highscore";
const HighScores = ({ highScores, askForName = false }) => {
  const [playername, setPlayername] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    console.log("onSubmit playername: " + playername);

    const submitHighScoreCb = async () => {
      const parsed = await submitHighScore(playername);

      console.log("response from highscore POST: " + JSON.stringify(parsed));
    };
    submitHighScoreCb();
  }

  return (
    <div className={styles.container}>
      {highScores && highScores.length > 0 ? (
        <div className={styles.scoreboard}>
          <div className={styles.header}>Player name</div>
          <div className={styles.header}>Time (s)</div>
          {highScores.map((highScore) => (
            <>
              <div className={styles.name}>{highScore.playername}</div>
              <div className={styles.score}>{highScore.scoretime / 1000}</div>
            </>
          ))}
        </div>
      ) : null}
      {askForName ? (
        <form className={styles.form} onSubmit={onSubmit}>
          <label htmlFor="name">
            Name:{" "}
            <input
              type="text"
              id="name"
              value={playername}
              onChange={(e) => setPlayername(e.target.value)}
            ></input>
          </label>
          <input type="submit" />
        </form>
      ) : null}
    </div>
  );
};

export { HighScores };
