import { useContext, useState } from "react";
import styles from "./CircleDropdown.module.css";
import { CircleContext } from "../MainImage/MainImage";

const CircleDropdown = ({ characters, handleClick }) => {
  //const [characters, setCharacters] = useState([]);
  const { posX, posY } = useContext(CircleContext);

  return (
    <div
      className={styles.container}
      style={
        posX !== -1 && posY !== -1
          ? { left: `${posX}px`, top: `${posY}px`, display: "block" }
          : { display: "none" }
      }
      onClick={handleClick}
    >
      <div className={styles.selectedCircle}></div>
      <div className={styles.dropdown}>
        {characters && characters.length > 0 ? (
          <ul className={styles.dropdownList}>
            {characters.map((character) => (
              <li className={styles.character}>{character}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export { CircleDropdown };
