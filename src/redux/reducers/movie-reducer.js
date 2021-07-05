import {GETMOVIE} from '../types';
const initialState = {
    
};
const credentialsReducer = (state = initialState, action) => {
    switch(action.type){
        case GETMOVIE :
            return action.payload;
        default : 
            return state
    }
}
export default credentialsReducer;