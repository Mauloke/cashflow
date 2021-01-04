import React,{Component} from 'react'
import database from '@react-native-firebase/database';
import {connect} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import { setWealth } from '../../store/actions';


export const getWealth = (month) => {
    return(async (dispatch)=>{
        try {
            const id = await AsyncStorage.getItem('grow:auth:user')
            database()
            .ref('/wealth/'+id.replace(/\./gi,'@')+"/"+month)
            .on('value', snapshot => {
                console.log('User data: ', snapshot.val());
                dispatch(setWealth(snapshot.val()))
            });
        } catch(e) {
            console.log(e)
            }
    })
}
