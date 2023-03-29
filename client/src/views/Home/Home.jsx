import styles from './Home.module.css';
import { CardsContainerCountries, Pagination, SearchBar } from "../../components";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllCountries, getAllActivities, setCurrentPage } from '../../redux/actions';

const Home = () => {
    const dispatch = useDispatch();
    const { allCountries } = useSelector(state => state);
    const initialHome = allCountries.length === 0;

    useEffect(() => {
        if(initialHome){
            dispatch(getAllCountries())
            dispatch(getAllActivities())
            dispatch(setCurrentPage(0))
        }
    }, [ initialHome, dispatch ])
    return(
        <div className = { styles.mainContainer }>
            <SearchBar />
            <div className= { styles.subContainer }>
                {!initialHome && <CardsContainerCountries />}
                <Pagination />
            </div>
        </div>
    );
};
export default Home;