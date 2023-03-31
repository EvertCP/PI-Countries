import {
    SET_CURRENT_PAGE,
    SET_ERROR,
    SET_FILTER_BY_CONTINENTS,
    SET_ORDER,
  } from '../actionsTypes'
  
  // Load in the Redux the page number selected in the Pagination Component
  const setCurrentPage = ( number )=> ( { type: SET_CURRENT_PAGE, payload: number } )
  // Loads in the Redux the error generated in the place where it was called
  //  and then it is displayed by the ErrorMsg Component
  const setError = ( error )=> ( { type: SET_ERROR, payload: error } )
  // Load in the Redux the filter of the selected continent and sent by parameter
  const setFilterByContinents = ( continents )=> ( { type: SET_FILTER_BY_CONTINENTS, payload: continents } )
  // Load in the Redux the type and order selected and sent by parameter
  const setOrder = ( order )=> ( { type: SET_ORDER, payload: order } )
  
  export {
    setCurrentPage,
    setError,
    setFilterByContinents,
    setOrder,
  }