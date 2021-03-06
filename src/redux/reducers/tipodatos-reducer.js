import {PROFILE, JOIN, LOGOUTTIPODATOS,PAYMENT, CAMBIADATOS} from '../types';
const initialState = 
    'profile'
;
const tipodatosReducer = (state = initialState, action) => {
    switch(action.type){
        case CAMBIADATOS :
            return action.payload;
        case PROFILE:
            return action.payload;
        case JOIN:
            return action.payload;
        case PAYMENT:
            return action.payload;          
        case LOGOUTTIPODATOS:
            return initialState;
        default : 
            return state
    }
}
export default tipodatosReducer;