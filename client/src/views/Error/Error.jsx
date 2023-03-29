import { NavLink } from 'react-router-dom';
import { ErrorMsj } from '../../components';
import styles from './Error.module.css';

const Error = () => {
    return (
        <div className= { styles.mainContainer } >
            <div className= { styles.errorContainer}>
                <ErrorMsj error = '404 Page Not Found' />
                <NavLink to = '/home'>
                    <button className= { styles.button }>Back to Home Page</button>
                </NavLink>
            </div>
        </div>
    )
};
export default Error;