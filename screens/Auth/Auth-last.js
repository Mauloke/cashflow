import React, {Component,useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Navigation } from 'react-native-navigation';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';
import {
  Alert, Dimensions, KeyboardAvoidingView, StyleSheet, Platform, ActivityIndicator, ScrollView, Image
} from 'react-native';

import auth from '@react-native-firebase/auth';

// galio component
import {
  Block, Button, Input, NavBar, Text,
} from 'galio-framework';
import theme from '../../theme';

const { height, width } = Dimensions.get('window');
 
import {connect} from 'react-redux';
import mountHandler from 'library/MountHandler/MountHandler'



import validate from '../../utility/validation';
import {setUser, getUserDB} from '../../store/actions/index';
import {MainScreen, WelcomeScreen} from '../../navigations';

class AuthScreen extends Component{
  state ={
    isLoading: false,
    loggedIn:false,
    authMode: 'login',
    viewMode: Dimensions.get('window').height > 500? 'portrait' : 'landscape',
    controls: {
        email:{
            value: '',
            valid: false,
            validationRules:{
                isEmail: true
            },
            touched: false
        },
        password:{
            value: '',
            valid: false,
            validationRules:{
                minLength:6
            },
            touched: false
        },
        confirmPassword:{
            value: '',
            valid: false,
            validationRules:{
                equalTo: 'password'
            },
            touched: false
        }
    }
}
  
    constructor(props){
        super(props);
    }

    
    componentDidUpdate(){
      //this.reset();
      
    }

    componentDidMount(){
      GoogleSignin.configure({
        //It is mandatory to call this method before attempting to call signIn()
        scopes: ['https://www.googleapis.com/auth/userinfo.email'],
              // Replace with your webClientId generated from Firebase console
        webClientId: '579321434791-m76qlmq8ja7q8vb7vvvoblq83t7q901c.apps.googleusercontent.com',
      });
      
      this.subscriber = auth().onAuthStateChanged(async (user) => {
        //console.log("user:"+JSON.stringify(user))
        if(user){
          if(!this.state.loggedIn){
            this.setState({loggedIn:true})
            this.props.onLogin(user)
            if(this.state.authMode == 'signup'){
              Navigation.setRoot(WelcomeScreen)
            }else{
              this.props.getUserDB()
              .then((exists)=>{
                console.log("exist:"+exists)
                if(exists){
                  Navigation.setRoot(MainScreen)
                }else{
                  Navigation.setRoot(WelcomeScreen)
                }
              }
              )
            }
          }
          
        }else{
          this.setState({isLoading:false});
        }
      })
        
      
    }


    subscriber = () =>{
      
    }

    componentWillUnmount(){
      this.subscriber && this.subscriber();
      this.subscriber = undefined

    }

    switchAuthModeHandler =() => {
      this.setState(prevState =>{
          return{
              authMode: prevState.authMode === 'login' ? 'signup' : 'login'
          }
      })
    }

    authHandler =() => {
      this.setState({isLoading:true});
        if(this.state.authMode=='login'){
          auth()
            .signInWithEmailAndPassword(
              this.state.controls.email.value, 
              this.state.controls.password.value
              )
            .then((user) => {
                console.log('User signed in!');
                this.setState({isLoading:false})
                
            })
            .catch(error => {
              if (error.code === 'auth/user-not-found') {
                alert("User not found. make sure email is correct")
              }
                console.error(error);
                alert("Wrong username or password")
                this.setState({isLoading:false});
            });
        }else{
          auth()
            .createUserWithEmailAndPassword(
              this.state.controls.email.value, 
              this.state.controls.password.value)
            .then(() => {
                console.log('User account created & signed in!');
                this.setState({isLoading:false})
            })
            .catch(error => {
                console.error(error);
                this.setState({isLoading:false});
            });
        }
        //Navigation.setRoot(ProfileTabs)
        //this.onLoginSuccess(this.state.controls.email.value)
    }
/*
    onLoginSuccess = (user) => {
      this.props.onLogin(user)
      Navigation.setRoot(ProfileTabs)
    }
*/
    googleHandler = async() => {
      //this.setState({isLoading:true});
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential)
    }

    updateInputState =(key,value) =>{
        let connectedValue={};
        if(this.state.controls[key].validationRules.equalTo){
            const equalControl = this.state.controls[key].validationRules.equalTo;
            const equalValue = this.state.controls[equalControl].value;
            connectedValue={
                ...connectedValue,
                equalTo: equalValue
            }
        }
        if(key === 'password'){
            connectedValue={
                ...connectedValue,
                equalTo: value
            }
        }
        this.setState(prevState => {
            return{
                controls:{
                    ...prevState.controls,
                    confirmPassword:{
                        ...prevState.controls.confirmPassword,
                        valid:key === 'password' 
                        ? validate(
                            prevState.controls.confirmPassword.value, 
                            prevState.controls.confirmPassword.validationRules, 
                            connectedValue) 
                        : prevState.controls.valid
                    },
                    [key]:{
                        ...prevState.controls[key],
                        value : value,
                        valid:validate(value, prevState.controls[key].validationRules, connectedValue),                       
                        touched: true
                    }
                }
            }
        })
    }
    
    
    render(){

      let confirmPasswordControl = null;

      if (this.state.authMode === 'signup'){
        confirmPasswordControl = (
            <Input
                rounded
                password
                viewPass
                placeholder="Confirm Password"
                placeholderTextColor={theme.COLORS.PLACEHOLDER}
                style={{ width: width * 0.9 }}
                value={this.state.controls.confirmPassword.value}
                onChangeText={(val)=>this.updateInputState('confirmPassword',val)}
                valid={this.state.controls.confirmPassword.valid}
                touched={this.state.controls.confirmPassword.touched}
              />
            
        )
    }
    if(this.state.isLoading){
      return (<Block safe flex  middle center 
      style={{ backgroundColor: theme.COLORS.WHITE, width: "100%", height:"100%" }}>
      <ActivityIndicator size="large" color="theme.COLORS.THEME" />
      </Block>)
    }else{
      return(
        <Block style={styles.container}>
        <Block style={styles.heading}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.headingImage}
            resizeMode="contain"
          />
        </Block>
        <Text style={[styles.greeting]}>
          Welcome back,
        </Text>
        <Text style={[styles.greeting2]}>
          sign in to continue
        </Text>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Auto}
            style={styles.inputContainer}
            onPress={this.googleHandler}
          />  
      </Block>
    )
    }
        
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40
  },
  greeting: {
    marginTop: 20,
    fontSize: 24,
    //fontFamily: fonts.light
  },
  greeting2: {
    color: '#666',
    fontSize: 24,
    marginTop: 5,
    //fontFamily: fonts.light
  },
  headingImage: {
    width: 100,
    height: 100
  },
    backgroundImage:{
        width: '100%',
        flex:1
    },
    inputContainer: {
        width:'80%'
    },
    input:{
        backgroundColor: '#eee',
        borderColor: '#bbb'
    },
    portraitPasswordContainer:{
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    landscapePasswordContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    portraitPasswordWrapper:{
        width:  '100%'
    },
    landscapePasswordWrapper:{
        width: '45%',
    }
})

const mapStateToProps = state => {
    return{
      wealth : state.wealth
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onLogin: (user) => dispatch(setUser(user)),
        getUserDB: () => dispatch(getUserDB())
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);