import axios from "axios";

export function getRecipes() {
  return async function (dispatch) {
    let recipes = await axios.get("/recipes");
    return dispatch({
      type: "GET_RECIPES",
      payload: recipes.data,
    });
  };
}

export function getDiets() {
  return async function (dispatch) {
    let diets = await axios.get("/types");
    return dispatch({
      type: "GET_TYPES",
      payload: diets.data,
    });
  };
}

export function filterRecipesByType(diet, recipeOrigin) {
  return async function (dispatch) {
    let recipes =
      diet === "all"
        ? await axios.get(`/recipes`)
        : await axios.get(`/recipes/diet/${diet}`);

    return dispatch({
      type: "FILTER_BY_TYPE",
      payload: recipes.data,
      recipeOrigin,
    });
  };
}

export function filterRecipesCreated(payload, origin) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function filterRecipesName(name) {
  return async function (dispatch) {
    try {
      let recipe = await axios.get(
        "/recipes?name=" + name
      );
      console.log(recipe);
      return dispatch({
        type: "GET_NAME_RECIPES",
        payload: recipe.data,
      });
    } catch (error) {
      console.log(error);
      return dispatch({ type: "GET_NAME_RECIPES", payload: [] });
    }
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByPoints(payload) {
  return {
    type: "ORDER_BY_POINTS",
    payload,
  };
}

export function postRecipe(payload) {
  return async function (dispatch) {
    const data = await axios.post("/recipe", payload);
    return data;
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var recipe = await axios("/recipes/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: recipe.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteDetail() {
  return { type: "DELETE_DETAIL" };
}

export function deleteRecipe(id) {
  return async function (dispatch) {
    try {
      await axios.delete("/recipe/delete/" + id);
      return dispatch({
        type: "DELETE_RECIPE",
        payload: id,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function updateRecipe(id, data) {
  return async function (dispatch) {
    try {
      await axios.put("/recipe/update/" + id, data);
      return dispatch({
        type: "UPDATE_RECIPE",
      });
    } catch (e) {
      console.log(e);
    }
  };
}
