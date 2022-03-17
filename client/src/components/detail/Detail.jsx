import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, deleteDetail,deleteRecipe } from "../../actions";
import styles from "./Detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  const recipeId = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(deleteDetail())
    dispatch(getDetail(recipeId.id));
  }, [dispatch, recipeId.id]);

  function deleteHandler(e) {
    e.preventDefault();
    dispatch(deleteRecipe(recipeId.id));
    alert("Recipe deleted.");
    navigate("/home");
  }

  const myRecipe = useSelector((state) => state.detail);
  return (
    <div className={styles.detailContainer}>
      {myRecipe.length > 0 ? (
        <div>
          <div className={styles.headerGroup}>
            <h1>{myRecipe[0].title}</h1>
            <div className={styles.headerButton}>
              {myRecipe[0].createdInDb && (
                <Link to={`/update-recipe/${recipeId.id}`}>
                  <button className={styles.headerButtonDb}>Update</button>
                </Link>
              )}
              {myRecipe[0].createdInDb && (
                <button
                  className={styles.headerButtonDb}
                  onClick={deleteHandler}
                >
                  Delete
                </button>
              )}
              <Link to="/home">
                <button className={styles.headerButtonStyles}>Home</button>
              </Link>
            </div>
          </div>
          <div className={styles.firstContainer}>
            <img
              src={myRecipe[0].image}
              alt=""
              className={styles.imgContainer}
            />
            <div className={styles.pointsContainer}>
              <p className={styles.pointsText}>
                Score: {myRecipe[0].spoonacularScore}
              </p>
              <p className={styles.pointsText}>
                Health score: {myRecipe[0].healthScore}
              </p>
              <div className={styles.dietsContainer}></div>
              <p className={styles.dietsTitle}>Diets:</p>
              <ul className={styles.dietsList}>
                {myRecipe[0].diets.map((el) => (
                  <li className={styles.dietsText} key={el.name}>
                    - {el.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.infoContainer}>
            <h3 className={styles.infoTitle}>Description</h3>
            <p
              dangerouslySetInnerHTML={{ __html: myRecipe[0].summary }}
              className={styles.descriptionText}
            ></p>
          </div>
          <div className={styles.infoContainer}>
            <h3 className={styles.infoTitle}>Steps</h3>
            <ol className={styles.stepsContainer}>
              {myRecipe[0].steps
                ? myRecipe[0].steps.map((el) => (
                    <li className={styles.stepsText} key={el}>
                      {el}
                    </li>
                  ))
                : <p>Not steps defined.</p>
                  }
            </ol>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
