import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import accountReducer from './reducers/account';
import uiReducer from './reducers/ui';
import authReducer from './reducers/auth'
import miscReducer from './reducers/misc'
import miscTransaction from './reducers/transaction'

const rootReducer = combineReducers({
    account:accountReducer,
    ui: uiReducer,
    auth: authReducer,
    misc: miscReducer,
    transaction: miscTransaction,
});

let composeEnhancers = compose;

if(__DEV__){
    composeEnhancers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
}

const configureStore =() =>{
    return createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
}

export default configureStore;