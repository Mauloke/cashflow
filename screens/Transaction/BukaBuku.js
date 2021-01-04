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
    Toast,
} from 'galio-framework'
import theme from '../../theme';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {
} from '../../store/actions/index'
import AccountList from '../../components/AccountList/AccountList';
import CurrencyFormatter from 'react-native-currency-formatter'
import {
  updateAccount, tutupBuku
} from '../../store/actions/index'

const { width } = Dimensions.get('screen');

class bukaBuku extends Component {

  state = {
    negative:false,
    penyesuaian:0,
    saldo:0,
    saldoAwal:0
  }

  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.saldoAwal()
  }

  componentWillUnmount(){
    this.props.onBack()
  }

  popBack =() =>{
    this.props.onBack()
    Navigation.pop('CenterScreen')
  }

  updateInputState =(key, val)=>{
      this.setState({[key]:val})
  }

  closeModal = async () =>{
    
    await Navigation.dismissModal(this.props.componentId);
  }

  submitAccount =(tabel) =>{
    
    if(this.state.nama){
      this.props.addAccount(this.state, tabel)
    }
    
    this.closeModal()
  }

  saldoAwal=()=>{
    var nilai=0

    for(var item in this.props.asetLancar){
      if(Number(this.props.asetLancar[item]['nilai'])<0){
        this.setState({negative:true})
      }
      nilai += Number(this.props.asetLancar[item]['nilai'])
    }
    this.setState({saldoAwal:nilai, saldo:nilai})
  }

  checkSaldo =() =>{
    var nilai=0
     for(var item in this.props.asetLancar){
       if(Number(this.props.asetLancar[item]['nilai'])<0){
         this.setState({negative:true})
       }else{
        this.setState({negative:false})
       }
       nilai += Number(this.props.asetLancar[item]['nilai'])
     }
     if(this.state.saldo!=0){
       if(this.state.saldo!=nilai){
         this.setState({penyesuaian:nilai-this.state.saldoAwal})
       }
     }
     this.setState({saldo:nilai})
     //return CurrencyFormatter(Number(nilai))
  }

  itemSelectedHandler=(key,aset, kategori)=>{
    const selAset = aset[key]
    Navigation.showModal({
      component: {
        name: 'GROW.ModalBukaBuku',
        id: 'ModalBukaBuku',
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
          checkSaldo:this.checkSaldo
        },
       
      },
    });
  }

  bukaBuku=()=>{
    var saldoAwal=0;
    for(var item in this.props.asetLancar){
      //console.log(item)
      this.props.updateAccount(this.props.asetLancar[item],item,"asetLancar")
      .then(
          this.props.tutupBuku(this.props.asetLancar[item])
      )
      saldoAwal += Number(this.props.asetLancar[item]['nilai'])
    }
    console.log(saldoAwal)
    this.props.tutupBuku({nama:'saldo awal', nilai: -Math.abs(saldoAwal), tambahan:''}) 
    if(this.state.penyesuaian!=0){
      this.props.tutupBuku({nama:'penyesuaian', nilai: this.state.penyesuaian, tambahan:''})
    }
    this.props.onSubmit();
    Navigation.pop('CenterScreen')
  }

    render(){
      let penyesuaian;
      if(this.state.penyesuaian!=0){
        let nilaiPenyesuaian
        if(Number(this.state.penyesuaian)<0){
          nilaiPenyesuaian="("+CurrencyFormatter(Math.abs(this.state.penyesuaian))+")"
        }
        else{
          nilaiPenyesuaian=CurrencyFormatter(Number(this.state.penyesuaian))
        }
        penyesuaian=(<Text p>Penyesuaian: {nilaiPenyesuaian}</Text>)
      }
      
      return(
        <Block safe flex={1} style={styles.container}>
          <Toast 
          isShow={this.state.negative} 
          positionIndicator="bottom"
          color={theme.COLORS.WARNING}
          >Oops, ada nilai negative di rekening kamu</Toast>
          <NavBar
            
            left={(
              <TouchableOpacity onPress={this.popBack}>
                <Text>
                  <Icon 
                  name="chevron-left"
                  family="feather"
                  size={theme.SIZES.BASE}
                  color={theme.COLORS.ICON}
                />Kembali
                </Text>
                
              </TouchableOpacity>
            )}
            titleStyle={{fontWeight:'bold'}}
          />
          <Block  flex={3} style={styles.slide2}>
            <Text h1 bold>Buka Buku</Text>
            <Text h5>pastikan nilai rekening anda sesuai</Text>
            <AccountList aset={this.props.asetLancar} kategori="Rekening" onItemSelected={this.itemSelectedHandler}/>
          </Block>
          <Block  flex={1}>
            <Text p>Nilai awal: {CurrencyFormatter(Number(this.state.saldo))}</Text>
            {penyesuaian}
            <Block center>
              <Button 
              round 
              iconFamily="ionicon" 
              icon="chevron-forward-outline" 
              color={this.state.negative?theme.COLORS.MUTED:'primary'}
              disabled={this.state.negative?true:false}
              onPress={()=>{this.bukaBuku()}}>Lanjutkan</Button>
            </Block>
            
          </Block>
          
        </Block>  
    )
    }
    
}

const styles = StyleSheet.create({
  container:{
    marginLeft:5,
    marginRight:5
  },
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
      asetLancar: state.account.asetLancar,
      misc: state.misc
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      updateAccount: (item, key, aset) => dispatch(updateAccount(item, key, aset)),
      tutupBuku: (item) => dispatch(tutupBuku(item)),
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(bukaBuku);