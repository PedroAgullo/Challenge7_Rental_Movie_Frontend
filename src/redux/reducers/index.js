import {combineReducers} from 'redux';
import credentials from './credentials-reducer';
import movie from './credentials-reducer';

const rootReducer = combineReducers({
    credentials,
    movie   
});
export default rootReducer;