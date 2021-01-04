import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import { Input, Block, theme } from 'galio-framework';
const defaultInput = props =>(
    <Input 
        {...props}
        style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]} 
    />
);

const styles = StyleSheet.create({

    input:{
        borderColor: theme.COLORS.ERROR
    },
    invalid:{
        borderColor: theme.COLORS.ERROR
    }
})

export default defaultInput