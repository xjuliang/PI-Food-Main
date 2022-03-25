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
          {pageNumbers?.map((number) => {
            return (
              <li className={styles.paginationElement}  key={number}>
                <button onClick={() => paginado(number)} className={styles.paginationButton}>{number}</button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
