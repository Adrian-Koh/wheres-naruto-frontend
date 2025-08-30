import { useContext } from "react";
import styles from "./CircleDropdown.module.css";
import { CircleContext } from "../MainImage/MainImage";

const CIRCLE_RADIUS = 25;
const CircleDropdown = ({ characters, handleClick, handleCharacterClick }) => {
  const { posX, posY } = useContext(CircleContext);

  return (
    <div
      className={styles.container}
      style={
        posX !== -1 && posY !== -1
          ? {
              left: `${posX - CIRCLE_RADIUS}px`,
              top: `${posY - CIRCLE_RADIUS}px`,
              display: "block",
            }
          : { display: "none" }
      }
    >
      <div className={styles.selectedCircle} onClick={handleClick}></div>
      <div className={styles.dropdown}>
        {characters && characters.length > 0 ? (
          <ul className={styles.dropdownList}>
            {characters.map((character) => (
              <li
                key={character}
                className={styles.character}
                onClick={(e) => handleCharacterClick(e, character)}
              >
                {character}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export { CircleDropdown };
