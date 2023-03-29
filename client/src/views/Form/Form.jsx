import styles from './Form.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createActivity, setNewActivity, updateActivity } from '../../redux/actions';

import {
    ActivityDifficulty,
    ActivityDuration, 
    ActivityName,
    ActivitySeasons,
    CountriesActivity,
    ErrorMsj
} from '../../components';
import { useHistory } from 'react-router-dom';

const Form = ({ action }) => {
    const { activities, countriesFilterSettings, newActivity, error } = useSelector ( state => state )
    const dispatch = useDispatch();
    const [ showMessage, setshowMessage ] = useState(false);
    const history = useHistory()

    const controlErrors = ({ name, difficulty, duration, seasons, countriesIds }) =>
        !name || !difficulty || duration < 0 || !seasons.length || !countriesIds.length

    const showErrors = () => {
        dispatch(setNewActivity ({
            prop: 'name',
            value: '',
            error: 'The name of the activity cannot be less than 3 characters'
        }))
        dispatch(setNewActivity ({
            prop: 'difficulty',
            value: 0,
            error: 'Must select a difficulty'
        }))
        dispatch(setNewActivity ({
            prop: 'duration',
            value: 0,
            error: ''
        }))
        dispatch(setNewActivity ({
            prop: 'seasons',
            value: [],
            error: 'Must select at least one season'
        }))
        dispatch(setNewActivity ({
            prop: 'countriesIds',
            value: [],
            error: 'Must select at least one country'
        }))
    }

    useEffect(() => {
        if (action === 'Update') {
            const selectedActivity = activities.find(activity => activity.name.toLowerCase() === countriesFilterSettings.activity.toLowerCase())

            dispatch (setNewActivity ({
                prop: 'name', 
                value: selectedActivity.name, 
                error: ''
            }))
            dispatch (setNewActivity ({
                prop: 'difficulty',
                value: selectedActivity.difficulty,
                error: ''
            }))
            dispatch (setNewActivity ({
                prop: 'duration',
                value: selectedActivity.duration,
                error: ''
            }))
            dispatch (setNewActivity ({
                prop: 'seasons',
                value: selectedActivity.seasons,
                error: ''
            }))

            const countriesIds = selectedActivity.Countries.map(countryActivity => countryActivity.id)
            dispatch(setNewActivity ({
                prop: 'countriesIds',
                value: countriesIds,
                error: ''
            }))
        } else {
            showErrors()
        }
        return () => {
            if(action === 'Update') {
                dispatch (setNewActivity ({
                    prop: 'name',
                    value: '',
                    error: ''
                }))
                dispatch (setNewActivity ({
                    prop: 'difficulty',
                    value: 0,
                    error: ''
                }))
                dispatch (setNewActivity ({
                    prop: 'duration', 
                    value: 0,
                    error: ''
                }))
                dispatch (setNewActivity ({
                    prop: 'seasons', 
                    value: [],
                    error: ''
                })) 
                dispatch (setNewActivity ({
                    prop: 'countriesIds',
                    value: [],
                    error: ''
                }))
            }}
    }, [dispatch])

    const handleSubmit = (event) => {
        event.preventDefault()
        if (action !== 'Update') {
            dispatch (createActivity (newActivity))
            event.target.reset()
            setshowMessage(true)
            setTimeout (() => {
                setshowMessage (false)
                history.push('/home')
            }, 1000)
        }
    }

    return (
        <form className= { styles.mainContainer } onSubmit = { handleSubmit }>
            { !error
                ? <>
                <h1 className= { styles.titleActivity }>New Tourist Activity</h1>
                <div className= { styles.subContainer } >
            <div className= { styles.componentActivityContainer }>
              <div className= { styles.componentActivity } >
                <ActivityName action= { action } />
              </div>
              <div className= { styles.componentActivity } >
                <ActivityDifficulty action= { action } />
              </div>
              <div className= { styles.componentActivity } >
                <ActivityDuration action= { action } />
              </div>
              <div className= { styles.componentActivity } >
                <ActivitySeasons action= { action } />
              </div>
            </div>
            <div className= { styles.componentCountriesActivity } >
                <CountriesActivity action= { action } />
            </div>
          </div>
          <div className= { styles.crateActivity }>
            <div className= { styles.createButton } >
              {
                // If the loaded data is wrong, disable the Button. If not, enable it
                controlErrors( newActivity )
                ? <button type= 'submit' className= { styles.buttonDisabled } disabled >{ action } activity</button>
                : <button type='submit' className= { styles.button } >{ action } activity</button>
              }
            </div>
            <div className= { styles.activityCreated }>
              { showMessage && <h1>{ action === 'Update' ? 'ACTIVITY UPDATED !!!' : 'ACTIVITY CREATED !!!' }</h1> }
            </div>
          </div>
        </>
        // If there is any other type of error that is not due to the loading of the Activity data, it shows it
        : <ErrorMsj error= { error } />
      }
    </form>
  )
}
export default Form;