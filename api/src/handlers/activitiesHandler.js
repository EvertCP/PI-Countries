const { getAllActivities, createActivity, updateActivity, deleteActivity } = require('../controllers')

//Trae las actividades de la DB
const getAllActivitiesHandler = async (req, res) => {
    try {
        const allActivities = await getAllActivities()
        return res.status(200).json(allActivities)
    } catch(error) {
        return res.status(400).json({ error: error.message})
    };
};

//Crea una nueva actividad
const createActivityHandler = async (req, res) => {
    const { name, difficulty, duration, seasons, countriesId } = req.body
    try {
        const newActivity = await createActivity (name, difficulty, duration, seasons, countriesId)
        return res.status(200).json(newActivity)
    } catch(error) {
        return res.status(400).json({ error: error.message })
    };
};

//Actualiza actividad
const updateActivityHandler = async (req, res) => {
    const { name, difficulty, duration, seasons, countriesIds } = req.body
    try {
        const updatedActivity = await updateActivity (name, difficulty, duration, seasons, countriesIds)
        return res.status(200).json(updatedActivity)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    };
};

// Borra actividad
const deleteActivityHandler = async (req, res) => {
    const { id } = req.params
    try {
        const deletedActivity = await deleteActivity (id)
        return res.status(200).json(deletedActivity)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    };
};

module.exports = { getAllActivitiesHandler, createActivityHandler, updateActivityHandler, deleteActivityHandler };