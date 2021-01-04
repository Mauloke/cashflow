import React, {Component} from 'react'
import {connect} from 'react-redux'
import { 
    Block,
    NavBar,
    Icon,
    Input,
    Text,
    DeckSwiper,
    Button
} from 'galio-framework';

import {
    NavigationComponent,
    Navigation,
    NavigationComponentProps,
    NavigationButtonPressedEvent,
    Options, OptionsModalPresentationStyle
  } from 'react-native-navigation';

  import{
      StyleSheet,
      TouchableOpacity, FlatList,
  } from 'react-native'
  import Swiper from 'react-native-swiper'
  import MonthPicker from 'react-native-month-year-picker';

  import theme from '../../theme';
  import { getAccount, setMonth, closeAccount, initAccount, addModal } from '../../store/actions/index';
  import {MainScreen} from '../../navigations'
  import AccountList from '../../components/AccountList/AccountList'
  



class addAccountScreen extends Component{
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    componentDidMount(){
      //this.props.getAccount()
      this.start();
      this.props.initAccount({nama:"Gaji",nilai:'0'},"penghasilan")
      this.props.initAccount({nama:"kebutuhan rumah tangga",nilai:'0'},"belanjaRutin")
      this.props.initAccount({nama:"kebutuhan pribadi",nilai:'0'},"belanjaRutin")
      this.props.initAccount({nama:"telpon, internet, listrik",nilai:'0'},"belanjaRutin")
      this.props.initAccount({nama:"transportasi umum",nilai:'0'},"belanjaRutin")
      this.props.initAccount({nama:"BBM, parkir",nilai:'0'},"belanjaRutin")
      this.props.initAccount({nama:"Zakat, infak, sedekah, sumbangan",nilai:'0'},"belanjaRutin")
      this.props.initAccount({nama:"Asuransi",nilai:'0'},"belanjaRutin")
      this.props.initAccount({nama:"Dokter",nilai:'0'},"belanjaNonRutin")
      this.props.initAccount({nama:"Pendidikan",nilai:'0'},"belanjaNonRutin")
      this.props.initAccount({nama:"Pajak kendaraan",nilai:'0'},"belanjaNonRutin")
      //this.props.addAccount({nama:"Saldo Awal",nilai:"0"},"modal")
      //this.props.addAccount({nama:"Saldo Tambahan",nilai:"0"},"modal")
      //this.props.addAccount({nama:"Saldo Awal",nilai:"0"},"modal")
      //this.props.addAccount({nama:"Saldo Penyesuaian",nilai:"0"},"modal")
      //this.props.addAccount({nama:"Akumulasi",nilai:"0"},"modal")
      //this.props.addAccount({saldoAwal:"0", saldoTambahan:"0",saldoPenyesuaian:"0",akumulasi:"0"},"modal")
      //var saldoAwal = this.props.modal[Object.keys(this.props.modal)[0]]["saldoAwal"]
    }

    componentWillUnmount(){
      this.props.closeAccount();
    }

    state={
      modalVisible: false,
      showMonthPicker: false,
      month:null,
      year:null,
      formattedMonth:null,
      action: null,
      pos: null,
      selected: {
        nama:null,
        val:null
      }
    }
    

    navigationButtonPressed({buttonId}) {
        if (buttonId === 'sideMenu') {
            Navigation.mergeOptions('sideDrawer', {
                sideMenu: {
                    left: {
                     visible: true
                    }
                }
            });
        }
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

    showMonthPicker =() =>{
      this.setState({showMonthPicker:true})
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

    dateSelect=(event, selectedMonth)=>{
      console.log(selectedMonth)
      let datePicked = selectedMonth;
      const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      let formattedMonth = months[datePicked.getMonth()]+" "+datePicked.getFullYear()
      let month = ("0"+String(datePicked.getMonth()+1)).slice(-2);
      let year = datePicked.getFullYear()
      //console.log(formattedMonth)
      this.setState({
        month: month,
        year: year,
        formattedMonth: formattedMonth,
        showMonthPicker:false,
      })
      this.props.setMonth(month,year);
      this.props.getAccount(month, year)
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
      if(this.state.month!=null){
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

    saveAset=async()=>{
      if(
        !this.props.asetLancar
        ){
        alert("Minimal anda harus mengisi aset lancar")
      }
      else{
        await this.updateModal()
        this.props.closeAccount()
        Navigation.setRoot(MainScreen)
      }
      
    }

    updateModal=()=>{
      var nilai=0;
      for(var item in this.props.asetLancar){
        nilai -= Number(this.props.asetLancar[item]["nilai"]);
      }
      console.log(nilai)
      for(var item in this.props.asetInvestasi){
        nilai -= Number(this.props.asetInvestasi[item]["nilai"]);
      }
      console.log(nilai)
      for(var item in this.props.asetGuna){
        nilai -= Number(this.props.asetGuna[item]["nilai"]);
      }
      console.log(nilai)
      for(var item in this.props.utang){
        nilai -= Number(this.props.utang[item]["nilai"]);
      }
      console.log(nilai)
      this.props.addModal(nilai.toString(),"saldoAwal")
    }
    

    render(){
      let datePicked = <Text bold color={theme.COLORS.THEME}>Pilih Bulan</Text>
      if(this.state.formattedMonth){
        datePicked = <Text bold color={theme.COLORS.BLOCK}>{this.state.formattedMonth}</Text>
      }
      /*
      let piutang = []
      for(const name in this.props.asetLancar){
        console.log(name)        
      }
*/
      return (
        <Swiper 
        style={styles.wrapper} 
        showsButtons={true}
        loop={false}
        autoplay={false}>
          <Block style={styles.slide1} flex>
            <Text h1 bold>Halo</Text>
            <Text h5>Mari Mulai!</Text>
            <Text h5>Catat posisi keuanganmu</Text>
            <Text muted>{this.state.formattedMonth}</Text>
            
          </Block>
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
            <Text>Mis: rumah, ruko, tanah, kendaraan, dll</Text>
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
            <Button round iconFamily="ionicon" icon="add" onPress={()=>{this.showModal("Penghasilan")}}>Tambah</Button>
            <AccountList aset={this.props.penghasilan} kategori="Penghasilan" onItemSelected={this.itemSelectedHandler}/>
          </Block>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Belanja Rutin</Text>
            <Text h5>Kategori Belanja Rutin yang biasa dilakukan</Text>
            <Button round iconFamily="ionicon" icon="add" onPress={()=>{this.showModal("Belanja Rutin")}}>Tambah</Button>
            <AccountList aset={this.props.belanjaRutin} kategori="Belanja Rutin" onItemSelected={this.itemSelectedHandler}/>
          </Block>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Belanja Non Rutin</Text>
            <Text h5>Kategori Belanja Non Rutin</Text>
            <Button round iconFamily="ionicon" icon="add" onPress={()=>{this.showModal("Belanja Non Rutin")}}>Tambah</Button>
            <AccountList aset={this.props.belanjaNonRutin} kategori="Belanja Non Rutin" onItemSelected={this.itemSelectedHandler}/>
          </Block>
          <Block flex style={styles.slide1}>
              <Text h1>Selesai</Text>
              <Text h5>Klik Lanjutkan,{"\n"}atau{"\n"}swipe ke kiri untuk kembali</Text>
              <Button
               round 
               iconFamily="ionicon" 
               icon="chevron-forward-outline" 
               onPress={this.saveAset}
               >Lanjutkan</Button>
          </Block>
        </Swiper>
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

const mapStateToProps = state =>{
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
    initAccount:(item, aset)=>dispatch(initAccount(item, aset)),
    addModal: (kategori,key) => dispatch(addModal(kategori,key))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(addAccountScreen);