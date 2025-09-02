import styles from "./CharacterMarker.module.css";
const LENGTH = 60;

const CharacterMarker = ({ name, posX, posY }) => {
  return (
    <div
      className={styles.marker}
      style={{
        left: posX - LENGTH / 2 + "px",
        top: posY - parseInt(LENGTH * 1.5) + 5 + "px",
      }}
    >
      <p className={styles.name}>{name}</p>
      <p className={styles.arrow}>&#x25BC;</p>
    </div>
  );
};

export { CharacterMarker };
