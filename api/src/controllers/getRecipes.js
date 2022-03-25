const axios = require("axios");
const { Recipe, Diet, RecipeAPI } = require("../db.js");
// const { APIKEY } = process.env;

const getApiInfo = async () => {

  const apiUrl = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=ca01b776ff2c4f4b861620d22d97b2fb&addRecipeInformation=true&number=100`
  );
  const apiInfo = await apiUrl.data?.results.map((e) => {
    return {
      id: e.id,
      title: e.title,
      summary: e.summary,
      spoonacularScore: e.spoonacularScore,
      healthScore: e.healthScore,
      image: e.image,
      diets: e.diets,
      steps: e.analyzedInstructions[0]?.steps.map((e) => {
        return e.step;
      }),
    };
  });
  await apiInfo.forEach((e) => {
    RecipeAPI.findOrCreate({
      where: {
        id: e.id,
      },
      defaults: {
        id: e.id,
        title: e.title,
        summary: e.summary,
        spoonacularScore: e.spoonacularScore,
        healthScore: e.healthScore,
        image: e.image,
        diets: e.diets,
        steps: e.steps,
      },
    });
  });

  // const apiInfo = await await RecipeAPI.findAll();
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
        if(recipe.createdInDb ){
          if (el.name.toLowerCase().includes(diet.toLowerCase())) {
            check = true;
          }
        } else{
          if (el.toLowerCase().includes(diet.toLowerCase())) {
            check = true;
          }
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
