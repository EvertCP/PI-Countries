import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducer';

const composeEnhacer = wundow.__REDUX_DECTOOLS_EXTENSSION_COMPOSE__ || compose

const store = createStore(
    rootReducer,
    composeEnhacer (applyMiddleware (thunkMiddleware))
)
export default store;