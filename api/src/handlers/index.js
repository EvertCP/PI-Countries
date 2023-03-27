const { getAllCountriesHandler, getCountryByIdHandler } = require('./countriesHandler')
const { getAllActivitiesHandler, createActivityHandler, updateActivityHandler, deleteActivityHandler } = require('./activitiesHandler')

module.exports = {
    getAllCountriesHandler,
    getCountryByIdHandler,
    getAllActivitiesHandler,
    createActivityHandler,
    updateActivityHandler,
    deleteActivityHandler
}