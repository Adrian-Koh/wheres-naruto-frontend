import { useRef, useState, useEffect } from "react";
import styles from "./MainImage.module.css";
import { CharacterMarker } from "../CharacterMarker/CharacterMarker";

const MainImage = () => {
  const [position, setPosition] = useState("");
  const [containerX, setContainerX] = useState(-1);
  const [containerY, setContainerY] = useState(-1);
  const [imageX, setImageX] = useState(-1);
  const [imageY, setImageY] = useState(-1);
  const [circleX, setCircleX] = useState(-1);
  const [circleY, setCircleY] = useState(-1);
  const containerRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      console.log(`Container top-left corner: (${rect.x}, ${rect.y})`);
      setContainerX(parseInt(rect.x));
      setContainerY(parseInt(rect.y));
    }
  }, []);

  function initializeImageCoords() {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      console.log(`Image top-left corner: (${rect.x}, ${rect.y})`);
      setImageX(parseInt(rect.x));
      setImageY(parseInt(rect.y));
    }
  }

  function handleImageClick(e) {
    const posX = parseInt(e.clientX);
    const posY = parseInt(e.clientY);

    setPosition(
      `viewport: (${posX}, ${posY}), image: (${posX - imageX}, ${
        posY - imageY
      })`
    );

    const CIRCLE_RADIUS = 25;
    setCircleX(posX - containerX - CIRCLE_RADIUS);
    setCircleY(posY - containerY - CIRCLE_RADIUS);
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
      <div
        className={styles.selectedCircle}
        style={
          circleX !== -1 && circleY !== -1
            ? { left: `${circleX}px`, top: `${circleY}px`, display: "block" }
            : { display: "none" }
        }
        onClick={handleImageClick}
      ></div>
      <CharacterMarker name="naruto" posX={500} posY={50} />
    </div>
  );
};

export { MainImage };
