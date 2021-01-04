import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CurrencyFormatter from 'react-native-currency-formatter'

const listItem = (props) => (
    <TouchableOpacity onPress={props.onItemPressed}>
        <View style={styles.listItem} key={props.AsetKey}>
            <Text style={{width:'50%', textAlign:'center'}}>{props.AsetName}</Text>
            <Text style={{width:'50%', textAlign:'center'}}>{!props.AsetValue?"0":CurrencyFormatter(Number(props.AsetValue))}</Text>
        </View>
    </TouchableOpacity>
    
);

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