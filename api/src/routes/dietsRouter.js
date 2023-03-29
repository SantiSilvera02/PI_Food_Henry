const { Router } = require("express");
const { getDiets } = require("../handlers/dietHandler");
const { Recipe } = require("../db");

const dietsRouter = Router();

dietsRouter.get("/", getDiets);

module.exports = dietsRouter;
