const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const recipesRoutes = require('./recipes.js');
const dietsRoutes = require('./types.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/', recipesRoutes);
router.use('/types', dietsRoutes);

module.exports = router;
