import styles from "./CharacterMarker.module.css";

const CharacterMarker = ({ name, posX, posY }) => {
  return (
    <div
      className={styles.marker}
      style={{ left: posX + "px", top: posY + "px" }}
    >
      <p className={styles.name}>{name}</p>
      <p className={styles.arrow}>&#x25BC;</p>
    </div>
  );
};

export { CharacterMarker };
