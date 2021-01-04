import {
    SET_CATEGORY,
    IMPORT_CATEGORY,
    REMOVE_CATEGORY,
    RESET_CATEGORY
} from '../actions/actionTypes'

const initialState ={
    penghasilan:["gaji",'bonus'],
    belanjaRutin:[
        'rumah tangga',
        'pribadi',
        'telpon', 
        'internet', 
        'listrik', 
        'transportasi',
        'bensin',
        'zakat, infak, sedekah',
        'asuransi'

    ],
    belanjaNonRutin:['pajak kendaraan', 'biaya pendidikan'],
};

const reducer =(state = initialState, action) =>{
    switch(action.type){
        case IMPORT_CATEGORY:
            return{
                ...action.categoryList
            }
        case SET_CATEGORY:
            return{
                ...state,
                [action.category]:[...state[action.category], action.name]
            }
        case REMOVE_CATEGORY:
            return{
                ...state,
               initialState
            }   
        case RESET_CATEGORY:
            return{
                ...initialState
            }
        default:
            return state;
    }
}
export default reducer;