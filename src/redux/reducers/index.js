import {combineReducers} from 'redux';
import credentials from './credentials-reducer';
import movie from './movie-reducer';
import tipodatos from './tipodatos-reducer';
import orders from './orders-reducer';

const rootReducer = combineReducers({
    credentials,
    movie,
    tipodatos,
    orders   
});
export default rootReducer;