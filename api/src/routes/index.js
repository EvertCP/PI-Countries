const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countryRouter = require( './countryRouter');
const activityRouter = require( './activityRouter');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use( './countries', countryRouter);
router.use( './activities', activityRouter);

module.exports = router;
