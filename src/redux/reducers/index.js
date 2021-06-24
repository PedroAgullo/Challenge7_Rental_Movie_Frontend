import {combineReducers} from 'redux';
import credentials from './credentials-reducer';
import movie from './movie-reducer';
import tipoDatos from './tipodatos-reducer'

const rootReducer = combineReducers({
    credentials,
    movie,
    tipoDatos   
});
export default rootReducer;