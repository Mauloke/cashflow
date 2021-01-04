import React, {Component} from 'react';
import {
    TouchableOpacity,
    FlatList,
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native'
import { FloatingAction } from "react-native-floating-action";
import Ionicons from 'react-native-vector-icons/Ionicons'

import {connect} from 'react-redux'
import theme from '../../theme'
import {Navigation} from 'react-native-navigation'
import MonthPicker from 'react-native-month-year-picker';
import TransactionList from './TransactionList';


import {getTransaction, setMonth, getAccount, addTransaction} from '../../store/actions/index'
import {Block, Text, NavBar, Icon, Button} from 'galio-framework'



class TransactionScreen extends Component{
    state={
        modalVisible: false,
        showMonthPicker: false,
        month:null,
        year:null,
        formattedMonth: null,
        action: null,
        pos: null,
        selected: {
          nama:null,
          val:null
        },
        notEmpty:false
      }

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }
    componentDidMount(){
        //this.dateSelect(new Date())
        this.start()
    }
    

    openDrawer = () => {
        Navigation.mergeOptions('sideDrawer', {
          sideMenu: {
              left: {
               visible: true
              }
          }
      });
    }


    start=async ()=>{

        let datePicked = new Date();
        const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        let formattedMonth = months[datePicked.getMonth()]+" "+datePicked.getFullYear()
        let month = ("0"+String(datePicked.getMonth()+1)).slice(-2);
        let year = datePicked.getFullYear()
        this.setState({
          month: month,
          year: year,
          formattedMonth: formattedMonth,
          showMonthPicker:false,
      })
      this.props.setMonth(month, year);
        this.props.getTransaction(month, year).then(
          this.setState({notEmpty:true})
        )
        this.props.getAccount(month, year).then(
            ()=>{
              //console.log(Object.keys(this.props.account.asetLancar).length)
                if(Object.keys(this.props.account.asetLancar).length==0){
                  //console.log('here')
                    month = Number(month)-1
                    if(month == 0){
                        month = "12";
                        year = Number(year)-1;
                        console.log("bulan:"+month+",year:"+year)
                    }
                    //this.props.getAccount(month, year)
                }
            }
        )
    }

    dateSelect=(event, selectedDate)=>{
        let datePicked = selectedDate;
        //console.log(datePicked)
        const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        let formattedMonth = months[datePicked.getMonth()]+" "+datePicked.getFullYear()
        let month = ("0"+String(datePicked.getMonth()+1)).slice(-2);
        let year = datePicked.getFullYear()

        console.log("bulan:"+formattedMonth)
        this.setState({
            month: month,
            year: year,
            formattedMonth: formattedMonth,
            showMonthPicker:false,
        })
        this.props.setMonth(month, year);
        //this.props.getAccount(month, year);
        this.props.getTransaction(month, year)
    }

    showMonthPicker =() =>{
        this.setState({showMonthPicker:true})
    }


    fabHandler =(name)=>{
            Navigation.push('CenterScreen', {
                component: {
                  name: name,
                  options: {
                    sideMenu: {
                      left: {
                        visible: false,
                      },
                    },
                  },
                }
              });
    }

    menuHandler=(menu)=>{
    var menuName, idName
    Navigation.push('CenterScreen', {
        component: {
          name: menu,
          options: {
            sideMenu: {
              left: {
                visible: false,
              },
            },
          },
        }
      });
    }
    
    emptyList=()=>{
      this.setState({notEmpty:true})
    }

    render(){
        
        let datePicked = <Text bold color={theme.COLORS.THEME}>Pilih Tanggal</Text>
        if(this.state.formattedMonth){
            datePicked = <Text bold color={theme.COLORS.BLOCK}>{this.state.formattedMonth}<Icon name="chevron-down" family="feather" /></Text>
        }

        function getList(data){
            var dayItem;
            for(var item in data){
                return(
                    <Block><Text>test:{data[item]["keterangan"]}</Text></Block>
                )
            }
            //return dayItem
        }

        //var transactionList;
        /*
        if(!Object.keys(this.props.transaction.transaksi).length){
            transactionList=(
            <Block>
                <Button round onPress={()=>{this.bukaBuku()}}>Buka Buku</Button>
            </Block>
            )
        }else{
            for(var date in this.props.transaction.transaksi){
                transactionList=(
                    <Block>
                        <Text>{date}</Text>
                        <Block>{getList(this.props.transaction.transaksi[date])}</Block>
                    </Block>
                )
            }
        }
        */
       const actions = [
        {
          text: "Penyesuaian Akun",
          icon: <Icon name="edit" family="feather" size={15} color={theme.COLORS.WHITE} />,
          name: "bt_penyesuaian",
          position: 2,
        },
        {
          text: "Transaksi",
          icon: <Icon name="edit" family="feather" size={15} color={theme.COLORS.WHITE} />,
          name: "GROW.AddTransactionScreen",
          position: 1,
        },
      ];

      
    
        return(
            <Block flex >
                {this.state.showMonthPicker && (<MonthPicker
          onChange={this.dateSelect}
          value={new Date()}
          minimumDate={new Date(1990,1)}
          maximumDate={new Date()}
        />)}
                <NavBar
                title={(<TouchableOpacity onPress={this.showMonthPicker}>
                        <Block center>
                            <Text>Transaksi:</Text>
                            {datePicked}
                        </Block>
                        </TouchableOpacity>
                    )}
                left={(
                  <TouchableOpacity onPress={this.openDrawer}>
                    <Icon 
                      name="menu"
                      family="feather"
                      size={theme.SIZES.BASE}
                      color={theme.COLORS.ICON}
                    />
                  </TouchableOpacity>
                )}
                style={Platform.OS === 'android' ? { marginTop: 0 } : null}
              />
              <TransactionList style={styles.container} 
              data={this.props.transaction.transaksi} 
              bukaBuku={this.start} 
              emptyList={this.emptyList}
              />
              <FloatingAction
                    actions={actions}
                    position="right"
                    onPressItem={this.fabHandler}
                    visible={this.state.notEmpty}
                /> 
            </Block>
        )
        
    }
}

const styles = StyleSheet.create({
  container:{
  },
    actionButtonIcon: {
        position:'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50
    },
  });

const mapStateToProps = (state, ownProps) => {
    return {
        transaction: state.transaction,
        account: state.account,
        misc: state.misc
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setMonth: (month, year) => dispatch(setMonth(month, year)),
        getTransaction: (month,year) =>  dispatch(getTransaction(month, year)),
        getAccount: (month,year) =>  dispatch(getAccount(month, year)),
        addTransaction: (item, date, month, year) => dispatch(addTransaction(item, date, month, year))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionScreen)