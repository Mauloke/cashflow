import React, {Component} from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    SectionList
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

class modalKategori extends Component {

  constructor(props){
    super(props);
  }
  componentDidMount(){
  }
  


  closeModal = async () =>{
    await Navigation.dismissModal(this.props.componentId);
  }
  sections =()=>{
    var sections=[]
    var data=[]
    for(var i in this.props.belanjaRutin){
        data.push({key:i,nama:this.props.belanjaRutin[i]["nama"]})
    }
    sections.push({title:"Belanja Rutin",data:data})
    data =[]
    for(var i in this.props.belanjaNonRutin){
      data.push({key:i,nama:this.props.belanjaNonRutin[i]["nama"]})
    }
    sections.push({title:"Belanja Non Rutin",data:data})
    //console.log(JSON.stringify(sections))
    
    return sections
  }


    render(){
      return(
        <Block style={styles.centeredView}>
          <NavBar
            title="nama kategori"
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

          <SectionList
            ListEmptyComponent={
              <Text>--- silahkan buat kategori dulu ---</Text>
            }
            style={styles.listContainer} 
              sections={this.sections()}
              renderSectionHeader={({section}) => {
                //console.log("here:"+section)
                return(
                <Text style={styles.sectionHeaderStyle}>
                  {section.title}
                </Text>
              )}}
              renderItem={({item,index,section}) => {
                //console.log(section)
                return(
                // Item for the FlatListItems
                <TouchableOpacity onPress={()=>{
                  this.props.onItemSelected(section.title,item.key)
                  this.closeModal()
                  }}>
                <Block style={styles.sectionListItemStyle}>
                  <Text style={{width:'100%'}}>
                    {item.nama}
                  </Text>
                </Block>
                </TouchableOpacity>
              )}}
              keyExtractor={(item, index) => index}
            />
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
    sectionHeaderStyle: {
      backgroundColor: theme.COLORS.PRIMARY,
      fontSize: 20,
      padding: 5,
      color: '#fff',
    },
    sectionListItemStyle: {
      width: "100%",
          marginBottom: 5,
          padding: 10,
          backgroundColor: "#eee",
          flexDirection:'row',
          alignItems: 'center',
          justifyContent:"space-between"
    },
    listItemSeparatorStyle: {
      
    },
  });

  const mapStateToProps = (state, ownProps) => {
    return {
      belanjaRutin: state.account.belanjaRutin,
      belanjaNonRutin: state.account.belanjaNonRutin
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

  export default connect(mapStateToProps, mapDispatchToProps)(modalKategori);