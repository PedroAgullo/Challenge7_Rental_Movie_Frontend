import {PROFILE, JOIN, LOGOUTTIPODATOS, JOINMONITOR, NEWROOM, NEWCOACH, NEWUSER} from '../types';
const initialState = 
    'profile'
;
const vista = (state = initialState, action) => {
    switch(action.type){
        case PROFILE:
            return action.payload;
        case JOIN:
            return action.payload;
        case JOINMONITOR:
            return action.payload;
        case NEWROOM:
            return action.payload;
        case NEWUSER:
            return action.payload;
        case NEWCOACH:
                return action.payload;                        
        case LOGOUTTIPODATOS:
            return initialState;
        default : 
            return state
    }
}
export default vista;