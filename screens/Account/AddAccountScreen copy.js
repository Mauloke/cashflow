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
  import DateTimePicker from '@react-native-community/datetimepicker';
  import AsetList from '../../components/AsetList/AsetList';

  import theme from '../../theme';
  import { addDBWealth } from '../../store/actions/index';
  import {WealthScreen} from '../MainTabs/mainTabs'


export const ListItem = (props) => (
    <TouchableOpacity onPress={props.onItemPressed} >
        <Block space='between' row>
          <Text>{props.WealthName}</Text>
          <Text>{props.WealthVal}</Text>
        </Block>
    </TouchableOpacity>
    
);
const WealthList = props => {
  return (
      <FlatList 
      data={props.data}
      renderItem={(info)=>(
        <ListItem 
        WealthName={info.item.name}
        WealthVal = {info.item.val} />
      )} />
  );
};

class addWealthScreen extends Component{
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        const user = this.props.user
    }

    componentDidAppear(){
      //this.props.onLoading()
    }

    state={
      modalVisible: false,
      showDatePicker: false,
      date: null,
      month:null,
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

    onModalSubmit = (selected) => {
      this.setModalVisible(false, null, null)
      //this.props.addWealth(this.state.selected)
      this.setState(prevState=>{
        return{
          harta:[
            ...prevState.harta,
            {selected}
          ]
        }
        
      })

    }

    setModalVisible = (visible, action, pos) => {
      this.setState({ 
        modalVisible: visible,
        action: action,
        pos: pos,
       });
    }
    onModalClose =(selected) =>{
      console.log("modal closed")
    }
    modalHandler =(name,val) =>{
      this.setState(prevState => {
        return{
          selected:{
            ...prevState.selected,
            [name]:val,
          }
        }}
        )
    }
    showDatePicker =() =>{
      this.setState({showDatePicker:true})
    }
    dateSelect=(event, selectedDate)=>{
      let datePicked = selectedDate;
      const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      let formattedDate = datePicked.getDate()+" / "+months[datePicked.getMonth()+1]+" / "+datePicked.getFullYear()
      let formattedMonth = String(datePicked.getMonth()+1)+String(datePicked.getFullYear());
      console.log(formattedMonth)
      this.setState({
        date:formattedDate,
        month: formattedMonth,
        showDatePicker:false,
      })
    }

    itemSelectedHandler=(key,aset, kategori)=>{
      const selAset = aset[key]
      Navigation.showModal({
        component: {
          name: 'GROW.WealthModalScreen',
          id: 'WealthModalScreen',
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
      Navigation.showModal({
        component: {
          name: 'GROW.WealthModalScreen',
          id: 'WealthModalScreen',
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
    }

    saveAset=()=>{
      if(this.state.month==null){
        alert("Anda belum memilih tanggal")
      }
      else{
        this.props.addWealth(this.state.month,this.props.wealth);
        Navigation.setRoot(WealthScreen)
      }
      
    }
    

    render(){
      let datePicked = <Text bold color={theme.COLORS.THEME}>Pilih Tanggal</Text>
      if(this.state.date){
        datePicked = <Text bold color={theme.COLORS.BLOCK}>{this.state.date}</Text>
      }

      return (
        <Swiper 
        style={styles.wrapper} 
        showsButtons={true}
        loop={false}
        autoplay={false}>
          <Block style={styles.slide1} flex>
            <Text h1 bold>Halo</Text>
            <Text h5>Mari Mulai Mencatat!</Text>
            <Text>Tanggal Laporan</Text>
            <TouchableOpacity onPress={this.showDatePicker}>
              {datePicked}
            </TouchableOpacity>
            {this.state.showDatePicker && (<DateTimePicker
              testID="dateTimePicker"
              value={new Date()}
              mode='date'
              is24Hour={false}
              display="default"
              onChange={this.dateSelect}
            />)}
            
          </Block>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Rekening</Text>
            <Text h5>Masukkan rekening yang anda miliki</Text>
            <Text>Mis: uang di dompet, akun bank</Text>
            <Button round iconFamily="ionicon" icon="add" onPress={()=>{this.showModal("Rekening")}}>Tambah</Button>
            <AsetList aset={this.props.asetLancar} kategori="Rekening" onItemSelected={this.itemSelectedHandler}/>
          </Block>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Investasi</Text>
            <Text h5>Masukkan Investasi yang anda miliki</Text>
            <Text>Mis: saham, deposito, emas, dll</Text>
            <Button round iconFamily="ionicon" icon="add" onPress={()=>{this.showModal("Investasi")}}>Tambah</Button>
            <AsetList aset={this.props.asetInvestasi} kategori="Investasi" onItemSelected={this.itemSelectedHandler}/>
          </Block>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Aset Lain</Text>
            <Text h5>Masukkan Aset Lain yang anda miliki</Text>
            <Text>Mis: rumah, ruko, tanah, dll</Text>
            <Button round iconFamily="ionicon" icon="add" onPress={()=>{this.showModal("Aset Lain")}}>Tambah</Button>
            <AsetList aset={this.props.asetGuna} kategori="Aset Lain" onItemSelected={this.itemSelectedHandler}/>
          </Block>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Piutang</Text>
            <Text h5>Masukkan Piutang/Pinjaman yang anda berikan</Text>
            <Button round iconFamily="ionicon" icon="add" onPress={()=>{this.showModal("Piutang")}}>Tambah</Button>
            <AsetList aset={this.props.asetLancar} kategori="Piutang" onItemSelected={this.itemSelectedHandler}/>
          </Block>
          <Block flex style={styles.slide2}>
            <Text h1 bold>Utang</Text>
            <Text h5>Masukkan Utang yang anda miliki</Text>
            <Text>Mis: kredit rumah, kredit kendaraan, dll</Text>
            <Button round iconFamily="ionicon" icon="add" onPress={()=>{this.showModal("Utang")}}>Tambah</Button>
            <AsetList aset={this.props.utang} kategori="Utang" onItemSelected={this.itemSelectedHandler}/>
          </Block>
          <Block flex style={styles.slide1}>
              <Text h1>Selesai</Text>
              <Text h5>Klik Lanjutkan,{"\n"}atau{"\n"}swipe ke kiri untuk kembali</Text>
              <Text p>setelah anda lanjutkan anda tidak bisa merubah harta anda</Text>
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
    asetLancar: state.wealth.asetLancar,
    asetInvestasi: state.wealth.asetInvestasi,
    asetGuna: state.wealth.asetGuna,
    utang: state.wealth.utang,
    wealth: state.wealth
  }
}

const mapDispatchToProps = dispatch => {
  return{
    //onLoading : () => dispatch(getWealth()),
    addWealth: (tanggal,aset) => dispatch(addDBWealth(tanggal,aset))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(addWealthScreen);