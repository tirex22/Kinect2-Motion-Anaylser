import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Image } from 'react-native';
import LoadingButton from './LoadingButton'
import { input } from './Styles';


export default class ConnectForm extends Component {
    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >

                <Text style={styles.title}> No Device Connected </Text>
                <Text style={styles.message}> Please enter the local IP Address of the device and press connect.</Text>
                <TextInput style={input} />
                <LoadingButton text="Connect" />

            </KeyboardAvoidingView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 40,
        // borderRadius: 20,
        // backgroundColor: '#eee',
        shadowOffset: { width: 1, height: 1, },
        shadowColor: '#000',
        shadowOpacity: 0.0,
        backgroundColor: '#fff',
    },

    title: {
        fontSize: 25,
        fontWeight: '900',
    },

    message: {
        color: '#222',
        marginTop: 10,
        textAlign: 'center',
        fontWeight: '100',
        marginBottom: 50,
    },


});

