import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Block, Button} from 'galio-framework'
import theme from '../../theme';

class SegmentedTabs extends Component{
    constructor(props){
        super(props);
      }
    state={
        value:null
    }
    render(){
        
        return(
            this.props.options.map(item=>{
                return(
                    <Button
                    size="small"
                    key={item.key} 
                    color={this.state.value===item.key? 'info':theme.COLORS.PLACEHOLDER}
                    onPress={
                        ()=>{
                            this.setState({value:item.key})
                        }
                    } 
                    >
                        {item.text}
                    </Button>
                )
            })
        )
    }
}


export default SegmentedTabs;