import React, {Component} from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    FlatList
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
  addAccount,
  updateAccount,
  remAccount,
  addModal
} from '../../store/actions/index'

const { width } = Dimensions.get('screen');

class modalAkun extends Component {

  constructor(props){
    super(props);
  }
  componentDidMount(){
  }
  


  closeModal = async () =>{
    await Navigation.dismissModal(this.props.componentId);
  }



    render(){
      return(
        <Block style={styles.centeredView}>
          <NavBar
            title="nama akun"
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
          <FlatList 
        style={styles.listContainer} 
        data={Object.keys(this.props.asetLancar)}
        ListEmptyComponent={()=>(<Block center><Text>--Empty--</Text></Block>)}
        
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item, index, separator)=>{
            return(
              <TouchableOpacity onPress={()=>{
                this.props.onItemSelected(this.props.item,item.item)
                this.closeModal()
                }}>
                  <Block style={styles.listItem} key={item.item}>
                      <Text style={{width:'100%', textAlign:'center'}}>{this.props.asetLancar[item.item]["nama"]}</Text>
                  </Block>
              </TouchableOpacity>
            )
            
        }} />
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
    listContainer:{
      flexGrow:0,
    },
    listItem: {
      width: "100%",
      marginBottom: 5,
      padding: 10,
      backgroundColor: "#eee",
      flexDirection:'row',
      alignItems: 'center',
      justifyContent:"space-between"
  },
  });

  const mapStateToProps = (state, ownProps) => {
    return {
      asetLancar: state.account.asetLancar,
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      addAccount: (item, aset) => dispatch(addAccount(item, aset)),
      updateAccount: (item, key, aset) => dispatch(updateAccount(item, key, aset)),
      remAccount: (kategori,key) => dispatch(remAccount(kategori,key)),
      addModal: (kategori,key) => dispatch(addModal(kategori,key))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(modalAkun);