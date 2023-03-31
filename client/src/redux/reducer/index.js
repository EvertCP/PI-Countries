import {
    GET_ALL_COUNTRIES,
    GET_ALL_ACTIVITIES,
    SET_CURRENT_PAGE,
    SET_CURRENT_COUNTRIES,
    GET_COUNTRIES_BY_NAME,
    SET_FILTER_BY_CONTINENTS,
    SET_FILTER_BY_ACTIVITY,
    SET_ORDER,
    SET_NEW_ACTIVITY,
    CREATE_ACTIVITY,
    UPDATE_ACTIVITY,
    DELETE_ACTIVITY,
    SET_ERROR
} from './actionsTypes';

import applyFiltersInCountries from './functionReducer';

const initialState = {
    allCountries: [],
    activities: [],
    currentPageCountries: 0,
    currentCountries: [],
    countriesFilter: [],
    countriesFilterSettings: {
        name: '',
        continents: [],
        activity: 'All',
        order: [ 'name', 'ascending' ]
    },
    newActivity: {
        name: '',
        difficulty: 0,
        duration: 0,
        seasons: [],
        countriesIds: []
    },
    errorNewActivity: {
        name: '',
        difficulty: '',
        duration: '',
        seasons: '',
        countriesIds: ''
    },
    error: ''
};

const rootReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_ALL_COUNTRIES: {
            let newState = {...state}
            newState.countriesFilter = payload
            newState = applyFiltersInCountries('', newState, '')

            return {
                ...state,
                ...newState,
                allCountries: payload.map(counytry => ({ ...counytry, selected: false})),
            }
        }
        case GET_ALL_ACTIVITIES:
            return{
                ...state,
                activities: payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                activities: payload
            }    
        case SET_CURRENT_COUNTRIES:
            return {
                ...state,
                currentCountries: payload
            }
        case GET_COUNTRIES_BY_NAME:{
            let newState = {...state}

            newState = applyFiltersInCountries('name', newState, payload.name)
            return {
                ...state,
                ...newState,
                countriesFilterSettings: {
                    ...newState.countriesFilterSettings,
                    name: payload.name
                }
            }
        }
        case SET_FILTER_BY_CONTINENTS:{
            return applyFiltersInCountries('continents', state, payload)
        }
        case SET_FILTER_BY_ACTIVITY:
            return applyFiltersInCountries('activity', state, payload)
        case SET_ORDER:
            return applyFiltersInCountries('order', state, payload)
        case SET_NEW_ACTIVITY:
            return {
                ...state,
                newActivity: {
                    ...state.newActivity,
                    [ payload.prop ]: payload.value
                },
                errorNewActivity: {
                    ...state.errorNewActivity,
                    [ payload.prop ]: payload.error
                }
            }
        case CREATE_ACTIVITY:
            return {
                ...state,
                allCountries: state.allCountries.map(country => ({ ...country, selected: false })),
                newActivity: { ...initialState.newActivity },
                errorNewActivity: { ...initialState.errorNewActivity },
                activities: [ ...state.activities, payload ]
            }        
        case UPDATE_ACTIVITY: {
            let newState = { ...state }
            newState.activities = newState.activities.map (activity => activity.id === payload.id? payload: activity)
            newState = applyFiltersInCountries ('activity', newState, payload.name)

            return {
                ...state,
                ...newState
            }
        }
        case DELETE_ACTIVITY: {
            let newState = { ...state }
            newState.activities = newState.activities.filter(activity => activity.id !== payload )
            newState = applyFiltersInCountries ('activity', newState, 'All')

            return {
                ...state,
                ...newState
            }
        }
        case SET_ERROR: 
            return {
                ...state,
                countriesFilter: [],
                currentCountries: [],
                error: payload
            }
        default:
            return {
                ...state
            };    
    };
};
export default rootReducer;