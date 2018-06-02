import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';


export default class Header extends Component {
    render() {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => this.props.onLeftIconPress()} style={styles.button}>
                    <Image source={this.props.leftIcon} style={styles.icon} />
                </TouchableOpacity>
                <Text style={styles.title} >{this.props.title}</Text>
                <TouchableOpacity onPress={() => this.props.onrightIconPress()} style={styles.button}>
                    <Image source={this.props.rightIcon} style={styles.icon} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#fff",
        height: 65,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 0,
        borderBottomColor: '#aaa',
        shadowOffset: { width: 1, height: 2, },
        shadowColor: '#000',
        shadowOpacity: 0.0,
    },

    title: {
        color: "#000",
        // backgroundColor: '#ff0',
        fontSize: 16,
        height: 50,
        fontWeight: '600',
        width: responsiveWidth(76),
        textAlign: 'center',
        marginTop: 45,
    },

    icon: {
        height: responsiveHeight(2.5),
        width: responsiveHeight(2.5),
        zIndex: 100,
    },

    button: {
        height: responsiveHeight(6.8),
        width: responsiveWidth(12),
        paddingLeft: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
        // backgroundColor: '#f00',
    },
});
