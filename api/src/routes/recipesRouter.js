const { Router } = require("express");
const {
  createRecipe,
  getRecipes,
  getRecipesById,
  getRecipesByName,
} = require("../handlers/recipesHandler");

const recipesRouter = Router();

// recipesRouter.get("/", getRecipes);
recipesRouter.get("/", getRecipesByName);
recipesRouter.get("/:recipeId", getRecipesById);

recipesRouter.post("/", createRecipe);

module.exports = recipesRouter;
