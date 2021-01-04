import React from 'react';
import {TouchableOpacity, TouchableNativeFeedback, Platform, Text, View, StyleSheet} from 'react-native';

const buttonWBackground = props =>{
    const content=(
        <View style={[styles.button, {backgroundColor:props.color}, props.disabled ? styles.disabled : null ]}>
            <Text style={props.disabled ? styles.disabledText : null}>{props.children}</Text>
        </View>
    )
    if (props.disable){
        return content;
    }
    if(Platform.OS === 'android'){
        return(
            <TouchableNativeFeedback onPress={props.onPress}>
                {content}
            </TouchableNativeFeedback>
        )
    }
    return(
        <TouchableOpacity onPress={props.onPress}>
            {content}
        </TouchableOpacity>
    )
}
    


const styles = StyleSheet.create({
    button:{
        padding:10,
        margin:5,
        borderRadius:5,
        borderWidth:1,
        borderColor:'black'
    },
    disabled:{
        backgroundColor: '#eee',
       
        borderColor: '#aaa'
    },
    disabledText:{
        color: '#aaa'
    }
})
export default buttonWBackground;