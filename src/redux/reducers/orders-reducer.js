import {GETORDER} from '../types';
const initialState = {
    
};
const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case GETORDER :
            return action.payload;
        default : 
            return state
    }
}
export default orderReducer;