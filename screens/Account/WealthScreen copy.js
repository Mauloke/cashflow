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
      View,
      StyleSheet,
      Platform, TouchableOpacity, FlatList,
      Modal,
      TouchableHighlight
  } from 'react-native'

  import theme from '../../theme';
  import {getWealth} from '../../store/actions/index'
  import ModalWealth from './ModalWealth'
  import { addDBWealth } from '../../store/actions/wealth';


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

class wealthScreen extends Component{
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        const user = this.props.user
    }

    componentDidAppear(){
      this.props.onLoading()
    }

    state={
      modalVisible: false,
      action: null,
      pos: null,
      selected: {
        nama:null,
        val:null
      },
      harta:{
        kas:[],
        tabungan:[]
      },
      hutang:[]
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

    render(){
      
      let wealth = this.props.wealth;
      //const { modalVisible } = this.state;
        return(
          
            <Block safe flex>
              
              <NavBar
                title="Tabel Kekayaan"
                left={(
                  <TouchableOpacity onPress={this.openDrawer}>
                    <Icon 
                      name="menu"
                      family="feather"
                      size={theme.SIZES.BASE}
                      color={theme.COLORS.ICON}
                    />
                  </TouchableOpacity>
                )}
                style={Platform.OS === 'android' ? { marginTop: 0 } : null}
              />
              <Block style={styles.container} middle>
                <Block card style={styles.card}>
                  <NavBar 
                  title="Harta"
                  titleStyle={styles.titleNav}
                  transparent
                  right={(
                    <TouchableOpacity onPress={()=>{this.setModalVisible(true, 'add', 'aset');}}>
                    <Icon 
                      name="plus-circle"
                      family="feather"
                      size={theme.SIZES.TITLE}
                      color={theme.COLORS.ICON}
                    />
                  </TouchableOpacity>
                  )}
                   />
                  <WealthList data={wealth.asset} />
                  
                </Block>
                <Block card style={styles.card}>
                <NavBar 
                  title="Hutang"
                  titleStyle={styles.titleNav}
                  transparent
                  right={(
                    <TouchableOpacity onPress={()=>{this.setModalVisible(true, 'add', 'hutang');}}>
                    <Icon 
                      name="plus-circle"
                      family="feather"
                      size={theme.SIZES.TITLE}
                      color={theme.COLORS.ICON}
                    />
                  </TouchableOpacity>
                  )}
                   />
                  <WealthList data={wealth.liabilities} />
                </Block>
              </Block>

              <ModalWealth 
              modalVisible={this.state.modalVisible} 
              pos={this.state.pos}
              action={this.state.action}
              onModalClose={this.onModalClose}
              setModalVisible={this.setModalVisible}
              onModalSubmit={this.onModalSubmit}
              selected={this.state.selected}
              modalHandler={this.modalHandler}
              />
            </Block>
            
        );
    }
}

const styles = StyleSheet.create({
  container:{
  },
  card:{
    width:"95%",
    marginBottom: '5%',
    padding: 5
  },
  titleNav:{
    fontSize:theme.SIZES.TITLE
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
});

mapStateToProps = state =>{
  return{
    user: state.auth.user,
    wealth: state.wealth
  }
}

mapDispatchToProps = dispatch => {
  return{
    onLoading : () => dispatch(getWealth()),
    addWealth: (selected) => dispatch(addDBWealth(selected))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(wealthScreen);