import React, {Component} from 'react';
import {View, Text, TextInput, Button, StyleSheet, ScrollView, Image, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import {Navigation} from 'react-native-navigation'


import {addPlace} from '../../store/actions/index';
import MainText from '../../components/UI/MainText';
import HeadingText from '../../components/UI/HeadingText';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation'
import validate from "../../utility/validation";
import {startAddPlace} from "../../store/actions/index"

import imagePlaceholder from '../../assets/1.jpg'

class SharePlaceScreen extends Component{
    
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    componentWillMount(){
        this.reset();
    }
    componentDidAppear() {
        this.props.onStartAddPlace();
    }

    componentDidUpdate(){
        if(this.props.placeAdded){
            Navigation.mergeOptions('BOTTOM_TAB',{
                bottomTabs: {
                    currentTabIndex: 1
                  }
            });
            //this.props.onStartAddPlace();
        }
    }

    reset =() =>{
        this.setState({
            controls:{
                placeName:{
                    value:"",
                    touched: false,
                    validationRules:{
                        notEmpty: true
                    }
                },
                location:{
                    value: null,
                    valid: false
                },
                image: {
                    value: null,
                    valid: false
                }
            }
        })
    }
    
    navigationButtonPressed({buttonId}) {
        if (buttonId === 'sideMenuButton') {
            Navigation.mergeOptions('sideDrawer', {
                sideMenu: {
                    left: {
                     visible: true
                    }
                }
            });
        }
    }

    placeNameChangeHandler = val => {
        this.setState(prevState => {
            return{
                controls:{
                    ...prevState.controls,
                    placeName:{
                        ...prevState.controls.placeName,
                        value: val,
                        valid: validate(val, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            }
            
        })
    }

locationPickedHandler = location => {
    this.setState(prevState =>{
        return{
            controls:{
                ...prevState.controls,
                location:{
                    value: location,
                    valid: true
                }
            },
            
        }
    })
}


imagePickerHandler = image =>{
    this.setState(prevState => {
        return {
            controls:{
                ...prevState.controls,
                image:{
                    value: image,
                    valid: true
                }
            }
        }
    })
}
    placeAddedHandler = () => {
        
            this.props.onAddPlace(
                this.state.controls.placeName.value, 
                this.state.controls.location.value,
                this.state.controls.image.value
                );
        this.reset();
        this.imagePicker.reset();
        this.locationPicker.reset();
        /*
        Navigation.mergeOptions(this.props.componentId,{
            bottomTabs: {
                currentTabId: this.props.componentId
              }
        })
        */
    }
    render(){
let submitButton = 
<Button 
title="Share the Place!" 
onPress={this.placeAddedHandler}
disabled={
    !this.state.controls.placeName.valid ||
    !this.state.controls.location.valid ||
    !this.state.controls.image.valid
}/>;

if (this.props.isLoading){
    submitButton = <ActivityIndicator />;
}

        return(
            <ScrollView>
                <View style={styles.container}>
                    <MainText>
                        <HeadingText>Share a Place with us!</HeadingText>
                    </MainText>
                    <PickImage onImagePicked={this.imagePickerHandler} 
                    ref={ref=>(this.imagePicker = ref)} />
                    <PickLocation onLocationPick={this.locationPickedHandler}
                    ref={ref=>(this.locationPicker = ref)} />
                    <PlaceInput 
                    placeData={this.state.controls.placeName} 
                    onChangeText={this.placeNameChangeHandler} />
                    <View style={styles.button}>
                        {submitButton}
                    </View>
                </View>
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },

    placeholder:{
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor:'#eee',
        width: '80%',
        height:150
    },
    button:{
        margin:8
    },
    previewImage:{
        width:'100%',
        height: '100%'
    }
})

const mapStateToProps = state => {
    return{
        isLoading:state.ui.isLoading,
        placeAdded:state.places.placeAdded
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAddPlace : (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
        onStartAddPlace: () => dispatch(startAddPlace())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SharePlaceScreen);