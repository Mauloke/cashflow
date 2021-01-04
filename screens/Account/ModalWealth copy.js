import React, {Component} from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    View
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
  setAsetLancar, setAsetInvestasi, setAsetGuna, setUtang, setModal,
  updateAsetLancar, updateAsetInvestasi, updateAsetGuna, updateUtang, updateModal,
} from '../../store/actions/index'

import SegmentedTab from '../../components/SegmentedTab/SegmentedTab'


class modalWealth extends Component {

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
    console.log("this:"+this.props.selAset)
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

  submitModal =() =>{
    switch(this.props.akun){
      case "Rekening":
        this.props.setAsetLancar(this.state)
        break;
      case "Piutang":
        this.props.setAsetLancar(this.state)
        break;
      case "Investasi":
        this.props.setAsetInvestasi(this.state)
        break;
      case "Aset Lain":
        this.props.setAsetGuna(this.state)
        break;
      case "Utang":
        this.props.setUtang(this.state)
        break;
      default:
        return false;
    }
    this.closeModal()
  }

  editModal =()=>{
    let tempState = this.props.aset;
    tempState[this.props.keyAset] = this.state;
    switch(this.props.akun){
      case "Rekening":
        this.props.updateAsetLancar(tempState)
        break;
      case "Piutang":
        this.props.updateAsetLancar(tempState)
        break;
      case "Investasi":
        this.props.updateAsetInvestasi(tempState)
        break;
      case "Aset Lain":
        this.props.updateAsetGuna(tempState)
        break;
      case "Utang":
        this.props.updateUtang(tempState)
        break;
      default:
        return false;
    }
    this.closeModal()
  }

  deleteModal=()=>{
    let tempState = this.props.aset;
    let fixedState = []
    delete tempState[this.props.keyAset];
    console.log(tempState)
    for(let i=0;i<tempState.length;i++){
      console.log(i+":"+tempState[i])
      if(tempState[i]){
        fixedState.push(tempState[i])
      }
    }
    console.log(fixedState)
    
    switch(this.props.akun){
      case "Rekening":
        this.props.updateAsetLancar(fixedState)
        break;
      case "Piutang":
        this.props.updateAsetLancar(fixedState)
        break;
      case "Investasi":
        this.props.updateAsetInvestasi(fixedState)
        break;
      case "Aset Lain":
        this.props.updateAsetGuna(fixedState)
        break;
      case "Utang":
        this.props.updateUtang(fixedState)
        break;
      default:
        return false;
    }
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

      let title = <Text bold>{this.props.akun}</Text>
      
      let danaDarurat;
      if(this.props.akun=="Rekening"){
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
            <Button onPress={this.deleteModal}>Hapus</Button>
            <Button onPress={this.editModal}>Simpan</Button>
          </Block>
        )
      }else{
        buttonSubmit =(
          <Button onPress={this.submitModal}>Simpan</Button>
        )
      }
      return(
        <Block style={styles.centeredView}>
          <NavBar
            title={title}
            
            right={(
              <TouchableOpacity onPress={this.closeModal}>
                <Text>close</Text>
                <Icon 
                  name="x-circle"
                  family="feather"
                  size={theme.SIZES.BASE}
                  color={theme.COLORS.ICON}
                />
              </TouchableOpacity>
            )}
            style={Platform.OS === 'android' ? { marginTop: 0 } : null}
          />
          <Input 
          rounded 
          placeholder="Nama" 
          placeholderTextColor={theme.COLORS.PLACEHOLDER} 
          value={this.state.nama}
          onChangeText={(val) => this.updateInputState('nama', val)}
          />
          <Input 
          rounded 
          placeholder="Nilai" 
          placeholderTextColor={theme.COLORS.PLACEHOLDER} 
          type="numeric"
          value={this.state.nilai}
          onChangeText={(val) => this.updateInputState('nilai', val)}
          />
          {tahunAset}
          {danaDarurat}
          {cicilanUtang}
          {buttonSubmit}
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
      padding:20
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      paddingBottom: 35,
      paddingLeft:35,
      paddingRight:35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84, 
      elevation: 5,
      width:'80%'
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

  const mapDispatchToProps = dispatch => {
    return {
      setAsetLancar: (aset) => dispatch(setAsetLancar(aset)),
      setAsetInvestasi: (aset) => dispatch(setAsetInvestasi(aset)),
      setAsetGuna: (aset) => dispatch(setAsetGuna(aset)),
      setUtang: (aset) => dispatch(setUtang(aset)),
      setModal: (aset) => dispatch(setModal(aset)),
      updateAsetLancar: (aset) => dispatch(updateAsetLancar(aset)),
      updateAsetInvestasi: (aset) => dispatch(updateAsetInvestasi(aset)),
      updateAsetGuna: (aset) => dispatch(updateAsetGuna(aset)),
      updateUtang: (aset) => dispatch(updateUtang(aset)),
      updateModal: (aset) => dispatch(updateModal(aset)),
    }
  }

  export default connect(null, mapDispatchToProps)(modalWealth);