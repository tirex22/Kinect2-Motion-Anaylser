import React, { Component } from 'react'
import { TouchableOpacity, Text, ActivityIndicator, } from 'react-native'

export default class LoadingButton extends Component {
    render() {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={this.props.onPress}

                style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 50,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: "#70C6D1",
                    margin: 10,
                    borderRadius: 5,
                }}>


                <Text
                    style={{
                        color: "#fff",
                        fontSize: 15,
                        fontWeight: "900",
                    }}>{this.props.text}</Text>

                {/* <ActivityIndicator size="small" color={'#fff'} /> */}

            </TouchableOpacity>
        )
    }
}