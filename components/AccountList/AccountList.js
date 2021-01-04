import React from 'react';
import { View, StyleSheet, FlatList,  } from 'react-native';
import {Block, Text} from 'galio-framework';

import ListItem from './ListItem';

const accountList = props => {
  var aset={};
if(props.kategori=="Rekening"){
  for(var item in props.aset){
    if(!props.aset[item]["nama"].startsWith("Piutang")){
      aset[item] = props.aset[item]
    }
  }
}else if(props.kategori=="Piutang"){
  for(var item in props.aset){
    if(props.aset[item]["nama"].startsWith("Piutang")){
      aset[item] = props.aset[item]
    }
  }
}else{
  aset=props.aset
}
  

    return (
        <FlatList 
        style={styles.listContainer} 
        data={Object.keys(aset)}
        ListEmptyComponent={()=>(<Block center><Text>--Empty--</Text></Block>)}
        ListHeaderComponent={()=>{
          if(
            props.kategori=="Penghasilan"||
            props.kategori=="Belanja Rutin"||
            props.kategori=="Belanja Non Rutin"
            ){
            return(
              <Block row>
              <Text bold style={{width:'100%', textAlign:'center'}} >Nama</Text>
            </Block>
            )
          }else{
            return(
            <Block row>
              <Text bold style={{width:'50%', textAlign:'center'}} >Nama</Text>
              <Text bold style={{width:'50%', textAlign:'center'}} >Nilai</Text>
            </Block>
            )
          }
        }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item, index, separator)=>{
            return(
              <ListItem 
              AsetName={props.aset[item.item].nama}
              AsetValue={props.aset[item.item].nilai}
              AsetKey={item.item}
              Kategori={props.kategori}
              onItemPressed={()=>props.onItemSelected(item.item, props.aset, props.kategori)} />
            )
            
        }} />
    );
};

const styles = StyleSheet.create({
    listContainer: {
    }
});

export default accountList;