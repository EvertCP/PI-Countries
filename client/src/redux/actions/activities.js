import axios from 'axios'
import {   
  CREATE_ACTIVITY,
  UPDATE_ACTIVITY,
  DELETE_ACTIVITY,
  GET_ALL_ACTIVITIES,
  SET_ERROR,
  SET_FILTER_BY_ACTIVITY,
  SET_NEW_ACTIVITY,
} from "../actionsTypes"

// Create a new activity in the DB from the data passed by parameter. 
// Receives the created Activity and sends it to the Redux.
const createActivity =  ( activity )=> {

  return async ( dispatch )=> {

    try {

      const { data } = await axios.post( `/activities`, activity )
      return dispatch( { type: CREATE_ACTIVITY, payload: data } )

    } catch (error) {

      return dispatch( 
        { 
          type: SET_ERROR, 
          payload: `Could not create activity ${ activity.name }. Type Error: ${error.message}` 
        } 
      )

    }

  }

}

// Update a Activity in the DB from the data passed by parameter. 
// Receives the Activity and sends it to the Redux.
const updateActivity = ( activity )=> {

  return async ( dispatch )=> {

    try {

      const { data } = await axios.put( `/activities`, activity )
      return dispatch( { type: UPDATE_ACTIVITY, payload: data } )

    } catch (error) {

      return dispatch( 
        { 
          type: SET_ERROR, 
          payload: `Could not update activity ${ activity.name }. Type Error: ${error.message}` 
        } 
      )

    }

  }
}

const deleteActivity = ( id )=> { 

  return async ( dispatch )=> {
    
    try {

      await axios.delete( `/activities/${ id }` )

      return dispatch( { type: DELETE_ACTIVITY, payload: id }) 

    } catch (error) {

      return  dispatch( { type: SET_ERROR, 
                payload: `Could not delete activity whit Id ${ id }. Type Error: ${ error.message }` 
              } )

    }
  }
}

// Gets all the Activities from the DB and sends them to the Redux
const getAllActivities =  ()=> {

  return async ( dispatch )=>{

    try {

      const { data } = await axios( '/activities' )
      return dispatch( { type: GET_ALL_ACTIVITIES, payload: data } )

    } catch (error) {

      return dispatch( 
        { 
          type: SET_ERROR, 
          payload: `Not found activities. Type Error: ${error.message}` 
        } 
      )

    }

  }

}

// Asks Redux to filter by Activity sent by parameter
const setFilterByActivity = ( activity )=> ( { type: SET_FILTER_BY_ACTIVITY, payload: activity } )

// Load the data passed by parameter in the Activity located in the Redux
const setNewActivity = ( property )=> ( { type: SET_NEW_ACTIVITY, payload: property } )

export { 
  createActivity,
  updateActivity,
  deleteActivity,
  getAllActivities,
  setFilterByActivity,
  setNewActivity,
}