const { getAllCountries, getCountryById } = require('./countryController');
const { getAllActivities, createActivity, updateActivity, deleteActivity } = require('./activityController');
const saveApiData = require('./saveApiData.js');

module.exports = {
    saveApiData,
    getAllCountries,
    getCountryById,
    getAllActivities, 
    createActivity,
    updateActivity,
    deleteActivity
};