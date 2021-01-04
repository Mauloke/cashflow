import React, {Component,useEffect} from 'react';
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
import {setUser, getUserDB, addUser} from '../../store/actions/index';
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
        webClientId: '579321434791-ug808tcnfdftrip7jbusijc6bn6idoff.apps.googleusercontent.com',
      });
      
      this.subscriber = auth().onAuthStateChanged(async (user) => {
        //console.log("user:"+JSON.stringify(user))
        if(user){
          if(!this.state.loggedIn){
            this.setState({loggedIn:true})
            //this.props.onLogin(user)
            //if(this.state.authMode == 'signup'){
            //  Navigation.setRoot(WelcomeScreen)
            //}else{
              this.props.onLogin(user)
              this.props.getUserDB()
              .then((exists)=>{
                //console.log("exist:"+exists)
                if(exists){
                  Navigation.setRoot(MainScreen)
                }else{
                  this.props.addUser(user)
                  Navigation.setRoot(WelcomeScreen)
                }
              }
              )
            //}
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
        <Block safe flex style={{ backgroundColor: theme.COLORS.WHITE }}>
          <NavBar
            title="WELCOME"
            
            style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
          />
          <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
            <Block flex center style={{ marginTop: theme.SIZES.BASE * 1.875, marginBottom: height * 0.1 }}>
            <Block style={styles.heading}>
              <Image
                source={require('../../assets/logo.png')}
                style={{width:100}}
                resizeMode="contain"
              />
            </Block>
              <Text muted center size={theme.SIZES.FONT * 0.875} style={{ paddingHorizontal: theme.SIZES.BASE * 2.3 }}>
                Login lebih cepat menggunakan akun Google anda
              </Text>
              <Block row center space="between" style={{ marginVertical: theme.SIZES.BASE * 1.875 }}>
                
                <Block flex middle center>
                <GoogleSigninButton
                  style={{ width: 312, height: 48 }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={this.googleHandler}
                />
                </Block>
                
              </Block>
              {/*}
              <Text muted center size={theme.SIZES.FONT * 0.875}>
                atau cara lama
              </Text>
              {*/}
            </Block>
              {/*}
            <Block flex={2} center space="evenly">
              <Block flex={2}>
                <Input
                  rounded
                  type="email-address"
                  placeholder="Email"
                  autoCapitalize="none"
                  style={{ width: width * 0.9 }}
                  placeholderTextColor={theme.COLORS.PLACEHOLDER}
                  onChangeText={(val) => this.updateInputState('email', val)}
                />
                <Input
                  rounded
                  password
                  viewPass
                  placeholder="Password"
                  placeholderTextColor={theme.COLORS.PLACEHOLDER}
                  style={{ width: width * 0.9 }}
                  value={this.state.controls.password.value}
                  onChangeText={(val) => this.updateInputState('password', val)}
                  valid={this.state.controls.password.valid}
                  touched={this.state.controls.password.touched}
                />
                {confirmPasswordControl}
                <Text
                  color={theme.COLORS.ERROR}
                  size={theme.SIZES.FONT * 0.75}
                  onPress={() => Alert.alert('Not implemented')}
                  style={{ alignSelf: 'flex-end', lineHeight: theme.SIZES.FONT * 2 }}
                >
                  Forgot your password?
                </Text>
              </Block>
              <Block flex middle>
                <Button
                  round
                  color={
                    !this.state.controls.confirmPassword.valid && this.state.authMode ==='signup' ||
                    !this.state.controls.email.valid ||
                    !this.state.controls.password.valid ? "neutral": "info"
                }
                  onPress={this.authHandler}
                  disabled={
                      !this.state.controls.confirmPassword.valid && this.state.authMode ==='signup' ||
                      !this.state.controls.email.valid ||
                      !this.state.controls.password.valid
                  }
                >
                  {this.state.authMode ==='login' ? "Sign In" : "Sign Up"}
                </Button>
                <Button color="transparent" shadowless onPress={this.switchAuthModeHandler}>
                  <Text center color={theme.COLORS.ERROR} size={theme.SIZES.FONT * 0.75}>
                    {this.state.authMode ==='login' ? "Don't have an account?\nSign Up" : "Already have an account?\nSign In"}
                  </Text>
                </Button>
              </Block>
            </Block>
                {*/}
          </KeyboardAvoidingView>
        </Block>
    )
    }
        
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        getUserDB: () => dispatch(getUserDB()),
        addUser: (user) => dispatch(addUser(user))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);