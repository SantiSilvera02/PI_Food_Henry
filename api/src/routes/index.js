const { Router } = require("express");
const dietsRouter = require("./dietsRouter");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const recipesRouter = require("./recipesRouter");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/recipes", recipesRouter);
router.use("/diets", dietsRouter);

module.exports = router;
