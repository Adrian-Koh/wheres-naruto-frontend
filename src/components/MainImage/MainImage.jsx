import { useRef, useState, useEffect } from "react";
import styles from "./MainImage.module.css";

const MainImage = () => {
  const [position, setPosition] = useState("");
  const [topLeftX, setTopLeftX] = useState(-1);
  const [topLeftY, setTopLeftY] = useState(-1);
  const [circleX, setCircleX] = useState(-1);
  const [circleY, setCircleY] = useState(-1);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      console.log(`Container top-left corner: (${rect.x}, ${rect.y})`);
      setTopLeftX(rect.x);
      setTopLeftY(rect.y);
    }
  }, []);

  function handleImageClick(e) {
    const posX = e.clientX;
    const posY = e.clientY;

    setPosition(`Clicked on viewport coordinates: (${posX}, ${posY})`);

    const CIRCLE_RADIUS = 25;
    setCircleX(posX - topLeftX - CIRCLE_RADIUS);
    setCircleY(posY - topLeftY - CIRCLE_RADIUS);
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <p className={styles.position}>{position}</p>
      <img
        className={styles.mainImage}
        src="/characters.png"
        alt="All Naruto characters"
        onClick={handleImageClick}
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
