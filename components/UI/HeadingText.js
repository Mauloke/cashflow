import React from 'react';
import {Text, StyleSheet} from 'react-native';

const headingText = props => (
    <Text {...props} style={[styles.H1, props.style]}>{props.children}</Text>
);

const styles = StyleSheet.create({
    H1:{
        fontSize: 28,
        fontWeight: 'bold'
    },
})

export default headingText;