import { useState } from "react";
import styles from "./HighScores.module.css";
import { submitHighScore } from "./highscore";
const HighScores = ({
  playerScore,
  highScores,
  askForName = false,
  setAskForName,
  setDisplayBoard,
  setHighScores,
}) => {
  const [playername, setPlayername] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    const submitHighScoreCb = async () => {
      const highScores = await submitHighScore(playername);
      setHighScores(highScores);
      setAskForName(false);
    };

    submitHighScoreCb();
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <h2 className={styles.scoreboardTitle}>High Scores</h2>
        <button
          className={styles.closeBtn}
          onClick={() => setDisplayBoard(false)}
        >
          &#x274C;
        </button>
      </div>

      {highScores && highScores.length > 0 ? (
        <div className={styles.scoreboard}>
          <div className={styles.header}>Rank</div>
          <div className={styles.header}>Player name</div>
          <div className={styles.header}>Time (s)</div>
          {highScores.map((highScore) => (
            <>
              <div className={styles.standing}>
                {highScores.findIndex(
                  (score) => score.playername === highScore.playername
                ) + 1}
              </div>
              <div className={styles.name}>{highScore.playername}</div>
              <div className={styles.score}>
                {(highScore.scoretime / 1000).toFixed(3)}
              </div>
            </>
          ))}
        </div>
      ) : null}
      {askForName ? (
        <>
          <h3 className={styles.scoreMessage}>
            Congratulations! Your score of {playerScore} seconds is one of the
            top scores of the game. Enter your name to be on the Wall of Fame!
          </h3>
          <form className={styles.form} onSubmit={onSubmit}>
            <label htmlFor="name">
              Name:{" "}
              <input
                type="text"
                id="name"
                value={playername}
                className={styles.nameInput}
                onChange={(e) => setPlayername(e.target.value)}
              ></input>
            </label>
            <input className={styles.submit} type="submit" />
          </form>
        </>
      ) : (
        <h3 className={styles.scoreMessage}>
          You completed the game in {playerScore}s.
        </h3>
      )}
    </div>
  );
};

export { HighScores };
