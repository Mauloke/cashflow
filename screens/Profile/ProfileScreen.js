import React, {Component} from 'react';
import {
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Image,
    Dimensions
} from 'react-native';
import { 
    Block,
    NavBar,
    Icon,
    Input,
} from 'galio-framework';

import {
  NavigationComponent,
  Navigation,
  NavigationComponentProps,
  NavigationButtonPressedEvent,
  Options
} from 'react-native-navigation';

import {getUser} from '../../store/actions/index'
import { connect } from 'react-redux';

import theme from '../../theme';

const { height, width } = Dimensions.get('window');

class profileScreen extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        //const user = this.props.user
       
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

    componentDidAppear() {
        //this.props.onShowingProfile(this.props.user)
    }
/*
    static options(){
        Promise.all([
            Icon.getImageSource("md-map",30),
          ]).then(sources=>{
        return{
            topBar: {
                testID: 'test',
                title: {
                  text: 'My Screen',
                },
                leftButtons: {
                  id: 'sideMenu',
                  icon: require('../../assets/hamburger.png'),
                },
            },
        }
    })
        
      };
*/
    /*
    componentDidAppear(){
        Navigation.mergeOptions('ProfileScreen',()=>{
            Promise.all([
                Icon.getImageSource("md-map",30),
              ]).then(sources=>{
                return{
                    topBar: {
                    visible: true,
                    leftButtons: [
                        {
                        id: 'sideMenuButton',
                        icon: sources[0],
                        },
                    ],
                    leftButtonColor: 'red',
                    title: {
                        text: 'Profile',
                        color: 'white'
                    },
                    background: {
                        color: '#4d089a'
                    }
                    }
                }
            })
        })
    }
    */
   /*
   updateInputState = (key,value) =>{
       this.setState(prevState => {
           return{
            user:{
                ...prevState.user,
                [key]:value
            }
           }
       })
   }
   */
    
    
    render(){
        const user = this.props.user
        let photo = null
        if(user.photoURL){
            photo = (
<               Block middle>
                    <Image source={{ uri: user.photoURL }}
                        style={styles.avatar}
                    />
                    <Text>edit</Text>
                </Block>
            )
        }
        return(
            <Block middle>
                <Block width={width*0.9}>
                    {photo}
                    <Block><Text>Name:</Text></Block>
                    <Block space='between'>
                        <Input
                        placeholder="Name"
                        value={user.displayName}
                        />
                    </Block>

                    <Block><Text>Email:</Text></Block>
                    <Block space='between'>
                        <Input
                        placeholder="Email"
                        type="email-address"
                        value={user.email}
                        />
                    </Block>

                    <Block><Text>Phone:</Text></Block>
                    <Block space='between'>
                        <Input
                        placeholder="Phone"
                        value={user.phoneNumber}
                        type="number-pad"
                        />
                    </Block>

                    <Block><Text>Date of Birth:</Text></Block>
                    <Block space='between'>
                        <Input
                        placeholder="date of birth"
                        value={user.dob}
                        />
                    </Block>

                    <Block><Text>Sex:</Text></Block>
                    <Block space='between'>
                        <Input
                        placeholder="Sex"
                        value={user.sex}
                        />
                    </Block>
                </Block>
            </Block>
            
        
        )
    }
}

const styles = StyleSheet.create({

    navbar: {
      top: 20,
      left: 0,
      right: 0,
      zIndex: 9999,
      position: 'absolute',
    },
    avatar: {
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: width * 0.3,
    },

  });

mapStateToProps = state =>{
    return{
        user : state.auth.user
    }
}
mapDispatchToProps = dispatch => {
    return {
        onShowingProfile : (user) => dispatch(getUser(user))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(profileScreen);