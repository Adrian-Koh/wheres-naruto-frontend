import styles from "./MainImage.module.css";

const MainImage = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.mainImage}
        src="/characters.png"
        alt="All Naruto characters"
      />
    </div>
  );
};

export { MainImage };
