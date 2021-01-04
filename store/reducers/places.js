import {
    //ADD_PLACE, 
    REMOVE_PLACE, 
    //SELECT_PLACE, 
    //DESELECT_PLACE,
    SET_PLACES,
    PLACE_ADDED,
    START_ADD_PLACE
} from '../actions/actionTypes'

const initialState ={
    places: [],
    placeAdded : false
    //selectedPlace :null
};

const reducer =(state = initialState, action) =>{
    switch(action.type){
        /*
        case ADD_PLACE:
            return{
                ...state,
                places: state.places.concat({
                    key: Math.random().toString(),
                    name: action.placeName,
                    image: action.image,
                    location: action.location
                })
            };
            */
        case SET_PLACES:
            return{
                ...state,
                places:action.places
            }
        case REMOVE_PLACE:
            return{
                ...state,
                places: state.places.filter(place => {
                    return place.key !== action.key
                  }),
                  //selectedPlace : null
            }
        case PLACE_ADDED:
            return{
                ...state,
                placeAdded : true
            }
        case START_ADD_PLACE:
            return{
                ...state,
                placeAdded: false
            }
            /*
        case SELECT_PLACE:
            return{
                ...state,
                selectedPlace : state.places.find(place=>{
                    return place.key === action.placeKey;
                  })
            }
        case DESELECT_PLACE:
            return{
                ...state,
                selectedPlace:null
            }
        */
        default:
            return state;
    }
}
export default reducer;