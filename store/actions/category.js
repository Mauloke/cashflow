import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';

import {
    SET_CATEGORY, IMPORT_CATEGORY, REMOVE_CATEGORY, RESET_CATEGORY
} from './actionTypes';



export const getCategory = () => {
    return(async (dispatch)=>{
        try {
            const id = await AsyncStorage.getItem('grow:auth:user')
            db = database()
            .ref('/category/'+id.replace(/\./gi,'@'))
            .once('value')
            .then(snapshot => {
                if(snapshot.exists()){
                    dispatch(importStateCategory(snapshot.val()))
                }else{
                    //dispatch(resetWealth())
                    console.log("create default category")
                    //dispatch(setStateCategory('penghasilan', 'gaji'))
                    //dispatch(setStateCategory('belanjaRutin', 'rumah tangga'))
                    //dispatch(setStateCategory('belanjaRutin', 'pribadi'))
                }
            });
        } catch(e) {
            console.log(e)
            }
    })
}


export const saveCategory = (categoryList) => {
    return(async (dispatch)=>{
        try{
            const id = await AsyncStorage.getItem('grow:auth:user')
            database()
            .ref('/category/'+id.replace(/\./gi,'@'))
            .set(categoryList)
            .then(() => console.log('Data set.'));
        } catch(e) {
            console.log(e)
        
        }
    })
}

const importStateCategory = (categoryList) =>{
    return{
        type: IMPORT_CATEGORY,
        categoryList: categoryList
    }
}

export const setStateCategory =(category, name) =>{
    return{
        type: SET_CATEGORY,
        category: category,
        name: name
    }
}

export const resetStateCategory = () =>{
    return{
        type: RESET_CATEGORY,
    }
}