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
import { setPenghasilan, setPengeluaran, setTabungan } from '../../store/actions/account';

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
        },
        penghasilan:0,
        pengeluaran: 0,
        tabungan: 0
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

    updateInputState =(key, val)=>{
      this.setState({[key]:val})
    }

    saveAset =() =>{
      if(this.state.pengeluaran!=0){
        this.props.setPenghasilan(this.state.penghasilan)
        this.props.setPengeluaran(this.state.pengeluaran)
        this.props.setTabungan(this.state.tabungan)
        Navigation.push('CenterScreen', {
          component: {
            name: 'GROW.HealthResult',
            options: {
              sideMenu: {
                left: {
                  visible: false,
                },
              },
            },
          }
        });
      }else{
        alert("mohon isi pengeluaran")
      }
      
    }

    render(){
        let datePicked = <Text bold color={theme.COLORS.THEME}>Pilih Tanggal</Text>
        if(this.state.formattedMonth){
            datePicked = <Text bold color={theme.COLORS.BLOCK}>{this.state.formattedMonth}<Icon name="chevron-down" family="feather" /></Text>
        }
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
                title="Health Check"
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

                <Swiper 
                style={styles.wrapper} 
                showsButtons={true}
                loop={false}
                autoplay={false}>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Rekening</Text>
            <Text h5>Masukkan rekening yang anda miliki</Text>
            <Text>Mis: uang di dompet, akun bank</Text>
            <Button round iconFamily="ionicon" icon="add" onPress={()=>{this.showModal("Rekening")}}>Tambah</Button>
            <AccountList aset={this.props.asetLancar} kategori="Rekening" onItemSelected={this.itemSelectedHandler}/>
          </Block>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Investasi</Text>
            <Text h5>Masukkan Investasi yang anda miliki</Text>
            <Text>Mis: saham, deposito, emas, dll</Text>
            <Button round iconFamily="ionicon" icon="add" onPress={()=>{this.showModal("Investasi")}}>Tambah</Button>
            <AccountList aset={this.props.asetInvestasi} kategori="Investasi" onItemSelected={this.itemSelectedHandler}/>
          </Block>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Aset Lain</Text>
            <Text h5>Masukkan Aset Lain yang anda miliki</Text>
            <Text>Mis: rumah, ruko, tanah, dll</Text>
            <Button round iconFamily="ionicon" icon="add" onPress={()=>{this.showModal("Aset Lain")}}>Tambah</Button>
            <AccountList aset={this.props.asetGuna} kategori="Aset Lain" onItemSelected={this.itemSelectedHandler}/>
          </Block>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Piutang</Text>
            <Text h5>Masukkan Piutang/Pinjaman yang anda berikan</Text>
            <Button round iconFamily="ionicon" icon="add" onPress={()=>{this.showModal("Piutang")}}>Tambah</Button>
            <AccountList aset={this.props.asetLancar} kategori="Piutang" onItemSelected={this.itemSelectedHandler}/>
          </Block>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Utang</Text>
            <Text h5>Masukkan Utang yang anda miliki</Text>
            <Text>Mis: kredit rumah, kredit kendaraan, dll</Text>
            <Button round iconFamily="ionicon" icon="add" onPress={()=>{this.showModal("Utang")}}>Tambah</Button>
            <AccountList aset={this.props.utang} kategori="Utang" onItemSelected={this.itemSelectedHandler}/>
          </Block>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Penghasilan</Text>
            <Text h5>Masukkan sumber Penghasilan yang anda miliki</Text>
            <Input
            rounded
            placeholder="Penghasilan bulanan"
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            type="numeric"
            onChangeText={(val) => this.updateInputState('penghasilan', val)}
            />
          </Block>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Pengeluaran</Text>
            <Text h5>Total pengeluaran bulanan</Text>
            <Input
            rounded
            placeholder="Pengeluaran bulanan"
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            type="numeric"
            onChangeText={(val) => this.updateInputState('pengeluaran', val)}
            />
          </Block>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Tabungan</Text>
            <Text h5>Berapa anda menyisihkan {"\n"}tiap bulan</Text>
            <Input
            rounded
            type="numeric"
            placeholder="Tabung bulanan"
            placeholderTextColor={theme.COLORS.PLACEHOLDER}
            onChangeText={(val) => this.updateInputState('tabungan', val)}
            />
          </Block>
          <Block flex style={styles.slide1}>
              <Text h1>Siap lanjutkan?</Text>
              <Button
               iconFamily="ionicon" 
               icon="chevron-forward-outline" 
               onPress={this.saveAset}
               >Analisa</Button>
               <Text h5>swipe ke kiri untuk kembali</Text>
              
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
      asetLancar: state.account.asetLancar,
      asetInvestasi: state.account.asetInvestasi,
      asetGuna: state.account.asetGuna,
      utang: state.account.utang,
      modal: state.account.modal,
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
      setPenghasilan:(val) => dispatch(setPenghasilan(val)),
      setPengeluaran:(val) => dispatch(setPengeluaran(val)),
      setTabungan:(val) => dispatch(setTabungan(val)),
      }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Account);