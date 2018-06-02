import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Modal } from 'react-native';
import { Actions } from 'react-native-router-flux';

let logo = require('../../assets/logo.png');

export default class StartScreen extends Component {

    constructor() {
        super();
        this.state = {
            visible: true,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ visible: false })
        }, 1000);
    }

    render() {
        return (
            <Modal visible={this.state.visible} animationType="fade">
                <View style={styles.container}>
                    <View style={styles.circleView}>
                        <Image source={logo} style={styles.logo} />
                    </View>
                    {/* <Text style={styles.name}>Motion Analyzer</Text> */}
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    circleView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 120,
        // backgroundColor: '#fff',
        borderRadius: 60,
    },

    logo: {
        height: 80,
        width: 80,
        tintColor: '#eee',
    },

    name: {
        color: '#000',
        fontSize: 25,
        marginTop: 0,
        fontWeight: '200',
    }
});
