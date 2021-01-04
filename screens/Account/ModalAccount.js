import React, {Component} from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Dimensions,
} from 'react-native'
import{
    Block,
    Text,
    Input,
    Checkbox,
    NavBar,
    Button,
    Icon,
} from 'galio-framework'
import theme from '../../theme';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {
  initAccount,
  updateAccount,
  remAccount,
  addModal
} from '../../store/actions/index'

const { width } = Dimensions.get('screen');

class modalAccount extends Component {

  state = {
    nama: '',
    nilai: '',
    tambahan: ''
  }




  constructor(props){
    super(props);
  }
  componentDidMount(){
    switch(this.props.akun){
      case "Piutang":
        this.setState({nama:"Piutang "})
        break;
      case "Utang":
        this.setState({nama:"Utang "})
        break;
    }
    console.log("this:"+this.props.keyAset)
    if(this.props.aset){
      this.setState(this.props.selAset)
    }
  }
  

  updateInputState =(key, val)=>{
      this.setState({[key]:val})
  }

  closeModal = async () =>{
    await Navigation.dismissModal(this.props.componentId);
  }

  submitAccount =(tabel) =>{
    let nilai = Number(this.state.nilai)
    if(typeof nilai === 'number' && isFinite(nilai)){
      if(this.state.nama){
        this.props.initAccount(this.state, tabel)
        //this.setState({nama:"saldo awal"})
        //this.updateModal("saldoAwal")
      }
      this.closeModal()
    }else{
      alert("masukkan nilai valid")
    }
  }


  editAccount =(tabel)=>{
    let nilai = Number(this.state.nilai)
    if(typeof nilai === 'number' && isFinite(nilai)){
    let tempState = this.props.aset;
    tempState[this.props.keyAset] = this.state;
    this.props.updateAccount(this.state, this.props.keyAset, tabel)
    //this.updateSaldoAwal()
    this.closeModal()
    }else{
      alert("masukan nilai valid")
    }
  }

  deleteAccount=(tabel)=>{
    this.props.remAccount(tabel,this.props.keyAset)
    this.closeModal()
    
  }

  danaDaruratHandler=(checked)=>{
    if(checked){
      this.setState({tambahan:"dana darurat"})
    }else{
      this.setState({tambahan:""})
    }

  }
  checkDanaDarurat(){
    if(this.props.status=="edit"){
      if(this.props.selAset.tambahan){
        return true
      }
    }
  }

    render(){
      var tabel;
      switch(this.props.akun){
        case "Rekening":
          tabel = "asetLancar"
          break;
        case "Piutang":
          tabel = "asetLancar"
          break;
        case "Investasi":
          tabel = "asetInvestasi"
          break;
        case "Aset Lain":
          tabel = "asetGuna"
          break;
        case "Utang":
          tabel = "utang"
          break;
        case "Penghasilan":
          tabel = "penghasilan"
          break;
        case "Belanja Rutin":
          tabel = "belanjaRutin"
          break;
        case "Belanja Non Rutin":
          tabel = "belanjaNonRutin"
          break;
        default:
          return false;
      }

      let title = <Text bold>{this.props.akun}</Text>

      let nilai;
      if(
        this.props.akun=="Rekening"||
        this.props.akun=="Piutang"||
        this.props.akun=="Investasi"||
        this.props.akun=="Aset Lain"||
        this.props.akun=="Utang"||
        this.props.akun=="Penghasilan"
        ){
        nilai=(
          <Input 
          rounded 
          placeholder="Nilai" 
          placeholderTextColor={theme.COLORS.PLACEHOLDER} 
          type="numeric"
          value={this.state.nilai.toString()}
          onChangeText={(val) => this.updateInputState('nilai', val)}
          />
        )
      }
      
      let danaDarurat;
      if(this.props.akun=="Rekening" || this.props.akun=="Investasi"){
        danaDarurat = (
        <Checkbox 
        color="primary" 
        label="Dana Darurat" 
        onChange={this.danaDaruratHandler} 
        initialValue={this.checkDanaDarurat()}
        />
        )
      }

      let tahunAset;
      if(this.props.akun=="Aset Lain"){
        tahunAset=(
        <Input 
          rounded 
          placeholder="Tahun pembelian" 
          placeholderTextColor={theme.COLORS.PLACEHOLDER} 
          type="numeric"
          value={this.state.tambahan}
          onChangeText={(val) => this.updateInputState('tambahan', val)}
          />
        )
      }

      let cicilanUtang;
      if(this.props.akun=="Utang"){
        cicilanUtang=(
          <Input 
          rounded 
          placeholder="Cicilan per Bulan" 
          placeholderTextColor={theme.COLORS.PLACEHOLDER} 
          type="numeric"
          value={this.state.tambahan}
          onChangeText={(val) => this.updateInputState('tambahan', val)}
          />
        )
      }
      let buttonSubmit;
      if(this.props.status=="edit"){
        buttonSubmit =(
          <Block row>
            {/*}<Button onPress={()=>{this.deleteAccount(tabel)}}>Hapus</Button>{*/}
            <Button onPress={()=>{this.editAccount(tabel)}}>Perbarui</Button>
          </Block>
        )
      }else{
        buttonSubmit =(
          <Button onPress={()=>{this.submitAccount(tabel)}}>Simpan</Button>
        )
      }
      return(
        <Block style={styles.centeredView}>
          <NavBar
            title={this.props.akun}
            right={(
              <TouchableOpacity onPress={this.closeModal}>
                <Icon 
                  name="x-circle"
                  family="feather"
                  color={theme.COLORS.ICON}
                />
              </TouchableOpacity>
            )}
            titleStyle={{fontWeight:'bold'}}
          />
          <Block fluid style={{backgroundColor:"white", justifyContent: "center",
      alignItems: "center",}}>
          <Input 
          rounded 
          placeholder="Nama" 
          placeholderTextColor={theme.COLORS.PLACEHOLDER} 
          value={this.state.nama}
          onChangeText={(val) => this.updateInputState('nama', val)}
          />
          {nilai}
          {tahunAset}
          {danaDarurat}
          {cicilanUtang}
          {buttonSubmit}
          </Block>
        </Block>
    )
    }
    
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      //marginTop: 22,
      padding:20,
      
    },
  });

  const mapStateToProps = (state, ownProps) => {
    return {
      account: state.account
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      initAccount: (item, aset) => dispatch(initAccount(item, aset)),
      updateAccount: (item, key, aset) => dispatch(updateAccount(item, key, aset)),
      remAccount: (kategori,key) => dispatch(remAccount(kategori,key)),
      addModal: (kategori,key) => dispatch(addModal(kategori,key))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(modalAccount);