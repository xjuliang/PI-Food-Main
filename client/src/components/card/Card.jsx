import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

export default function Card({ title, image, diets, id }) {
  return (
    <div className={styles.cardComponent}>
      <img src={image} alt="recipe" className={styles.cardImage} />
      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{title}</h3>

        <div className={styles.cardSubInfo}>
          <div className={styles.dietTypesContainer}>
            <h4 className={styles.dietTypesTitle}>Diets:</h4>
            <div className={styles.dietTypesGroup}>
              {diets.map((el) => {
                return (
                  <p className={styles.dietTypesText} key={el.name}>
                    - {el.name.toUpperCase()}
                  </p>
                );
              })}
            </div>
          </div>

          <div className={styles.buttonPosition}>
            <Link to={"/home/" + id} className={styles.link}>
              <button className={styles.buttonStyles}>More info</button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}
