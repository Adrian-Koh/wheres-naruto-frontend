import { useRef, useState, useEffect } from "react";
import styles from "./MainImage.module.css";

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
      setContainerX(rect.x);
      setContainerY(rect.y);
    }
  }, []);

  function initializeImageCoords() {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      console.log(`Image top-left corner: (${rect.x}, ${rect.y})`);
      setImageX(rect.x);
      setImageY(rect.y);
    }
  }

  function handleImageClick(e) {
    const posX = e.clientX;
    const posY = e.clientY;

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
            ? { left: circleX, top: circleY, display: "block" }
            : { display: "none" }
        }
      ></div>
    </div>
  );
};

export { MainImage };
