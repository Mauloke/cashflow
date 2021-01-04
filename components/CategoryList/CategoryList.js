import React from 'react';
import { TouchableOpacity,View, StyleSheet, FlatList,  } from 'react-native';
import {Block, Text} from 'galio-framework';

//import ListItem from '../ListItem/ListItem';

const categoryList = props => {
    return (
        <FlatList 
        style={styles.listContainer} 
        data={props.category}
        ListEmptyComponent={()=>(<Block center><Text>--Empty--</Text></Block>)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}, index, separator)=>{
            return(
              <TouchableOpacity onPress={props.onItemPressed}>
                <Block style={styles.listItem} key={index}>
                    <Text >{item}</Text>
                </Block>
            </TouchableOpacity> 
            )
        }} />
    );
};

const styles = StyleSheet.create({
    listContainer: {
    },
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

export default categoryList;