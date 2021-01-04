import {
    SET_EXIST,
    SET_ACCOUNT,
    SET_ASETLANCAR,
    SET_ASETINVESTASI,
    SET_ASETGUNA,
    SET_UTANG,
    SET_MODAL,
    UPDATE_ASETLANCAR,
    UPDATE_ASETINVESTASI,
    UPDATE_ASETGUNA,
    UPDATE_UTANG,
    UPDATE_MODAL,
    REMOVE_ACCOUNT,
    RESET_ACCOUNT
} from '../actions/actionTypes'

const initialState ={
    asetLancar:[],
    asetInvestasi:[],
    asetGuna:[],
    utang:[],
    penghasilan:[],
    belanjaRutin:[],
    belanjaNonRutin:[],
    saldoAwal:0,
    saldoTambahan:0,
    saldoPenyesuaian:0,
    akumulasi:0
};

const reducer =(state = initialState, action) =>{
    switch(action.type){
        case SET_EXIST:
            return{
                ...state,
                exist: action.aset
            }
        case SET_ACCOUNT:
            return{
                ...initialState,
                ...action.aset
            }
        case SET_ASETLANCAR:
            return{
                ...state,
                asetLancar:[...state.asetLancar, action.aset]
            }
        case SET_ASETINVESTASI:
            return{
                ...state,
                asetInvestasi:[...state.asetInvestasi, action.aset]
            }
        case SET_ASETGUNA:
            return{
                ...state,
                asetGuna:[...state.asetGuna, action.aset]
            }
        case SET_UTANG:
            return{
                ...state,
                utang:[...state.utang, action.aset]
            }
        case SET_MODAL:
            return{
                ...state,
                modal:[...state.modal, action.aset]
            }
        case UPDATE_ASETLANCAR:
            return{
                ...state,
                asetLancar:{
                    ...state.asetLancar,
                    [action.id]:action.item
                }
            }
        case UPDATE_ASETINVESTASI:
            return{
                ...state,
                asetInvestasi:action.aset
            }
        case UPDATE_ASETGUNA:
            return{
                ...state,
                asetGuna:action.aset
            }
        case UPDATE_UTANG:
            return{
                ...state,
                utang:action.aset
            }
        case UPDATE_MODAL:
            return{
                ...state,
                modal:action.aset
            }
        case REMOVE_ACCOUNT:
            return{
                ...state,
               initialState
            }   
        case RESET_ACCOUNT:
            return{
                ...initialState
            }
        default:
            return state;
    }
}
export default reducer;