import { useContext } from "react";
import styles from "./CharacterMarker.module.css";
import { MarkerContext } from "../MainImage/MainImage";
const LENGTH = 80;
const HEIGHT = 60;

const CharacterMarker = ({ name, posX, posY }) => {
  const handleImageClick = useContext(MarkerContext);
  return (
    <div
      className={styles.marker}
      style={{
        left: posX - LENGTH / 2 + "px",
        top: posY - parseInt(HEIGHT * 1.5) + 5 + "px",
      }}
      onClick={handleImageClick}
    >
      <p className={styles.name}>{name}</p>
      <p className={styles.arrow}>&#x25BC;</p>
    </div>
  );
};

export { CharacterMarker };
