import {
    SET_MONTH,
    SET_PENGHASILAN,
    SET_PENGELUARAN,
    SET_TABUNGAN
} from '../actions/actionTypes'

const initialState ={
    month:null,
    year:null,
    penghasilan:0,
    pengeluaran:0,
    tabungan:0
};

const reducer =(state = initialState, action) =>{
    switch(action.type){
        case SET_MONTH:
            return{
                ...state,
                month: action.month,
                year: action.year
            }
        case SET_PENGHASILAN:
            return{
                ...state,
                penghasilan: action.penghasilan
            }
        case SET_PENGELUARAN:
            return{
                ...state,
                pengeluaran: action.pengeluaran
            }
        case SET_TABUNGAN:
            return{
                ...state,
                tabungan: action.tabungan
            }
        default:
                return state;
        }
}
export default reducer;