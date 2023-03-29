const axios = require('axios');
const { Country } = require('../db');

// Request de info a la API
const getApiData = async () => {
    try {
        const { data } = await axios (`https://restcountries.com/v3/all`)
        const allCountries = data.map (country => (
            {
                id: country.cca3,
                name: country.name.common,
                flag: country.flags[0],
                continent: country.continents.join(),
                capital: country.capital? country.capital.join().toString() : 'Not defined',
                subregion: country.subregion? country.subregion : null,
                area: country.area? country.area : null,
                population: country.population,
            }      
     ));
        return allCountries
    } catch (error) {
        throw Error (`Error API request: ${error.message}`)
    };
};

// Trae informacion de la DB o de la API
const saveApiData = async () => {
    try {
        // Info de la DB
        let allCountriesDB = await Country.findAll()
        // Info de la API
        const allCountriesAPI = await getApiData()

        if(!allCountriesDB.length) {
            //Si no encuentra la info en al DB, carga la info de la API
            await Country.bulkCreate(allCountriesAPI)
        } else {
            // Si encuentra la info en la DB, la compara con la info existente que hay en la API y la actualiza si es necesario
            allCountriesDB = [...allCountriesDB, ...allCountriesAPI]
            allCountriesDB.forEach(country => {
                Country.findOrCreate({
                    where: { id: country.id}
                });
            });
        };

        // retorna la info de la DB
        return allCountriesDB
    } catch (error) {
        if(error.message.includes( 'Error API request:' )) throw Error (error.message)
        throw Error (`Error DB request: ${error.message}`)
    };
};

module.exports = saveApiData;