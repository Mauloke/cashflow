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
  addWealth,
  updateAset,
  remWealth,
} from '../../store/actions/index'

const { width } = Dimensions.get('screen');

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

  submitAset =(tabel) =>{
    if(this.state.nama && this.state.nilai){
      this.props.addAset(this.state, tabel)
    }
    
    this.closeModal()
  }

  editAset =(tabel)=>{
    let tempState = this.props.aset;
    tempState[this.props.keyAset] = this.state;
    this.props.updateAset(this.state, this.props.keyAset, tabel)
    this.closeModal()
  }

  deleteAset=(tabel)=>{
    this.props.remWealth(tabel,this.props.keyAset)
    this.closeModal()
    
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
        default:
          return false;
      }

      let title = <Text bold>{this.props.akun}</Text>
      
      let buttonSubmit;
      if(this.props.status=="edit"){
        buttonSubmit =(
          <Block row>
            <Button onPress={()=>{this.deleteAset(tabel)}}>Hapus</Button>
            <Button onPress={()=>{this.editAset(tabel)}}>Simpan</Button>
          </Block>
        )
      }else{
        buttonSubmit =(
          <Button onPress={()=>{this.submitAset(tabel)}}>Simpan</Button>
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
          <Input 
          rounded 
          placeholder="Nama" 
          placeholderTextColor={theme.COLORS.PLACEHOLDER} 
          value={this.state.nama}
          onChangeText={(val) => this.updateInputState('nama', val)}
          />
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
      padding:20,
    },
  });

  const mapDispatchToProps = dispatch => {
    return {
      addAset: (item, aset) => dispatch(addWealth(item, aset)),
      updateAset: (item, key, aset) => dispatch(updateAset(item, key, aset)),
      remWealth: (kategori,key) => dispatch(remWealth(kategori,key))
    }
  }

  export default connect(null, mapDispatchToProps)(modalWealth);