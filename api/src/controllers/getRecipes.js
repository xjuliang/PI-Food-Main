const axios = require("axios");
const { Recipe, Diet } = require("../db.js");
const { APIKEY } = process.env;

const getApiInfo = async () => {
  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`
  );
  const apiInfo = await apiUrl.data?.results.map((e) => {
    return {
      id: e.id,
      title: e.title,
      summary: e.summary,
      spoonacularScore: e.spoonacularScore,
      healthScore: e.healthScore,
      image: e.image,
      diets: e.diets.map((e) => {
        return { name: e };
      }),
      steps: e.analyzedInstructions[0]?.steps.map((e) => {
        return e.step;
      }),
      dishTypes: e.dishTypes.map((e) => {
        return { name: e };
      }),
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  return await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allInfo = apiInfo.concat(dbInfo);
  return allInfo;
};

const getRecipesForDiet = async (diet) => {
  const recipes = await getAllRecipes();
  const recipeFilter = recipes.filter((recipe) => {
    let check = false;
    if (recipe.diets) {
      recipe.diets.forEach((el) => {
        if (el.name.toLowerCase().includes(diet.toLowerCase())) {
          check = true;
        }
      });
    }
    return check;
  });
  return recipeFilter;
};

module.exports = {
  getAllRecipes,
  getApiInfo,
  getDbInfo,
  getRecipesForDiet,
};
