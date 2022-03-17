const initialState = {
  recipes: [],
  filterRecipes: [],
  recipesBd: [],
  recipesApi: [],
  diets: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      const filterRecipesDb = action.payload.filter(
        (recipe) => recipe.createdInDb
      );
      const filterRecipesApi = action.payload.filter(
        (recipe) => !recipe.createdInDb
      );
      return {
        ...state,
        recipes: action.payload,
        filterRecipes: action.payload,
        recipesBd: filterRecipesDb,
        recipesApi: filterRecipesApi,
      };

    case "GET_TYPES":
      return {
        ...state,
        diets: action.payload,
      };

    case "GET_NAME_RECIPES":
      return {
        ...state,
        filterRecipes: action.payload,
      };

    case "FILTER_BY_TYPE":
      return {
        ...state,
        filterRecipes: action.payload,
      };

    case "FILTER_CREATED":
      const recipes = state.recipes;
      const createdFilter =
        action.payload === "created"
          ? recipes.filter((e) => e.createdInDb)
          : recipes.filter((e) => !e.createdInDb);
      return {
        ...state,
        filterRecipes: action.payload === "all" ? state.recipes : createdFilter,
      };

    case "ORDER_BY_NAME":
      const sortedArrName =
        action.payload === "asc"
          ? state.filterRecipes.sort(function (a, b) {
              if (a.title > b.title) return 1;
              if (a.title < b.title) return -1;
              return 0;
            })
          : state.filterRecipes.sort(function (a, b) {
              if (a.title > b.title) return -1;
              if (a.title < b.title) return 1;
              return 0;
            });
      return {
        ...state,
        filterRecipes: sortedArrName,
      };

    case "ORDER_BY_POINTS":
      const sortedArrPoints =
        action.payload === "asc"
          ? state.filterRecipes.sort(function (a, b) {
              if (a.spoonacularScore > b.spoonacularScore) return 1;
              if (a.spoonacularScore < b.spoonacularScore) return -1;
              return 0;
            })
          : state.filterRecipes.sort(function (a, b) {
              if (a.spoonacularScore > b.spoonacularScore) return -1;
              if (a.spoonacularScore < b.spoonacularScore) return 1;
              return 0;
            });
      return {
        ...state,
        filterRecipes: sortedArrPoints,
      };

    case "POST_RECIPE":
      return {
        ...state,
      };

    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };

    case "DELETE_DETAIL":
      return {
        ...state,
        detail: []
      }

    case "DELETE_RECIPE":
      return {
        ...state,
        recipes: state.recipes.filter((r) => r.id !== action.payload),
      };

    case "UPDATE_RECIPE":
      return {
        ...state,
      };

    default:
      return state;
  }
}

export default rootReducer;
