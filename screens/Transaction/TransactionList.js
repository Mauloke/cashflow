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
    //this.sections();
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
            onBack: this.props.bukaBuku,
            onSubmit: this.props.emptyList
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
  getAkunName=(key)=>{
    if(key){
      return (Object(this.props.account.asetLancar)[key]["nama"])
    }
  }
  
  getKategoriName=(key)=>{
    if(key){
      if(Object(this.props.account.belanjaRutin)[key]){
        return Object(this.props.account.belanjaRutin)[key]["nama"]
      }else{
        return Object(this.props.account.belanjaNonRutin)[key]["nama"]
      }
    }
  }
  sections =()=>{
    var sections=[]
    var data=[]
    for(var i in this.props.data){
      if(i!="saldoAwal"){
        console.log("i="+JSON.stringify(this.props.data[i]))
        for(var j in this.props.data[i]){
          console.log("j="+JSON.stringify(this.props.data[i][j]))
          data.push(this.props.data[i][j])
        }
        sections.push({title:i,data:data})
        data=[]
      }
    }
    return sections
  }


  render(){
    //console.log(this.props.data)
    return (
      <SectionList
        ListEmptyComponent={()=>{
          //this.props.emptyList(true)
          return(
          <Block center>
            <Button round onPress={()=>{this.bukaBuku()}}>Mulai mencatat</Button>
          </Block>
        )}}
        style={styles.sectionList}
          ItemSeparatorComponent={this.FlatListItemSeparator}
          sections={this.sections()}
          renderSectionHeader={({section}) => {
            //console.log("here:"+section)
            return(
            <Text style={styles.sectionHeaderStyle}>
              {section.title}
            </Text>
          )}}
          renderItem={({item}) => {
            return(
            // Item for the FlatListItems
            <Block style={styles.sectionListItemStyle}>
              <Text style={{width:'50%'}}>
                {this.getKategoriName(item.kategori)}
              </Text>
              <Text style={{width:'50%'}}>
                {item.nilai}
              </Text>
            </Block>
            
          )}}
          keyExtractor={(item, index) => index}
        />
      
    
    
 
  );
  }
}

const styles = StyleSheet.create({
  sectionHeaderStyle: {
    backgroundColor: theme.COLORS.PRIMARY,
    fontSize: 20,
    padding: 5,
    color: '#fff',
  },
  sectionListItemStyle: {
    width: "100%",
        marginBottom: 5,
        padding: 10,
        backgroundColor: "#eee",
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:"space-between"
  },
  listItemSeparatorStyle: {
    
  },
  sectionList:{
    
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