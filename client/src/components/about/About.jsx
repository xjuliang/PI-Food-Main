import React from "react";
import styles from "./About.module.css";
import { Link } from "react-router-dom";
import githubLogo from "../../images/github.svg";
import linkedinLogo from "../../images/linkedin.svg";

export default function About() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>About me</h1>
          <a href="https://github.com/xjuliang">
            <img src={githubLogo} alt="github" className={styles.githubLogo} />
          </a>
          <a href="https://www.linkedin.com/in/juli%C3%A1n-marcos-gonz%C3%A1lez-354403201/">
            <img src={linkedinLogo} alt="linkedin" className={styles.linkedinLogo}/>
          </a>
          <div className={styles.buttonPosition}>
            <Link to="/home">
              <button className={styles.homeButton}>Home</button>
            </Link>
          </div>
        </div>

        <p className={styles.infoText}>
          My name is Julian Gonzalez, I am from Buenos Aires, Argentina. Today I
          find myself in the journey to became a Full-Stack Web Developer. I
          decided to be part of SoyHenry, a bootcamp where we learn technologies
          like JavaScript, ReactJs, Redux, NodeJs, Express, PostgreSQL,
          Sequelize and more.
        </p>

        <h2 className={styles.projectTitle}>More info about the project</h2>
        <p className={styles.projectInfo}>
          This is an individual project I developed to put in practise all the
          knowledge in Front-end and Back-end I have gained at the bootcamp. The
          idea was to create a page using data about food recipes from the
          Sponacular API.
        </p>
      </div>
    </div>
  );
}
