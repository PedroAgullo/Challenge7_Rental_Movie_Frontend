import {combineReducers} from 'redux';
import credentials from './credentials-reducer';
import movie from './movie-reducer';
import vista from './vista-reducer'

const rootReducer = combineReducers({
    credentials,
    movie,
    vista   
});
export default rootReducer;