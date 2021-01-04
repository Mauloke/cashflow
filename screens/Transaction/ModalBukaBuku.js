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
  updateBuku,
  remAccount,
  addModal
} from '../../store/actions/index'

const { width } = Dimensions.get('screen');

class modalBukaBuku extends Component {

  state = {
    nama: '',
    nilai: '',
    tambahan: ''
  }




  constructor(props){
    super(props);
  }
  componentDidMount(){
    console.log("this:"+this.props.keyAset)
    if(this.props.aset){
      this.setState(this.props.selAset)
    }
  }

  componentWillUnmount(){
    this.props.checkSaldo()
  }
  

  updateInputState =(key, val)=>{
      this.setState({[key]:val})
  }

  closeModal = async () =>{
    await Navigation.dismissModal(this.props.componentId);
  }



  editAccount =(tabel)=>{
    let nilai = Number(this.state.nilai)
    if(typeof nilai === 'number' && isFinite(nilai)){
      let tempState = this.props.aset;
    tempState[this.props.keyAset] = this.state;
    this.props.updateBuku(this.state, this.props.keyAset)
    //this.updateSaldoAwal()
    this.closeModal()
    }else{
      alert("masukkan nilai valid")
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

      
      
      let buttonSubmit;
        buttonSubmit =(
          <Block row>
            <Button onPress={()=>{this.editAccount(tabel)}}>Perbarui</Button>
          </Block>
        )
      return(
        <Block style={styles.centeredView}>
          <NavBar
            title={this.state.nama}
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
          {nilai}
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
      updateBuku: (item, key) => dispatch(updateBuku(item, key)),
      remAccount: (kategori,key) => dispatch(remAccount(kategori,key)),
      addModal: (kategori,key) => dispatch(addModal(kategori,key))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(modalBukaBuku);