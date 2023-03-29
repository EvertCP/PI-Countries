import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardDetailCountryActivities } from '../../components'
import styles from './DeleteActivity.module.css';
import { useHistory } from 'react-router-dom';
import { deleteActivity } from '../../redux/actions';

const DeleteActivity = () => {
    const { activity } = useSelector (state => state.countriesFilterSettings)
    const { activities } = useSelector (state => state);
    const [ deleteCurrentActivity, setDeleteCurrentActivity ] = useState ({});
    const [ showMessage, setshowMessage ] = useState (false);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClick = () => history.push ('./home')

    const handleClickYes = () => {
        dispatch (deleteActivity (deleteCurrentActivity.id))
        setshowMessage (true)
        setTimeout(() => handleClick(), 1000)
    }

    useEffect (() => {
        setDeleteCurrentActivity (
            activities.find(activityFind => activityFind.name === activity)
        )
    }, [])

    return(
        <div className= { styles.mainContainer } >
           {
            !showMessage
            ?<>
              <h1 className= { styles.message } >Are you sure you want to eliminate the following activity?</h1>
              { Object.keys(deleteCurrentActivity).length &&
                <CardDetailCountryActivities 
                  name= { deleteCurrentActivity.name }
                  dificulty= { deleteCurrentActivity.dificulty }
                  duration= { deleteCurrentActivity.duration }
                  seasons= { deleteCurrentActivity.seasons }
                />
              }
              <div className= { styles.buttonContainer } >
                <button className= { styles.buttonYes } onClick= { handleClickYes } >Yes</button>
                <button className= { styles.buttonNo } onClick= { handleClick } >No</button>
              </div>
            </>
            : <h1 className= { styles.message } >ACTIVITI DELETED !!!</h1>
          }
        </div>
      )
}
export default DeleteActivity;