import {SIGN_IN, SIGN_OUT} from "../actions/actionTypes"

const initialState ={
    user:null,
    //expiryDate: null
}
const reducer = (state=initialState, action) => {
    switch (action.type){
        case SIGN_IN:
            return{
                ...state,
                user: action.user,
                
            }
        case SIGN_OUT:
        return{
            ...state,
            user:null,
            
        }
        default:
        return state;
    }
}

export default reducer