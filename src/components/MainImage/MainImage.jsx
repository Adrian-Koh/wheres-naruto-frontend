import { useRef, useState, useEffect, createContext } from "react";
import styles from "./MainImage.module.css";
import { CharacterMarker } from "../CharacterMarker/CharacterMarker";
import { CircleDropdown } from "../CircleDropdown/CircleDropdown";
import { HighScores } from "../HighScores/HighScores";
import { getCharactersList, registerImageClick } from "./api";

const CircleContext = createContext(null);
const CIRCLE_RADIUS = 25;
const dropdownHeight = (charactersLength) => {
  return 5 + 20 * charactersLength; // margin = 5px, height of one character list item = 20px
};

const MainImage = () => {
  const [position, setPosition] = useState("");
  const [containerPos, setContainerPos] = useState(null);
  const [imagePos, setImagePos] = useState(null);
  const [circlePos, setCirclePos] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [displayBoard, setDisplayBoard] = useState(false);
  const [askForName, setAskForName] = useState(false);
  const [playerScore, setPlayerScore] = useState(-1);
  const [highScores, setHighScores] = useState([]);
  const [identifiedCharacters, setIdentifiedCharacters] = useState([]);
  const [circleFlexDirection, setCircleFlexDirection] = useState("column");

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
      console.log(`imagePos x:${rect.x}, y:${rect.y}`);

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

    if (
      // posY - containerPos.y to get clicked coords in viewport,
      // + CIRCLE_RADIUS * 2 to include circle height,
      // + dropdownHeight to include dropdown height
      posY -
        containerPos.y +
        CIRCLE_RADIUS * 2 +
        dropdownHeight(characters.length) >
      window.innerHeight
    ) {
      // change to row flex direction if CircleDropdown height overflows
      setCircleFlexDirection("row");
    } else {
      setCircleFlexDirection("column");
    }

    setCirclePos({
      x: posX - containerPos.x,
      y: posY - containerPos.y,
    });
  }

  function handleCharacterClick(e, character) {
    const handleCharacterClickCb = async () => {
      const result = await registerImageClick(
        character,
        circlePos.x - imagePos.x + containerPos.x,
        circlePos.y - imagePos.y + containerPos.y
      );

      if (result.characterPosition) {
        setIdentifiedCharacters([
          ...identifiedCharacters,
          result.characterPosition,
        ]);
      }

      if (result.complete) {
        setAskForName(result.isHighScore);
        setPlayerScore(result.score);
        setHighScores(result.highScores);
        setDisplayBoard(true);
        setCharacters([]);
      } else if (result.remainingCharacters) {
        setCharacters(result.remainingCharacters);
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
            ? {
                posX: circlePos.x,
                posY:
                  circleFlexDirection === "row"
                    ? circlePos.y -
                      dropdownHeight(characters.length) +
                      CIRCLE_RADIUS * 2
                    : circlePos.y,
                flexDirection: circleFlexDirection,
                handleClick: handleImageClick,
                characters: characters,
                handleCharacterClick: handleCharacterClick,
              }
            : {
                posX: -1,
                posY: -1,
                flexDirection: circleFlexDirection,
                handleClick: handleImageClick,
                characters: characters,
                handleCharacterClick: handleCharacterClick,
              }
        }
      >
        <CircleDropdown />
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
          playerScore={playerScore}
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
