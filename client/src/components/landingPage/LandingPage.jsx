import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

export default function LandingPage() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.main}>
        <h1 className={styles.title}>Welcome to Recipes.com</h1>
        <div className={styles.buttonPosition}>
          <p className={styles.sloganText}>Where you can find everything about the best recipes in the world</p>
          <Link to="/home">
            <button className={styles.startButton}>Start</button>
          </Link>
          <p className={styles.developedText}>Developed by Julian Gonzalez</p>
        </div>
      </div>
    </div>
  );
}
