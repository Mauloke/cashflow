import {
    SET_TRANSACTION
} from '../actions/actionTypes'

const initialState ={
    transaksi:[]
};

const reducer =(state = initialState, action) =>{
    switch(action.type){
        case SET_TRANSACTION:
            return{
                transaksi:action.aset
            }
        default:
            return state;
    }
}
export default reducer;