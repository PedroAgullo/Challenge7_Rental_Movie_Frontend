import {TRAILER, DELETETRAILER} from '../types';
const initialState = {
    trailer: ''
};
const credentialsReducer = (state = initialState, action) => {
    switch(action.type){
        case TRAILER :
            return action.payload;
        case DELETETRAILER :
            return action.payload;
        default : 
            return state
    }
}
export default credentialsReducer;