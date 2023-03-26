const { Activity, Country } = require('../db');

const getAllActivities = async () => await Activity.findAll(
    {
        includes: {
            model: Country,
            attributes: ["id"],
            through: {attributes: []}
        }
    }
)

const controlDataActivity = async (isUpdate, name, difficulty, duration, seasons, countriesIds) => {
    // nombre de la actividad
    if(!name) throw Error(`You must specify the 'name' of the activity.`)
    name = name.toUpperCase()
    if(!isUpdate) {
        const findActivity = await Activity.findOne({ where: { name }})
        if(findActivity) throw Error (`Activity '${name}' already exist.`)
    }

    //dificultad de la actividad
    if(!difficulty) throw Error(`You must specify the 'difficulty' of the activity(an integer value between 1 and 5 inclusive).`)
    if( isNaN(difficulty)) throw Error(`'Difficulty' must be numeric (an integer value between 1 and inclusive).`)
    difficulty = Number(difficulty)
    if(difficulty < 1 || difficulty > 5) throw Error (`'Difficulty' must be an integer value between 1 and 5 inclusive.`)

    if(duration && duration < 0) throw Error("'duration' cannot be less than zero")

    // Controlador de season
    if(!seasons) throw Error(`You must specify a 'Season' (Allowed values: 'summer', 'autummn', 'winter' or 'spring')`)
    let seasonValues = ['summer', 'autumn', 'winter', 'spring']
    seasons = seasons.map(season => {
        
        const seasonLow = season.toLowerCase()
        if(seasonValues.includes(seasonLow)) {
            seasonValues = seasonValues.filter(seasonV => seasonV !== seasonLow)
            return season.at().toUpperCase().concat(season.slice(1))
        } else {
            throw Error (`'${season}' is repeated or is not a valid season (Allowed values: 'summer', 'autumn', 'winter' or 'spring').`)
        };
    })

    // Id's de los paises 
    if(!countriesIds || !countriesIds.length) throw Error(`You must specify even if it is a country ID`)
    const promCountriesIds = countriesIds.map(async(countryId) => {
        try {
            countryId = countryId.toUpperCase()
            const findCountry = await Country.findByPk(countryId)
            if(!findCountry) throw Error (`The Id country '${countryId}' is not valid.`)
            return countryId
        } catch (error) {
            throw Error (error.message)
        }
    })
    countriesIds = (await Promise.all(promCountriesIds)).map(countryId => countryId)

    return { name, difficulty, duration, seasons, countriesIds }
}

const getCountriesOfActivity = async (name) => {
    return await Activity.findOne(
        {
            where: { name },
            include: {
                model: Country,
                attributes: [ "id" ],
                through: {attributes: [] }
            }
        }
    )
}

//Crear actividad con info
const createActivity = async (name, difficulty, duration, seasons, countriesIds) => {
    const data = await
    controlDataActivity (false, name, difficulty, duration, seasons, countriesIds)

    const newActivity = await Activity.create(
        {
            name: data.name,
            difficulty: data.difficulty,
            duration: data.duration,
            seasons: data.seasons
        }
    )

    await newActivity.addCountry(data.countriesIds)
    return getCountriesOfActivity(data.name)
}

//Update activity
const updateActivity = async (name, difficulty, duration, seasons, countriesIds) => {
    const data = await
    controlDataActivity(true, name, difficulty, duration, seasons, countriesIds)

    await Activity.update(
        {
            difficulty: data.difficulty,
            duration: data.duration,
            seasons: data.seasons
        },
        {
            where: { name: data.name}
        }
    )
    const updateActivity = await Activity.findOne(
        {
            where: { name: data.name }
        }
    )

    await updateActivity.removeCountries(await updateActivity.getCountries())
    await updateActivity.addCountry(data.countriesIds)
    return getCountriesOfActivity(data.name)
}

const deleteActivity = async (id) => {
    const deleteActivity = await Activity.findByPk(id)
    if(!deleteActivity) throw Error (`The activity does not exist`)
    deleteActivity.destroy()
    return { status: 'OK'}
}

module.exports = { getAllActivities, createActivity, updateActivity, deleteActivity};