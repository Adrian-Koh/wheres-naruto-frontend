import { useContext } from "react";
import styles from "./CircleDropdown.module.css";
import { CircleContext } from "../MainImage/MainImage";

const CIRCLE_RADIUS = 25;
const CircleDropdown = () => {
  const {
    posX,
    posY,
    flexDirection,
    characters,
    handleClick,
    handleCharacterClick,
  } = useContext(CircleContext);

  // TODO: clicking on character in row flex doesn't send correct coords
  return (
    <div
      className={styles.container}
      style={
        posX !== -1 && posY !== -1
          ? {
              left: `${posX - CIRCLE_RADIUS}px`,
              top: `${posY - CIRCLE_RADIUS}px`,
              display: "flex",
              flexDirection: flexDirection,
            }
          : { display: "none" }
      }
    >
      <div
        className={styles.circleContainer}
        onClick={handleClick}
        style={
          flexDirection === "row"
            ? {
                alignContent: "flex-end",
                height: 20 * characters.length + "px",
                width: "50px",
              }
            : { width: "100%" }
        }
      >
        <div className={styles.selectedCircle}></div>
      </div>
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
