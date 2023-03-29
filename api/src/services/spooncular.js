const { Recipe } = require("../db");
const axios = require("axios");

// const getRecipesFromAPI = async () => {
//     const {API_KEY} = process.env;
//     const result = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`)
//     const json = result.data;
//     return json
// }

const cleanInfoApi = (info) => {
  console.log(info)
  return info.map((item) => {
    return {
      id: item.id,
      image: item.image,
      name: item.title,
      healthscore: item.healthScore,
      diets: item.diets,
      dishtypes: item.dishTypes,
      steps: item.analyzedInstructions[0]?.steps.map(e => {
        return (e.step)
    }),
      summary: item.summary,

      created: false,
    };
  });
};

const getRecipesFromAPI = async () => {
  const { API_KEY } = process.env;
  const apiInfo = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`
    )
  ).data.results;

  const infoCleaned = cleanInfoApi(apiInfo);
  return infoCleaned;
};

// const getRecipesFromAPI = async () => {
//     const {API_KEY} = process.env;
//     const apiInfo = (await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true')).data

//     const infoCleaned = cleanInfoApi(apiInfo)
//     const dbInfo = await Recipe.findAll()

//     return [...infoCleaned, ...dbInfo]
// }

module.exports = {
  getRecipesFromAPI,
  cleanInfoApi,
};
