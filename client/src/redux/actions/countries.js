import axios from 'axios'
import {   
  GET_ALL_COUNTRIES, 
  GET_COUNTRIES_BY_NAME,
  SET_CURRENT_COUNTRIES,
  SET_ERROR
} from '../actionsTypes'

// Get all the Countries from the DB and send them to the Redux
const getAllCountries =  ()=> {

  return async ( dispatch )=>{

    try {

      const { data } = await axios( '/countries' )
      return dispatch( { type: GET_ALL_COUNTRIES, payload: data } )

    } catch (error) {

      return dispatch( 
        { 
          type: SET_ERROR, 
          payload: `Not found countries. Type Error: ${error.message}` 
        } 
      )

    }

  }

}

// Brings all the Countries filtered by the 'name' parameter of the DB and sends them to Redux
const getCountryByName =  ( name )=> {

  return !name
    ?  { type: GET_COUNTRIES_BY_NAME, payload: { name, data: [] } }
    : async ( dispatch )=>{

      try {

        const { data } = await axios( `/countries/?name=${ name }` )
        return dispatch( { type: GET_COUNTRIES_BY_NAME, payload: { name, data } } )

      } catch (error) {

        return dispatch( 
          { 
            type: SET_ERROR, 
            payload: `No countries were found that contain the word '${ name }'` 
          } 
        )

      }

    }

}

// Sends to Redux the Countries that are shown on the web according to the page selected in the Pagination Component
const setCurrentCountries = ( countriesFiltered )=> ( { type: SET_CURRENT_COUNTRIES, payload: countriesFiltered } )

export { 
  getAllCountries, 
  getCountryByName,
  setCurrentCountries,
}