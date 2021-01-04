import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const UUID = require("uuid-v4");

import {SIGN_IN, SIGN_OUT} from './actionTypes';
import {uiStartLoading, uiStopLoading, closeWealth, remWealth} from './index'
import { Navigation } from 'react-native-navigation';
//import AuthRoot from '../../../App'
import {AuthRoot} from "../../navigations"


export const setUser = (user) => {
    AsyncStorage.setItem("grow:auth:user",user.uid);
    //console.log(user)
    //addUser(user)
    return{
        type: SIGN_IN,
        user: user,
    }
}

export const addUser = (user) => {
    return(()=>{
        const id = user.uid
        database()
        .ref('/users/'+id)
        .set(user.providerData[0])
        .then(() => console.log('Data set.'));
    })
}

export const getUser = (user) => {
    const id = user.email
    database()
    .ref('/users/'+id.replace(/\./gi,'@'))
    .once('value')
    .then(snapshot => {
        console.log('User data: ', snapshot.val());
    });
}

export const remUser = () => {
    return async (dispatch) =>{
        try {
            const removeStorage = await AsyncStorage.removeItem("grow:auth:user")
            dispatch(signOut())
        } catch(e) {
            console.log(e)
            dispatch(signOut())
            dispatch(remWealth())
            return true;
        }
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const authLogout =() => {
    return dispatch=>{
        auth()
        .signOut()
        .then(() => {
            dispatch(closeWealth)
            console.log('User signed out!')
            Navigation.setRoot(AuthRoot)
            
            .then(()=>{
                dispatch(remUser())
            });
        })
        .catch((e)=>{
            console.log('No User. signed out anyway')
            dispatch(remUser())
            .then(()=>{
                Navigation.setRoot(AuthRoot);
            });
        })
    }
}
