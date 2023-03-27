const countryRouter = require( 'express' ).Router()
const { getAllCountriesHandler, getCountryByIdHandler } = require('../handlers')

//Toma todos los paises de la DB
//
countryRouter.get('/', getAllCountriesHandler)

//Toma el id de un pais de la DB
countryRouter.get('/:idCountry', getCountryByIdHandler)

module.exports = countryRouter;