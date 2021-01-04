import React, {Component} from 'react';
import {
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import {
    Text,
    Block,
    NavBar,
    Icon,
    Input,
    Button
} from 'galio-framework'
import theme from '../../theme'
import {connect} from 'react-redux'
import {getTransaction, setMonth, getAccount, addTransaction} from '../../store/actions/index'
import {Navigation} from 'react-native-navigation'
import DateTimePicker from '@react-native-community/datetimepicker';


class AddTransactionScreen extends Component{
  state={
    kategori:null,
    subkategori:null,
    akun:null,
    showDatePicker: false,
    formattedDate:null,
    date:null,
    catatan:null,
    nilai:0,
    tipe:"keluar"
  }

  componentDidMount(){
    this.dateSelect(null,new Date())
}

popBack =() =>{
  Navigation.pop('CenterScreen')
}  

onItemSelected=(stateName,val)=>{
  if(stateName=="Belanja Rutin"||stateName=="Belanja Non Rutin"){
    this.setState({kategori:val})
    this.setState({subkategori:stateName})
  }else{
    this.setState({akun:val})
  }
  
}
showDatePicker=()=>{
  this.setState({showDatePicker:true})
}

dateSelect=(event, selectedDate)=>{
  const months = ["JAN", "FEB", "MAR","APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  let formattedDate = selectedDate.getDate()+" "+months[selectedDate.getMonth()]+" "+selectedDate.getFullYear()
  this.setState({
    showDatePicker:false,
    formattedDate:formattedDate,
    date:selectedDate.getDate()
  })
}

updateInputState =(key,value) =>{
  this.setState({[key]:value})
}

getAkunId = () => {
 console.log('test')
}

getAkunName=(key)=>{
  if(key){
    return (Object(this.props.account.asetLancar)[key]["nama"])
  }
}

getKategoriName=(key)=>{
  if(key){
    if(Object(this.props.account.belanjaRutin)[key]){
      return Object(this.props.account.belanjaRutin)[key]["nama"]
    }else{
      return Object(this.props.account.belanjaNonRutin)[key]["nama"]
    }
  }
}

openAkun=(modal,item)=>{
  Navigation.showModal({
    component: {
      name: modal,
      options: {
        modalPresentationStyle: 'overCurrentContext',
        layout: {
          backgroundColor: theme.COLORS.NEUTRAL
        }
      },
      passProps: {
        item: item,
        onItemSelected: this.onItemSelected,
       },
     
    },
  });
}
addTransaction=()=>{
  this.props.addTransaction(this.state);
  this.popBack()
}

    render(){
        return(
            <Block safe flex>
              {this.state.showDatePicker && (<DateTimePicker
          onChange={this.dateSelect}
          value={new Date()}
          minimumDate={new Date(Number(this.props.misc.year),Number(this.props.misc.month)-1)}
          maximumDate={new Date()}
        />)}
                <NavBar
                title="Tambah Transaksi"
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
              <KeyboardAvoidingView contentContainerStyle={styles.container} behavior="position" enabled>
              <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}} accessible={false}>
                <Block style={styles.inputContainer}>
                  <Input rounded
                  label="Nilai Transaksi"
                  type='numeric'
                  placeholder="Rp"
                  color={theme.COLORS.INPUT}
                  style={{ borderColor: theme.COLORS.INPUT }} 
                  placeholderTextColor={theme.COLORS.PLACEHOLDER}
                  onChangeText={(val) => this.updateInputState('nilai', val)}
                  />
                  <TouchableOpacity onPress={()=>{this.openAkun("GROW.ModalAkun","akun");Keyboard.dismiss()}}>
                    <Input rounded
                    label="Sumber Akun"
                    placeholder="akun"
                    color={theme.COLORS.INPUT}
                    style={{ borderColor: theme.COLORS.INPUT }} 
                    placeholderTextColor={theme.COLORS.PLACEHOLDER}
                    editable={false}
                    value={this.getAkunName(this.state.akun)}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{this.openAkun("GROW.ModalKategori","kategori");Keyboard.dismiss()}}>
                    <Input rounded
                    label="Kategori"
                    placeholder="kategori"
                    color={theme.COLORS.INPUT}
                    style={{ borderColor: theme.COLORS.INPUT }} 
                    placeholderTextColor={theme.COLORS.PLACEHOLDER}
                    editable={false}
                    value={this.getKategoriName(this.state.kategori)}
                    />
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={this.showDatePicker}>
                    <Input rounded
                    label="Tanggal"
                    placeholder="dd-mm-yyyy"
                    color={theme.COLORS.INPUT}
                    style={{ borderColor: theme.COLORS.INPUT }} 
                    placeholderTextColor={theme.COLORS.PLACEHOLDER}
                    editable={false}
                    value={this.state.formattedDate}
                    />
                  </TouchableOpacity>
                  <Input
                  rounded
                  label="Catatan"
                  placeholder="Text here"
                  color={theme.COLORS.INPUT}
                  style={{ borderColor: theme.COLORS.INPUT, height:100 }} 
                  placeholderTextColor={theme.COLORS.PLACEHOLDER}
                  multiline={true}
                  numberOfLines={4}
                  onChangeText={(val) => this.updateInputState('catatan', val)}
                  />
                  <TouchableOpacity>
                    <Button rounded onPress={this.addTransaction}>Tambah</Button>
                  </TouchableOpacity>
                </Block>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>

              
              </Block>

        )
    }
}
const styles=StyleSheet.create({
  container:{
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  inputContainer:{
    
    marginLeft:5,
    marginRight:5,
  }
})



const mapStateToProps = (state, ownProps) => {
  return {
      transaction: state.transaction,
      account: state.account,
      misc: state.misc
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      getTransaction: (month,year) =>  dispatch(getTransaction(month, year)),
      getAccount: (month,year) =>  dispatch(getAccount(month, year)),
      addTransaction: (item) => dispatch(addTransaction(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTransactionScreen);