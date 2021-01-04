import React, {Component} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import { 
    Block,
    NavBar,
    Icon,
    Text,
    Button
} from 'galio-framework';
import {connect} from 'react-redux';

import {authLogout} from "../../store/actions/index"

import {Navigation} from 'react-native-navigation'

import theme from '../../theme'


class SideDrawer extends Component{
    constructor(props){
        super(props);
    }
    
menuHandler=(menu)=>{
    Navigation.push('CenterScreen', {
        component: {
          name: menu,
          options: {
            sideMenu: {
              left: {
                visible: false,
              },
            },
          },
        }
      });
}


    render(){
        return(
            <Block style={[styles.container, {width:Dimensions.get("window").width * 0.8}]}>
                <TouchableOpacity onPress={()=>{this.menuHandler("GROW.TransactionScreen")}}>
                    <Block style={styles.drawerItem}>
                        <Icon name="list" size={theme.SIZES.BASE} family="feather" color={theme.COLORS.ICON} style={styles.drawerItemIcon} />
                        <Text>Transaksi</Text>
                    </Block>
                </TouchableOpacity>
        
                <TouchableOpacity onPress={()=>{this.menuHandler("GROW.AccountScreen")}}>
                    <Block style={styles.drawerItem}>
                        <Icon name="pocket" size={theme.SIZES.BASE} family="feather" color={theme.COLORS.ICON} style={styles.drawerItemIcon} />
                        <Text>Harta</Text>
                    </Block>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.menuHandler("GROW.CategoryScreen")}}>
                    <Block style={styles.drawerItem}>
                        <Icon name="shopping-bag" size={theme.SIZES.BASE} family="feather" color={theme.COLORS.ICON} style={styles.drawerItemIcon} />
                        <Text>Kategori</Text>
                    </Block>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.props.onLogout}>
                    <Block style={styles.drawerItem}>
                        <Icon name="log-out" size={theme.SIZES.BASE} family="feather" color={theme.COLORS.ICON} style={styles.drawerItemIcon} />
                        <Text>SignOut</Text>
                    </Block>
                </TouchableOpacity>
                
            </Block>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop:50,
        backgroundColor:"white",
        flex:1
    },
    drawerItem:{
        flexDirection:'row',
        alignItems:'center',
        padding:10,
    },
    drawerItemIcon:{
        marginRight:10,
        //backgroundColor:'#000'
    }
})

const mapDispatchToProps = dispatch =>{
    return{
        onLogout: () => dispatch(authLogout())
    }
}

export default connect(null, mapDispatchToProps)(SideDrawer);