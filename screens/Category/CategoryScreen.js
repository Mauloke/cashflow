import React, {Component} from 'react'
import{
    StyleSheet,
    TouchableOpacity, FlatList,
} from 'react-native'
import {connect} from 'react-redux'
import { 
    Block,
    NavBar,
    Icon,
    Input,
    Text,
    Button
} from 'galio-framework';
import theme from '../../theme'
import {Navigation} from 'react-native-navigation'
import Swiper from 'react-native-swiper'
import MonthPicker from 'react-native-month-year-picker';
import AccountList from '../../components/AccountList/AccountList';
import { getAccount, setMonth, closeAccount, addAccount } from '../../store/actions/index';

class Account extends Component{
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

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
        }
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

    popBack =() =>{
      Navigation.pop('CenterScreen')
    }

    start=()=>{
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
        this.props.getAccount(month, year)
    }

    dateSelect=(event, selectedDate)=>{
        let datePicked = selectedDate;
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
        this.props.getAccount(month, year);
    }

    itemSelectedHandler=(key,aset, kategori)=>{
      const selAset = aset[key]
      Navigation.showModal({
        component: {
          name: 'GROW.AccountModalScreen',
          id: 'AccountModalScreen',
          options: {
            modalPresentationStyle: 'overCurrentContext',
            layout: {
              backgroundColor: theme.COLORS.NEUTRAL
            }
          },
          passProps: {
            akun: kategori,
            keyAset: key,
            aset:aset,
            selAset:selAset,
            status: "edit",
          },
         
        },
      });
    }

    showModal=(akun)=>{
      if(this.props.misc.month!=null){
        Navigation.showModal({
          component: {
            name: 'GROW.AccountModalScreen',
            id: 'AccountModalScreen',
            options: {
              modalPresentationStyle: 'overCurrentContext',
              layout: {
                backgroundColor: theme.COLORS.NEUTRAL
              }
            },
            
            passProps: {
              akun: akun,
              status: "new"
            },
           
          },
        });
      }else{
        alert("pilih tanggal terlebih dahulu")
      }
      
    }

    showMonthPicker =() =>{
        this.setState({showMonthPicker:true})
    }
    render(){
        /*
        let piutang = []
      for(const name in this.props.asetLancar){
        console.log(name)        
      }
      */
        return(
            <Block safe flex>
               {this.state.showMonthPicker && (<MonthPicker
          onChange={this.dateSelect}
          value={new Date()}
          minimumDate={new Date(1990,1)}
          maximumDate={new Date()}
        />)}
              <NavBar
                title={(<TouchableOpacity onPress={this.showMonthPicker}>
                        <Block center>
                            <Text>Kategori</Text>
                        </Block>
                        </TouchableOpacity>
                    )}
                left={(
                  <TouchableOpacity onPress={this.popBack}>
                    <Icon 
                      name="chevron-left"
                      family="feather"
                      size={theme.SIZES.BASE}
                      color={theme.COLORS.ICON}
                    />
                  </TouchableOpacity>
                )}
                style={Platform.OS === 'android' ? { marginTop: 0 } : null}
              />

                <Swiper 
                style={styles.wrapper} 
                showsButtons={true}
                loop={false}
                autoplay={false}>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Penghasilan</Text>
            <Text h5>Masukkan sumber Penghasilan yang anda miliki</Text>
            <Button round iconFamily="ionicon" icon="add" onPress={()=>{this.showModal("Penghasilan")}}>Tambah</Button>
            <AccountList aset={this.props.penghasilan} kategori="Penghasilan" onItemSelected={this.itemSelectedHandler}/>
          </Block>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Belanja Rutin</Text>
            <Text h5>Masukkan Belanja Rutin yang biasa dilakukan</Text>
            <Button round iconFamily="ionicon" icon="add" onPress={()=>{this.showModal("Belanja Rutin")}}>Tambah</Button>
            <AccountList aset={this.props.belanjaRutin} kategori="Belanja Rutin" onItemSelected={this.itemSelectedHandler}/>
          </Block>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Belanja Non Rutin</Text>
            <Text h5>Masukkan Belanja Non Rutin</Text>
            <Button round iconFamily="ionicon" icon="add" onPress={()=>{this.showModal("Belanja Non Rutin")}}>Tambah</Button>
            <AccountList aset={this.props.belanjaNonRutin} kategori="Belanja Non Rutin" onItemSelected={this.itemSelectedHandler}/>
          </Block>
                </Swiper>
            </Block>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slide2: {
      flex: 1,
      padding:10
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#92BBD9'
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold'
    }
  })

  const mapStateToProps = state => {
    return{
      user: state.auth.user,
      misc: state.misc,
      penghasilan: state.account.penghasilan,
      belanjaRutin: state.account.belanjaRutin,
      belanjaNonRutin: state.account.belanjaNonRutin
      }
}

const mapDispatchToProps = dispatch => {
    return{
      setMonth: (month, year) => dispatch(setMonth(month, year)),
      getAccount: (month,year) => dispatch(getAccount(month,year)),
      closeAccount: () => dispatch(closeAccount()),
      }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Account);