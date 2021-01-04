import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';

import {
    SET_ACCOUNT,
    SET_EXIST,
    SET_MONTH,
    SET_PENGHASILAN,
    SET_PENGELUARAN,
    SET_TABUNGAN,
    RESET_ACCOUNT,
    UPDATE_ASETLANCAR
} from './actionTypes';
import { firebase } from '@react-native-firebase/auth';

var db;

export const getUserDB = () => {
    return((dispatch)=>{
        const promise = new Promise(async(resolve,reject)=>{
            try {
                const id = await AsyncStorage.getItem('grow:auth:user')
                database()
                .ref('/book/'+id)
                .once('value')
                .then(snapshot => {
                    if(snapshot.exists()){
                        //dispatch(setWealth(snapshot.val())) 
                    }
                    resolve(snapshot.exists())
                    
                });
            } catch(e) {
                console.log(e)
            }

        })
        return promise
        .then((exist)=>{
            return exist
        })
    })
}

const setBook = () => {
    return(async ()=>{
        try{
            const id = await AsyncStorage.getItem('grow:auth:user')
            var newBookName = firebase.database().ref().child('book').push().key;
            AsyncStorage.setItem("grow:book:name",newBookName);
            firebase.database().ref('/auth/'+newBookName)
            .update({
                'owner':id
            })
        }catch(e){
            console.log("error set Book:"+e)
        }
        
    })
}

export const getAccount = (month,year) => {
    return(async (dispatch)=>{
        try {
            const id = await AsyncStorage.getItem('grow:auth:user')
            //console.log("bulan:"+month+",year:"+year)
            db = database()
            .ref('/book/'
            +id
            //+"/"+year
            //+"/"+month
            +"/account")
            .on('value',snapshot => {
                if(snapshot.exists()){
                    //console.log(snapshot.val())
                    dispatch(setAccount(snapshot.val()))
                }else{
                    dispatch(resetAccount())
                }
            });
        } catch(e) {
            console.log(e)
            }
    })
}


/*
export const checkIfExist =() =>{
    return(async (dispatch)=>{
        try {
            const id = await AsyncStorage.getItem('grow:auth:user')

            database()
            .ref('/book/'+id.replace(/\./gi,'@'))
            .once('value', snapshot => {
                console.log('User data: ', snapshot.val());
                //dispatch(setWealth(snapshot.val()))
            });
        } catch(e) {
            console.log(e)
        }
    })
}
*/

const addDBWealth = (month, wealth) => {
    return(async (dispatch)=>{
        try{
            const id = await AsyncStorage.getItem('grow:auth:user')
            database()
            .ref('/wealth/'+id+"/"+month)
            .set(wealth)
            .then(() => console.log('Data set.'));
        } catch(e) {
            console.log(e)
        
        }
    })
}

export const closeAccount = () => {
    return(async (dispatch)=>{
        const id = await AsyncStorage.getItem('grow:auth:user')
        database()
        .ref('/book/'+id)
        .off('value', db)
    })
}

export const setMonth =(month, year) =>{
    return{
        type: SET_MONTH,
        month: month,
        year: year
    }
}

export const setPenghasilan =(val) =>{
    return{
        type: SET_PENGHASILAN,
        penghasilan: val
    }
}

export const setPengeluaran =(val) =>{
    return{
        type: SET_PENGELUARAN,
        pengeluaran: val
    }
}

export const setTabungan =(val) =>{
    return{
        type: SET_TABUNGAN,
        tabungan: val,
    }
}

export const setExist =(item) =>{
    return{
        type: SET_EXIST,
        aset: item
    }
}

const setAccount =(item) =>{
    return{
        type: SET_ACCOUNT,
        aset: item
    }
}
const resetAccount =() =>{
    return{
        type: RESET_ACCOUNT
    }
}

export const initAccount =(item, aset) =>{
    if(aset=="utang"){
        item.nilai = (-item.nilai).toString()
    }
    return(async (dispatch, getState)=>{
        try{
            const id = await AsyncStorage.getItem('grow:auth:user')
            database()
            .ref('/book/'
            +id
            //+"/"+getState().misc.year
            //+"/"+getState().misc.month
            +"/account/"
            +aset)
            .push() 
            .set(item)
            .then(() => console.log('Data set.'));
        }catch(e){

        }
    })
}


export const newAccount =(item) =>{
    return(async (dispatch, getState)=>{
        try{
            const id = await AsyncStorage.getItem('grow:auth:user')
            database()
            .ref('/book/'+id+"/"+getState().misc.year+"/"+getState().misc.month+"/account/")
            .set(item)
            .then(() => console.log('Data set.'));
        }catch(e){

        }
    })
}

export const updateAccount =(item,key, aset) =>{
    return(async (dispatch, getState)=>{
        try{
            console.log(key)
            const id = await AsyncStorage.getItem('grow:auth:user')
            database()
            .ref('/book/'+id+"/account/"+aset+"/"+key)
            .update(item)
            .then(() => console.log('Data set.'));
        }catch(e){
        }
    })
}


export const remAccount =(kategori, key) =>{
    return(async (dispatch, getState)=>{
        try{
            console.log(key)
            const id = await AsyncStorage.getItem('grow:auth:user')
            database()
            .ref('/book/'+id+"/account/"+kategori+"/"+key)
            .set(null)
            .then(() => console.log('Data removed.'));
        }catch(e){
        }
    })}

    export const addModal =(item, aset) =>{
        return(async (dispatch, getState)=>{
            try{
                const id = await AsyncStorage.getItem('grow:auth:user')
                database()
                .ref('/book/'+id+"/"+getState().misc.year+"/"+getState().misc.month+"/account/"+aset)
                .set(item)
                .then(() => console.log('Data set.'));
            }catch(e){
    
            }
        })
    }

    export const updateBuku =(item, id) =>{
        return{
            type: UPDATE_ASETLANCAR,
            id:id,
            item: item,
        }
    }