const { Router } = require("express");
const router = Router();
const { getAllDiets } = require("../controllers/getDiets.js");

router.get("/", async (req, res, next) => {
  try {
    let allDiets = await getAllDiets();
    res.send(allDiets);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
