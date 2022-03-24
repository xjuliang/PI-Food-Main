import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getRecipes,getDiets,filterRecipesByType,filterRecipesCreated,orderByName,orderByPoints,} from "../../actions";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import Card from "../card/Card";
import SearchBar from "../searchBar/SearchBar";
import Pagination from "../pagination/Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.filterRecipes);
  const allDiets = useSelector((state) => state.diets);

  //Order
  const [/* order */, setOrder] = useState("");
  const [recipeOrigin, setRecipeOrigin] = useState("all");

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, /* setRecipesPerPage */] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe);
  const [loaded, setLoaded] = useState(false);
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  async function getData() {
    await dispatch(getRecipes());
    await dispatch(getDiets());
    setLoaded(true);
  }

  useEffect(() => {
    getData();
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getRecipes());
    dispatch(getDiets());
  }

  function handleFilterType(e) {
    e.preventDefault();
    dispatch(filterRecipesByType(e.target.value, recipeOrigin));
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    e.preventDefault();
    setRecipeOrigin(e.target.value);
    dispatch(filterRecipesCreated(e.target.value));
    setCurrentPage(1);
  }

  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`${e.target.value} order`);
  }

  function handleSortPoints(e) {
    e.preventDefault();
    dispatch(orderByPoints(e.target.value));
    setCurrentPage(1);
    setOrder(`${e.target.value} order`);
  }

  return (
    <div>
      <div className={styles.navBar}>
        <Link to="/" className={styles.homeLink}>
          <h1 className={styles.homeTitle}>Recipes.com</h1>
        </Link>
        <div className={styles.aboutButton}>
          <Link to="/aboutme">
            <button className={styles.navButton}>About</button>
          </Link>
        </div>
        <button className={styles.navReload} onClick={(e) => {handleClick(e)}}>
          Reload page
        </button>
        <div className={styles.createPosition}>
          <Link to="/create-recipe">
            <button className={styles.navButton}>Create recipe</button>
          </Link>
        </div>
        <SearchBar />
      </div>
      {loaded ? (
        <div>
          <div className={styles.filtersGroup}>
            <h3 className={styles.filtersText}>Filters</h3>
            <div className={styles.selectsGroup}>
              <select name="orderAlphabetic" onChange={(e) => handleSortName(e)} className={styles.selectName}>
                <option>Order by name</option>
                <option value="asc">A-Z</option>
                <option value="des">Z-A</option>
              </select>
              <select name="orderPoints" onChange={(e) => handleSortPoints(e)} className={styles.selectPoints}>
                <option>Order by points</option>
                <option value="asc">Max-Min</option>
                <option value="des">Min-Max</option>
              </select>
              <select onChange={(e) => handleFilterType(e)} className={styles.selectDiets}>
                <option value="all">All</option>
                {allDiets.map((type) => {
                  return (
                    <option value={type.name} key={type.id}>
                      {type.name}
                    </option>
                  );
                })}
              </select>
              <select onChange={(e) => handleFilterCreated(e)} className={styles.selectCreated}>
                <option value="all">All</option>
                <option value="api">Existing</option>
                <option value="created">Created</option>
              </select>
            </div>
          </div>
          <Pagination
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
            paginado={paginado}
          />
          {currentRecipes.length ? (
            <div className={styles.cardGroup}>
              {currentRecipes?.map((e) => {
                return (
                  <div key={e.id}>
                    <Card id={e.id} title={e.title} image={e.image} diets={e.diets} createdInDb={e.createdInDb}/>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className={styles.notFound}>Not recipes found.</p>
          )}
        </div>
      ) : (
        <p className={styles.loading}>Loading...</p>
      )}
    </div>
  );
}
