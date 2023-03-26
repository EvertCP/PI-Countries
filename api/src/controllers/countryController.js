const { Country, Activity } = require('../db');

const getAllCountries = async (name) => {
    let allCountries
    allCountries = await Country.findAll()
    if(name) {
        allCountries = allCountries.filter(country =>
            country.name.toLower.Case().includes(name.toLowerCase())
            )
    }
    if(!allCountries.length) throw Error(`There is no country that contains the word in its name '${name}'.`)
    return allCountries
};

const getCountryById = async (idPais) => {
    idPais = idPais.toUpperCase()
    if(idPais.length !== 3) throw Error (`The country ID '${idPais}' it is incorrect.`)

    const countryById = await Country.findByPk(idPais,
        { include:{
            model: Activity,
            attributes: [ "name", "difficulty", "duration", "seasons"],
            through: {attributes: []}
        }
        })
        if(!countryById) throw Error(`The country ID '${idPais}' does not exist.`)
        return countryById
};

module.export = { getAllCountries, getCountryById };