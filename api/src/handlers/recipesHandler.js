const { getRecipesFromAPI, cleanInfoApi } = require("../services/spooncular");
const { Recipe, Diet } = require("../db");

const getRecipes = async (req, res) => {
  const { name } = req.query;
  try {
    const response = await getRecipesFromAPI();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// const getRecipes = async (req,res)=> {
//     const {name} = req.query
//     const recipes = await getRecipesFromAPI()

//     console.log('recipes', recipes)

//     res.json(recipes)
//     return;

// };

const getRecipe = (req, res) => {
  const { recipeId } = req.params;
  res.status(200).send({ recipeId });
};

const createRecipe = async (req, res) => {
  const { image, name, dishtypes, diets, steps, healthscore, summary } =
    req.body;
  try {
    const recipe = await Recipe.create({
      image,
      name,
      dishTypes: dishtypes,

      analyzedInstructions: steps.join(", "),
      healthScore: healthscore,
      summary,
    });

    const dbDiets = await Diet.findAll({ where: { name: diets } });
    await recipe.addDiet(dbDiets);

    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getRecipesById = async (req, res) => {
  const infodb = Recipe.findByPk(req.params.recipeId);

  const json = await getRecipesFromAPI();
  console.log(req.params);

  const infofiltered = json.filter(
    (item) => item.id.toString() === req.params.recipeId
  );

  res.status(200).json([...infofiltered, infodb]);
};

const getRecipesByName = async (req, res) => {
  const infodb = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
    },
    where: { name: req.query.name || "" },
  });

  const json = await getRecipesFromAPI();
  console.log(req.params);

  const infofiltered = json.filter((item) => {
    if (req.query.name) {
      return item.name.toLowerCase().includes(req.query.name.toLowerCase());
    }
    return true;
  });

  console.log(infodb, "info from db");

  cleanInfoApi(
    infodb.map((item) => ({
      ...item.toJSON(),
      title: item.name,
      diets: item.diets.map((diet) => diet.name),
    }))
  ).forEach((item) => {
    infofiltered.push(item);
  });

  res.status(200).json(infofiltered);
};

module.exports = {
  getRecipe,
  createRecipe,
  getRecipes,
  getRecipesById,
  getRecipesByName,
};
