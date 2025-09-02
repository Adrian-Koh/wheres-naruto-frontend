import { useRef, useState, useEffect, createContext } from "react";
import styles from "./MainImage.module.css";
import { CharacterMarker } from "../CharacterMarker/CharacterMarker";
import { CircleDropdown } from "../CircleDropdown/CircleDropdown";
import { HighScores } from "../HighScores/HighScores";
import { getCharactersList, registerImageClick } from "./api";

const CircleContext = createContext(null);
const MainImage = () => {
  const [position, setPosition] = useState("");
  const [containerPos, setContainerPos] = useState(null);
  const [imagePos, setImagePos] = useState(null);
  const [circlePos, setCirclePos] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [displayBoard, setDisplayBoard] = useState(false);
  const [askForName, setAskForName] = useState(false);
  const [highScores, setHighScores] = useState([]);
  const [identifiedCharacters, setIdentifiedCharacters] = useState([]);

  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerPos({ x: parseInt(rect.x), y: parseInt(rect.y) });
    }
    getCharactersList().then((characterList) => setCharacters(characterList));
  }, []);

  function initializeImageCoords() {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
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

    setCirclePos({
      x: posX - containerPos.x,
      y: posY - containerPos.y,
    });
  }

  function handleCharacterClick(e, character) {
    const handleCharacterClickCb = async () => {
      const result = await registerImageClick(
        character,
        circlePos.x - imagePos.x,
        circlePos.y - imagePos.y
      );
      // set character marker

      setIdentifiedCharacters([
        ...identifiedCharacters,
        result.characterPosition,
      ]);
      if (result.complete) {
        // TODO: have separate cases for top 10 and no top 10
        setAskForName(result.isHighScore);
        setHighScores(result.highScores);
        setDisplayBoard(true);
        setCharacters([]);
      } else {
        if (result.remainingCharacters) {
          setCharacters(result.remainingCharacters);
        }
      }

      setCirclePos({ x: -1, y: -1 });
    };
    handleCharacterClickCb();
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
          handleCharacterClick={handleCharacterClick}
        />
      </CircleContext>
      {identifiedCharacters && identifiedCharacters.length > 0
        ? identifiedCharacters.map((character) => {
            return (
              <CharacterMarker
                name={character.name}
                posX={character.x - containerPos.x + imagePos.x}
                posY={character.y - containerPos.y + imagePos.y}
              />
            );
          })
        : null}
      {displayBoard ? (
        <HighScores
          highScores={highScores}
          setHighScores={setHighScores}
          askForName={askForName}
          setDisplayBoard={setDisplayBoard}
          setAskForName={setAskForName}
        />
      ) : null}
    </div>
  );
};

export { MainImage, CircleContext };
