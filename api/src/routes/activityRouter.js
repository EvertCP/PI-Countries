const activityRouter = require( 'express').Router()
const { getAllActivitiesHandler, createActivityHandler, updateActivityHandler, deleteActivityHandler } = require('../handlers')

// Trae las actividades de la DB
activityRouter.get('/', getAllActivitiesHandler)

// Crea una nueva actividad en la DB 
activityRouter.post('/', createActivityHandler)

//Actualiza una acitvidad en la DB
activityRouter.put('/', updateActivityHandler)

//Actualiza actividad en la DB
activityRouter.delete('/:id', deleteActivityHandler)

module.exports = activityRouter;