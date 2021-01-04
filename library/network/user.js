import database from '@react-native-firebase/database';

export const addUser = (user) => {
    const id = user.email
    database()
    .ref('/users/'+id.replace(/\./gi,'@'))
    .set({
        email: user.email,
        displayName : user.displayName
    })
    .then(() => console.log('Data set.'));
}