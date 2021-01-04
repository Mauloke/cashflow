import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';

var db;
export const getCategory = () => {
    return(async (dispatch)=>{
        try {
            const id = await AsyncStorage.getItem('grow:auth:user')
            db = database()
            .ref('/category/'+id.replace(/\./gi,'@'))
            .on('value',snapshot => {
                if(snapshot.exists()){
                    dispatch(setCategory(snapshot.val()))
                }else{
                    dispatch(resetCategory())
                }
            });
        } catch(e) {
            console.log(e)
            }
    })
}