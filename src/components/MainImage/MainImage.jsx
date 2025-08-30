import { useRef, useState, useEffect, createContext } from "react";
import styles from "./MainImage.module.css";
import { CharacterMarker } from "../CharacterMarker/CharacterMarker";
import { CircleDropdown } from "../CircleDropdown/CircleDropdown";
import { getCharactersList } from "./api";

const CircleContext = createContext(null);
const MainImage = () => {
  const [position, setPosition] = useState("");
  const [containerPos, setContainerPos] = useState(null);
  const [imagePos, setImagePos] = useState(null);
  const [circlePos, setCirclePos] = useState(null);
  const [characters, setCharacters] = useState([]);

  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      console.log(`Container top-left corner: (${rect.x}, ${rect.y})`);
      setContainerPos({ x: parseInt(rect.x), y: parseInt(rect.y) });
    }
    getCharactersList().then((characterList) => setCharacters(characterList));
  }, []);

  function initializeImageCoords() {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      console.log(`Image top-left corner: (${rect.x}, ${rect.y})`);
      setImagePos({ x: parseInt(rect.x), y: parseInt(rect.y) });
    }
  }

  function handleImageClick(e) {
    const posX = parseInt(e.clientX);
    const posY = parseInt(e.clientY);

    setPosition(
      `viewport: (${posX}, ${posY}), image: (${posX - imagePos.x}, ${
        posY - imagePos.y
      })`
    );

    const CIRCLE_RADIUS = 25;
    setCirclePos({
      x: posX - containerPos.x - CIRCLE_RADIUS,
      y: posY - containerPos.y - CIRCLE_RADIUS,
    });
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <p className={styles.position}>Clicked coords: {position}</p>
      <img
        className={styles.mainImage}
        src="/characters.png"
        alt="All Naruto characters"
        onClick={handleImageClick}
        ref={imgRef}
        onLoad={initializeImageCoords}
      />
      <CircleContext
        value={
          circlePos
            ? { posX: circlePos.x, posY: circlePos.y }
            : { posX: -1, posY: -1 }
        }
      >
        <CircleDropdown
          characters={characters}
          handleClick={handleImageClick}
        />
      </CircleContext>
      <CharacterMarker name="naruto" posX={500} posY={50} />
    </div>
  );
};

export { MainImage, CircleContext };
