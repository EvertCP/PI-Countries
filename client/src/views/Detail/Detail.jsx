import styles from './Detail.module.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CardDetailCountry, CardDetailCountryActivities, ErrorMsj } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../../redux/actions';

const Detail = () => {
    const { error } = useSelector(state => state);
    const dispatch = useDispatch();
    const { idCountry } = useParams();
    const [ country, setCountry ] = useState ({});

    useEffect (() => {
        const getDetail = async () => {
            try {
                const { data } = await axios (`/countries/${ idCountry }`)
                setCountry (data)
            } catch (error) {
                dispatch (setError(error.message))
            }
        }
        getDetail()
        return setCountry({})
    }, [dispatch, idCountry])

    return(
        <div className= { styles.mainContainer } >
          <div className= { styles.detailContainer } >
            { country && 
              <div className= { styles.divDetail } >
                <CardDetailCountry
                  id= { country.id }
                  name= { country.name }
                  flag= { country.flag }
                  continent= { country.continent }
                  capital= { country.capital }
                  subregion= { country.subregion }
                  area= { country.area }
                  population= { country.population }
                /> 
              </div>
            } 
            { country.Activities && 
              <div className= { styles.divActivitiesContainer } >
                <div className= { styles.titleActivities } >
                  <h1>TOURIST ACTIVITIES</h1>
                </div>
                <div className= { styles.divActivities}>
                  { country.Activities.map( activity =>
                    <CardDetailCountryActivities
                      key= { activity.name }
                      name= { activity.name }
                      dificulty= { activity.dificulty }
                      duration= { activity.duration }
                      seasons= { activity.seasons }
                    />
                  )}
                </div>
              </div>
            }
            { error && <ErrorMsj error= { error } />}
          </div>
        </div>
      )
}
export default Detail;