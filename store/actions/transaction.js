import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
import {
    SET_TRANSACTION,
} from './actionTypes';

var db;

export const getUserDB = () => {
    return((dispatch)=>{
        const promise = new Promise(async(resolve,reject)=>{
            try {
                const id = await AsyncStorage.getItem('grow:auth:user')
                database()
                .ref('/book/'+id.replace(/\./gi,'@'))
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

export const getTransaction = (month,year) => {
    return(async (dispatch)=>{
        const promise = new Promise(async(resolve,reject)=>{
            try {
            const id = await AsyncStorage.getItem('grow:auth:user')
            db = database()
            .ref('/book/'+id+"/transaction/"+year+"/"+month)
            .on('value',snapshot => {
                //console.log(snapshot)
                if(snapshot.exists()){
                    dispatch(setTransaction(snapshot.val()))
                }else{
                    //alert("data not exist")
                    //console.log("here")
                    
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
            .ref('/wealth/'+id.replace(/\./gi,'@')+"/"+month)
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


const setTransaction =(item) =>{
    return{
        type: SET_TRANSACTION,
        aset: item
    }
}
const resetAccount =() =>{
    return{
        type: RESET_ACCOUNT
    }
}



export const addTransaction =(item) =>{
    return(async (dispatch, getState)=>{
        try{
            const id = await AsyncStorage.getItem('grow:auth:user')
            database()
            .ref(
                '/book/'+id+"/transaction/"+getState().misc.year+"/"+getState().misc.month
                +"/"+item.date)
            .push()
            .set({
                nilai:item.nilai,
                tipe:item.tipe,
                akun: item.akun,
                kategori:item.kategori,
                catatan:item.catatan,
                creator:getState().auth.user.displayName
            })
            .then(() => {dispatch(updateAkun(item));console.log('transaction added.')});
        }catch(e){

        }
    })
}

const updateAkun=(item)=>{
    return(async (dispatch, getState)=>{
        var aset,nilai;
        switch(item.tipe){
            case "keluar":
                aset = "asetLancar"
                nilai = getState().account[aset][item.akun]["nilai"]
                break;
        }
        try{
            //console.log(item)
            const id = await AsyncStorage.getItem('grow:auth:user')
            database()
            .ref('/book/'+id+"/account/"+aset+"/"+item.akun)
            .update({nilai: Number(getState().account[aset][item.akun]["nilai"]) - Number(item.nilai)})
            .then(() => {console.log('akun updated');dispatch(updateKategori(item))});
        }catch(e){
            console.log(e)
        }
    })
}

const updateKategori=(item)=>{
    var kategori;
    if(item.subkategori=="Belanja Rutin"){
        kategori = "belanjaRutin"
    }else{
        kategori = "belanjaNonRutin"
    }
    return(async (dispatch, getState)=>{
        try{
            const id = await AsyncStorage.getItem('grow:auth:user')
            database()
            .ref('/book/'+id+"/account/"+kategori+"/"+item.kategori)
            .update({nilai: Number(getState().account[kategori][item.kategori]["nilai"]) + Number(item.nilai)})
            .then(() => console.log('kategori updated'));
        }catch(e){
            console.log(e)
        }
    })
}

export const tutupBuku =(item) =>{
    return(async (dispatch, getState)=>{
        try{
            const id = await AsyncStorage.getItem('grow:auth:user')
            database()
            .ref(
                '/book/'+id+"/transaction/"+getState().misc.year
                +"/"+getState().misc.month+"/saldoAwal")
            .push()
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
            .ref('/book/'+id.replace(/\./gi,'@')+"/"+getState().misc.year+"/"+getState().misc.month+"/account/"+aset+"/"+key)
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
            .ref('/book/'+id.replace(/\./gi,'@')+"/"+getState().misc.year+"/"+getState().misc.month+"/account/"+kategori+"/"+key)
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
                .ref('/book/'+id.replace(/\./gi,'@')+"/"+getState().misc.year+"/"+getState().misc.month+"/account/"+aset)
                .set(item)
                .then(() => console.log('Data set.'));
            }catch(e){
    
            }
        })
    }