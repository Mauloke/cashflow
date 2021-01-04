import React, {Component} from 'react';
import {connect} from 'react-redux'
import { StyleSheet, FlatList, SectionList } from 'react-native';
import {Block, Text, Button, Icon} from 'galio-framework';
import { addTransaction, getAccount, newAccount } from '../../store/actions/index';
import {Navigation} from 'react-native-navigation'
import theme from '../../theme'


import ListItem from './ListItem';


class transactionList extends Component{
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    //console.log(this.props)
    this.sections();
  }

  bukaBuku=()=>{
      Navigation.push('CenterScreen', {
        component: {
          name: 'GROW.BukaBuku',
          options: {
            sideMenu: {
              left: {
                visible: false,
              },
            },
          },
          passProps:{
            onBack: this.props.bukaBuku
          }
        }
      });
    
  }
  bukaBuku1=()=>{
    this.props.newAccount(this.props.account)
    var data={keterangan:null,item:[]};
    for(var item in this.props.account.asetLancar){
        data.item.push({
            akun:this.props.account.asetLancar[item]["nama"],
            nilai:this.props.account.asetLancar[item]["nilai"]
        })
    }
    for(var item in this.props.account.asetInvestasi){
        data.item.push({
            akun:this.props.account.asetInvestasi[item]["nama"],
            nilai:this.props.account.asetInvestasi[item]["nilai"]
        })
    }
    for(var item in this.props.account.asetGuna){
        data.item.push({
            akun:this.props.account.asetGuna[item]["nama"],
            nilai:this.props.account.asetGuna[item]["nilai"]
        })
    }
    for(var item in this.props.account.utang){
        data.item.push({
            akun:this.props.account.utang[item]["nama"],
            nilai:this.props.account.utang[item]["nilai"]
        })
    }
    data.item.push({
        akun:"Saldo Awal",
        nilai:this.props.account.saldoAwal
    })
    data.keterangan="Saldo Awal"
    //console.log(data)
            this.props.addTransaction(data,"00", this.props.misc.month, this.props.misc.year)
    //this.props.addTransaction(data,"00", this.props.misc.month, this.props.misc.year)
  }

  FlatListItemSeparator = () => {
    return (
      //Item Separator
      <Block style={styles.listItemSeparatorStyle} />
    );
  };

  sections =()=>{
    var sections=[]
    for(var item in this.props.data){
      //console.log(this.props.data[item])
      sections.push({title:item,data:this.props.data[item]})
    }
    console.log(sections)
  }


  render(){
    //console.log(this.props.data)
    return (
      
      <FlatList 
      style={styles.listContainer} 
      data={Object.keys(this.props.transaction)}
      ListEmptyComponent={()=>(
        <Block center>
          <Button round onPress={()=>{this.bukaBuku()}}>Mulai mencatat</Button>
        </Block>
      )}
      keyExtractor={(item, index) => index.toString()}
      renderItem={(item,index)=>{
        var data = this.props.data[item.item]
          //console.log(data)
          if(item.item=='saldoAwal'){
            var items;
            for(var i in data){
              items =+ (<Text>1</Text>)
            }
            return(
              
              <Block>
                <Text>{item.item}</Text>
              </Block>
            )
          }else{
            return(
            <Block>
              <Text>{item.item}</Text>
              <Text>{data[Object.keys(data)].keterangan}</Text>
            </Block>
          )
          }
          
          
      }} /> 
    
    
 
  );
  }
}

const styles = StyleSheet.create({
    listContainer: {
    }
});

const mapStateToProps = (state, ownProps) => {
  return {
    account: state.account,
    transaction: state.transaction.transaksi,
    misc: state.misc
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAccount: (month,year) =>  dispatch(getAccount(month, year)),
    addTransaction: (item, date, month, year) => dispatch(addTransaction(item, date, month, year)),
    newAccount: (item) => dispatch(newAccount(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(transactionList);