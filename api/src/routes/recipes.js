const { Router } = require("express");
const router = Router();
const { Diet, Recipe } = require("../db.js");
const {getAllRecipes,getRecipesForDiet} = require("../controllers/getRecipes.js");
const { Op } = require("sequelize");

router.get("/recipes", async (req, res) => {
  const name = req.query.name;
  let allRecipes = await getAllRecipes();
  if (name) {
    let recipeName = await allRecipes.filter((e) =>
      e.title.toLowerCase().includes(name.toLowerCase())
    );
    recipeName.length
      ? res.status(200).send(recipeName)
      : res.status(404).send("Recipe not found.");
  } else {
    res.status(200).send(allRecipes);
  }
});

router.get("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const allRecipes = await getAllRecipes();
  if (id) {
    let recipeId = await allRecipes.filter((e) => e.id == id);
    recipeId.length
      ? res.status(200).json(recipeId)
      : res.status(404).send("Recipe not found.");
  }
});

router.post("/recipe", async (req, res) => {
  const {title,summary,spoonacularScore, healthScore,image,steps,createdInDb,diets} = req.body;
  let recipeCreated = await Recipe.create({
    title,
    summary,
    spoonacularScore,
    healthScore,
    image,
    steps,
    createdInDb,
  });
  // console.log("INGRESADO"+diets)
  // const dietsList = await diets.map((diet) => {
  //    Diet.findAll({
  //     where: { name: diet },
  //   });
  // });
  // console.log(dietsList)

  const dietsList = await Diet.findAll({
    where: {name: diets },
  });
  
  recipeCreated.addDiet(dietsList);
  res.send("Recipe created.");
});

router.get("/recipes/diet/:diet", async (req, res) => {
  const { diet } = req.params;
  const recipesDiets = await getRecipesForDiet(diet);
  if (recipesDiets) {
    return res.send(recipesDiets);
  }
  return res.status(404).send("Diet type not found.");
});

router.put("/recipe/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, summary, spoonacularScore, healthScore, image, steps, diets } = req.body;
  let recipeUpdated = await Recipe.findOne({
    where: { id: id },
  });
  await recipeUpdated.update({
    title,
    summary,
    spoonacularScore,
    healthScore,
    image,
    steps,
  });
  let dietsDb = await Diet.findAll({
    where: {
      name: {
        [Op.in]: diets,
      },
    },
  });
  await recipeUpdated.setDiets(dietsDb);
  res.send("Recipe updated.");
});

router.delete("/recipe/delete/:id", async (req, res) => {
  const { id } = req.params;
  await Recipe.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).send("Recipe deleted.");
});

module.exports = router;
