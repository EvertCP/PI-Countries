const applyOrderCountries = (order, countries) => {
    const typeOrder = [order[0]]

    return order[1] === 'ascending'
        ? [...countries.sort ((country, nextCountry) => {
            if(country[ typeOrder ] > nextCountry [ typeOrder ]) return 1
            if(country[ typeOrder ] < nextCountry [ typeOrder ]) return -1
            return 0
        })]
        : [...countries.sort ((country, nextCountry) => {
            if(country[ typeOrder ] > nextCountry [ typeOrder ]) return -1
            if(country[ typeOrder ] < nextCountry [ typeOrder ]) return 1
            return 0
        })]
}

const applyFilterAndOrderCountries = ({ name, continents, activity, order }, activities, countries ) => {
    let countriesFiltered = countries
    if(name){
        countriesFiltered = countriesFiltered.filter(country => country.name.toLowerCase().includes(name.toLowerCase()))
    }
    if(continents.length)
        countriesFiltered = countriesFiltered.filter(country => continents.includes(country.continent))
    
    if(activity !== 'All') {
        const countriesActivity = activities
            .find(activityFinded => activityFinded.name === activity)
            .Countries.map(countryActivity => countryActivity.id)

        countriesFiltered = countriesFiltered.filter(country => countriesActivity.includes(country.id))    
    }
    
    return applyOrderCountries(order, countriesFiltered)
}

const applyFiltersInCountries = (newfilter, state, payload) => {
    let msgError = ''

    const newCountriesFilterSettings = newfilter
    ?{
        ...state.countriesFilterSettings,
        [ newfilter ]: payload
    }
    : {...state.countriesFilterSettings}

const countriesToFilter = newfilter? state.allCountries : state.countriesFilter

const countriesFilteredAndOrdened = applyFilterAndOrderCountries(
    newCountriesFilterSettings,
    state.activities,
    countriesToFilter
)

    if(!countriesFilteredAndOrdened.length) msgError = 'Countries not found'

    return {
    ...state,
    error: msgError,
    currentPageCountries: 0,
    countriesFilter: countriesFilteredAndOrdened,
    countriesFilterSettings: newCountriesFilterSettings
    }
}
export default applyFiltersInCountries;
