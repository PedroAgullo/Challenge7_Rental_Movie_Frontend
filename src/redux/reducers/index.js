import {combineReducers} from 'redux';
import credentials from './credentials-reducer';
import tipodatos from './tipodatos-reducer';

const rootReducer = combineReducers({
    credentials   
});
export default rootReducer;