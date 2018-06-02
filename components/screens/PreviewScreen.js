import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import StartScreen from './StartScreen';
import ConnectForm from '../generic/ConnectForm';
import Header from '../generic/Header'

export default class PreviewScreen extends Component {
    render() {
        return (
            <View style={styles.container} >
                <Header title="Analyzer" />
                <View style={styles.circle}>
                    {/* <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWK8-0MvaSQOhE2uj8H7XjfzVihjP1h81gec5xNU8B9uvrTXpD" }}
                        style={{ width: 40, height: 40, marginTop: 150, alignSelf: 'center', borderRadius: 20 }}
                    /> */}
                    <Text style={{ marginTop: 160, alignSelf: 'center', textAlign: 'center', fontWeight: '900', fontSize: 15, }} >Youssef Maged</Text>
                    <Text style={{ marginTop: 10, alignSelf: 'center', textAlign: 'center', fontWeight: '100', fontSize: 15, }} >Snatch</Text>
                </View>
                {/* <StartScreen /> */}
                <ConnectForm />
            </ View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    circle: {
        width: 230,
        height: 230,
        marginTop: -195,
        // position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 115,
        shadowOffset: { width: 1, height: 2, },
        shadowColor: '#000',
        shadowOpacity: 0.1,
        alignSelf: 'center',
    },

});

