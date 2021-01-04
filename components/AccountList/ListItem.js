import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CurrencyFormatter from 'react-native-currency-formatter'

const formatNilai = (nilai) =>{
    if(Number(nilai)<0){
        return "("+CurrencyFormatter(Math.abs(nilai))+")"
    }
    else{
        return CurrencyFormatter(Number(nilai))
    }
}

const listItem = (props) => {
    if(
        props.Kategori=="Penghasilan"||
        props.Kategori=="Belanja Rutin"||
        props.Kategori=="Belanja Non Rutin"
        ){
        return(
        <TouchableOpacity onPress={props.onItemPressed}>
            <View style={styles.listItem} key={props.AsetKey}>
                <Text style={{width:'100%', textAlign:'center'}}>{props.AsetName}</Text>
            </View>
        </TouchableOpacity>
        )
    }else{
        return(
            <TouchableOpacity onPress={props.onItemPressed}>
                <View style={styles.listItem} key={props.AsetKey}>
                    <Text style={{width:'50%', textAlign:'center'}}>{props.AsetName}</Text>
                    <Text style={{width:'50%', textAlign:'center'}}>{!props.AsetValue?"0":formatNilai(props.AsetValue)}</Text>
                </View>
            </TouchableOpacity>
            
        )
    }
    };

const styles = StyleSheet.create({
    listItem: {
        width: "100%",
        marginBottom: 5,
        padding: 10,
        backgroundColor: "#eee",
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:"space-between"
    },
});

export default listItem;