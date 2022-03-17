import React from "react";
import styles from './Pagination.module.css'

export default function Paginado({ recipesPerPage, allRecipes, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div >
      <nav>
        <ul className={styles.paginationGroup}>
        <button onClick={() => paginado(1)} className={styles.paginationButton}>First</button>
          {pageNumbers?.map((number) => {
            return (
              <li className={styles.paginationElement}  key={number}>
                <button onClick={() => paginado(number)} className={styles.paginationButton}>{number}</button>
              </li>
            );
          })}
          <button onClick={() => paginado(pageNumbers.length)} className={styles.paginationButton}>Last</button>
        </ul>
      </nav>
    </div>
  );
}
