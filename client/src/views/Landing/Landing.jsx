import styles from './Landing.module.css';
import { NavLink } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className = {styles.mainContainer}>
            <h1>Welcome to the Countries App</h1>
            <p>In this app you will be able to search for the Countries of the world and see generic information of each one of them.</p>
            <p>In addition, you can manage Tourist Activities around the wolrd! and relate them to the country where this Activity is carried out.</p>
            <NavLink to = './home'>
                <button className = { styles.button}>Home page</button>
            </NavLink>
        </div>
    )
}
export default LandingPage;