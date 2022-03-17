import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterRecipesName } from "../../actions";
import styles from "./SearchBar.module.css"

export default function SearchBar() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(filterRecipesName(name));
    setName("");
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.searchGroup}>
        <div>
          <input
            type="text"
            value={name}
            placeholder="Search..."
            onChange={(e) => handleInputChange(e)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
