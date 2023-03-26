const { getAllCountries, getCountryById } = require('../controllers');

// Traer todos los paises de la DB
const getAllCountriesHandler = async (req, res) => {
    const { name } = req.query
    try {
        const allCountries = await getAllCountries (name)
        return res.status(200).json(allCountries)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    };
};

// trae los paises con el parametro ID de la DB
const getCountryByIdHandler = async (req, res) => {
    const { idCountry } = req.params
    try {
        const countryById = await getCountryById (idCountry)
        return res.status(200).json(countryById)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    };
};

module.exports = { getAllCountriesHandler, getCountryByIdHandler };