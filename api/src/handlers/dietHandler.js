const { Diet } = require("../db");

const getDiets = async (req, res) => {
  const diets = await Diet.findAll();
  console.log(diets);
  res.status(200).json(diets);
};

module.exports = {
  getDiets,
};
