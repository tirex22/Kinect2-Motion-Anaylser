import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Image } from 'react-native';
import LoadingButton from './LoadingButton'
import { input } from './Styles';
window.navigator.userAgent = 'react-native';
const io = require('socket.io-client/dist/socket.io');


export default class ConnectForm extends Component {
    constructor() {
        super();
        this.state = {
            ipAddress: "",
        }
        this.startConnection = this.startConnection.bind(this);
    }

    componentDidMount() {
        this.startConnection();
    }

    startConnection = () => {
        console.log("Starting Connection");
        var socket = io.connect('192.168.0.104:8000', {
            transports: ['websocket']
        });

        socket.on('bodyFrame', function (bodyFrame) {

            alert("sss");

        }.bind(this));
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
                <Text style={styles.title}> No Device Connected </Text>
                <Text style={styles.message}> Please enter the local IP Address of the device and press connect.</Text>
                <TextInput style={input} onChangeText={(text) => this.setState({ ipAddress: text })} />
                <LoadingButton text="Connect" onPress={() => alert(this.state.ipAddress)} />

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

