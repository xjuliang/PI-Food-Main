import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { postRecipe, getDiets, getDetail, updateRecipe } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Form.module.css";
let regExpUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

export default function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recipeId = useParams();
  const globalDiets = useSelector((state) => state.diets);
  const recipeToUpdate = useSelector((state) => state.detail);
  const [input, setInput] = useState({
    title: "",
    summary: "",
    spoonacularScore: 0,
    healthScore: 0,
    image: "",
    steps: "",
    diets: [],
  });
  const [stepsList, setStepsList] = useState([]);
  let [stepCounter, setStepCounter] = useState(0);
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [dispatchDone, setDispatchDone] = useState(false);
  const [detailDone, setDetailDone] = useState(false);
  const [update, setUpdate] = useState(false);

  async function loadData() {
    //para que el dispatch no se haga dos veces cuando carga input.image
    if (!detailDone) {
      await dispatch(getDetail(recipeId.id));
      setDetailDone(true);
    }
    const stepsListDb = [];
    for (let i = 1; i <= recipeToUpdate[0].steps.length; i++) {
      const step = {
        number: [i],
        description: recipeToUpdate[0].steps[i - 1],
      };
      stepsListDb.push(step);
      setStepCounter([i]);
    }
    await setInput({
      title: recipeToUpdate[0].title,
      summary: recipeToUpdate[0].summary,
      spoonacularScore: recipeToUpdate[0].spoonacularScore,
      healthScore: recipeToUpdate[0].healthScore,
      image: recipeToUpdate[0].image,
      diets: [],
    });
    await setStepsList(stepsListDb);
  }

  useEffect(() => {
    async function asyncControl() {
      if (!dispatchDone) {
        await dispatch(getDiets());
        setDispatchDone(true);
      }
      if (recipeId.id && !update) {
        setUpdate(true);
        loadData();
      }
    }
    asyncControl();
    setLoaded(true);
  }, [dispatch, dispatchDone, detailDone]);

  useEffect(() => {
    if (regExpUrl.test(input.image.trim())) {
      setShowImage(true);
    } else if (!regExpUrl.test(input.image.trim())) {
      setShowImage(false);
    }
  }, [input.image]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if (showErrors) {
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  }

  function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        diets: [...input.diets, e.target.value],
      });
    } else {
      setInput({
        ...input,
        diets: input.diets.filter((el) => el !== e.target.value),
      });
    }
  }

  function validate(input) {
    let errors = {};
    if (!input.title) {
      errors.title = "Title is required.";
    }
    if (!/^[A-Z]{5,}$/.test(input.title.toUpperCase())) {
      errors.title = "Title needs 5 characters or more.";
    }
    if (!input.summary) {
      errors.summary = "Description is required.";
    }
    if (!/^[A-Z]{4,}$/.test(input.title.toUpperCase())) {
      errors.title = "Title needs 4 characters or more.";
    }
    if (input.spoonacularScore === 0) {
      errors.spoonacularScore = "Score is required.";
    }
    if (input.healthScore === 0) {
      errors.healthScore = "Health score is required.";
    }
    if (input.diets.length === 0) {
      errors.diets = "At least 1 diet is required";
    }
    if (stepsList.length === 0) {
      errors.steps = "At least 1 step is required.";
    }
    return errors;
  }

  function addStep(e) {
    e.preventDefault();
    const allDescriptions = stepsList.map(step => step.description)
    const findStep = allDescriptions.filter(description => description === input.steps)
    if (findStep.length) {
      alert("Please, do not repeat the step.")
    }
    if (input.steps && !findStep.length) {
      setStepCounter(++stepCounter);
      setStepsList([
        ...stepsList,
        { number: stepCounter, description: input.steps },
      ]);
      input.steps = "";
    }
  }

  function deleteStep(e, stepNumberToDelete) {
    e.preventDefault();
    let filteredSteps = stepsList.filter(
      (el) => el.number !== stepNumberToDelete
    );
    for (let i = stepNumberToDelete - 1; i < filteredSteps.length; i++) {
      if (filteredSteps[i]) {
        filteredSteps[i].number = filteredSteps[i].number - 1;
      }
    }
    setStepCounter(--stepCounter);
    setStepsList(filteredSteps);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(validate(input));
    if (
      input.title &&
      input.summary &&
      input.diets.length &&
      input.spoonacularScore &&
      input.healthScore &&
      stepsList.length &&
      !Object.keys(errors).length
    ) {
      let stepsArray = stepsList.map((el) => el.description);
      input.steps = stepsArray;
      if (!input.image) {
        input.image =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/1280px-Question_Mark.svg.png";
      }
      if (!recipeId.id) {
        dispatch(postRecipe(input));
        alert("Recipe created.");
        navigate("/home");
      } else {
        dispatch(updateRecipe(recipeId.id, input));
        alert("Recipe updated.");
        navigate("/home");
      }
      setInput({
        title: "",
        summary: "",
        spoonacularScore: 50,
        healthScore: 50,
        image: "",
        steps: "",
        diets: [],
      });
    } else {
      setShowErrors(true);
    }
  }

  return (
    <main>
      {loaded && (
        <>
          <div className={styles.headerGroup}>
            {Object.keys(recipeId).length === 0 ? (
              <h1>Create you recipe!</h1>
            ) : (
              <h1>Update your recipe</h1>
            )}
            <div className={styles.headerButton}>
              <Link to="/home">
                <button className={styles.headerButtonStyles}>Home</button>
              </Link>
            </div>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={styles.smallElements}>
              <div className={styles.inputPosition}>
                <label className={styles.labelForm}>Title</label>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    defaultValue={input.title}
                    name="title"
                    placeholder="title"
                    onChange={(e) => handleChange(e)}
                    className={styles.inputForm}
                  />
                </div>
                <p className={styles.inputErrorText}>{errors.title}</p>
              </div>
              <div className={styles.inputPosition}>
                <label className={styles.labelForm}>Description</label>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    defaultValue={input.summary}
                    name="summary"
                    maxLength="254"
                    placeholder="description"
                    onChange={(e) => handleChange(e)}
                    className={styles.inputForm}
                  />
                </div>
                <p className={styles.inputErrorText}>{errors.summary}</p>
              </div>
              <div className={styles.inputPosition}>
                <label className={styles.labelForm}>Score</label>
                <div className={styles.rangeContainer}>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue={input.spoonacularScore}
                    name="spoonacularScore"
                    onChange={(e) => handleChange(e)}
                    className={styles.rangeInput}
                  />
                  <p className={styles.rangeNumber}>
                      {input.spoonacularScore}
                  </p>
                </div>
                <p className={styles.inputErrorText}>
                  {errors.spoonacularScore}
                </p>
              </div>
              <div className={styles.inputPosition}>
                <label className={styles.labelForm}>Health Score</label>
                <div className={styles.rangeContainer}>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue={input.healthScore}
                    name="healthScore"
                    onChange={(e) => handleChange(e)}
                    className={styles.rangeInput}
                  />
                  {<p className={styles.rangeNumber}>{input.healthScore}</p>}
                </div>
                <p className={styles.inputErrorText}>{errors.healthScore}</p>
              </div>
              <div className={styles.inputPosition}>
                <div className={styles.inputGroup}>
                  <label className={styles.labelForm}>Image (optional)</label>
                  <input
                    type="text"
                    defaultValue={input.image}
                    name="image"
                    onChange={(e) => handleChange(e)}
                    className={styles.inputForm}
                    placeholder="image URL"
                    maxLength="254"
                  />
                </div>
                <p className={styles.inputErrorText}>{errors.image}</p>
              </div>
              {showImage && (<img src={input.image} alt="Not found." className={styles.imagePreview}/>)}
            </div>
            <div>
              <label className={styles.labelForm}>Diets</label>
              <div className={styles.checkboxGroup}>
                {globalDiets.map((diet) => (
                  <div className={styles.checkboxElement} key={diet.name}>
                    <label className={styles.checkboxLabel}>
                        <input 
                          type="checkbox" 
                          defaultValue={diet.name}
                          onChange={(e) => handleCheck(e)}
                          className={styles.checkboxInput}
                        />
                      {diet.name.toUpperCase()}
                    </label>
                  </div>
                ))}
                <p className={styles.inputErrorText}>{errors.diets}</p>
              </div>
            </div>

            <div>
              <label className={styles.labelForm}>Steps</label>
              <div className={styles.stepsBox}>
                <div className={styles.stepsCreate}>
                  <p>Create new step</p>

                  <input 
                    type="text" 
                    defaultValue={input.steps} 
                    name="steps" 
                    onChange={(e) => handleChange(e)} 
                    className={styles.stepInput} 
                    maxLength="254"
                  />
                  <button name="stepButton" onClick={addStep} className={styles.stepButton}>
                    Add
                  </button>
                </div>
                <div className={styles.stepsList}>
                  {stepsList?.map((el) => (
                    <div className={styles.stepElement} key={el.number}>
                      <p className={styles.stepText}>
                        <span>{el.number}.</span>
                        {el.description}
                        <button className={styles.stepDelete} onClick={(e) => deleteStep(e, el.number)}>
                          X
                        </button>
                      </p>
                    </div>
                  ))}
                  {errors.steps && (
                    <p className={styles.stepsErrorText}>{errors.steps}</p>
                  )}
                </div>
              </div>
            </div>
            {showErrors && (
              <div className={styles.warningGroup}>
                <p className={styles.warningText}>
                  <b>Error:</b> Complete the form correctly.
                </p>
              </div>
            )}
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
          </form>
        </>
      )}
    </main>
  );
}
