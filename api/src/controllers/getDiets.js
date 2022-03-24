const axios = require("axios");
const { Diet, RecipeAPI } = require("../db.js");
const { APIKEY } = process.env;

const getAllDiets = async () => {
  // const apiInfo = await axios.get(
  //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`
  // );
  // const apiDietsArrays = apiInfo.data.results.map((e) => e.diets);

  const apiInfo = await RecipeAPI.findAll();
  const apiDietsArrays = apiInfo.map((e) => e.diets);
  
  const allApiTypes = apiDietsArrays.flat().concat("ketogenic", "vegetarian");
  await allApiTypes.forEach((diet) => {
    Diet.findOrCreate({
      where: { name: diet },
    });
  });

  const allDiets = await Diet.findAll();
  return allDiets;
};

module.exports = { getAllDiets };
