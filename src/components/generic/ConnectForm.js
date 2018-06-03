import React, { Component } from 'react';

import LoadingButton from '../generic/LoadingButton';

const io = require('socket.io-client');

export default class ConnectForm extends Component {

    constructor() {
        super();
        this.state = {
            ipAddress: '',
            connected: false,
        }

        this.testConnection = this.testConnection.bind(this);
    }

    componentDidMount() {
        // this.testConnection();
    }

    testConnection = () => {
        // Connect to kinect server
        var socket = io.connect(this.state.ipAddress);
        socket.on('bodyFrame', function (bodyFrame) {
            if (!this.state.connected) {
                this.setState({ connected: true });
            }
        }.bind(this));

        setTimeout(() => {
            socket.off();
            socket.disconnect();
            if (!this.state.connected) {
                alert("Could not connect to " + this.state.ipAddress);
                this.refs.loadingButton.setLoadingState(false);
            } else {
                this.refs.loadingButton.setSuccessState(true);
                if (this.props.onConnect) {
                    this.props.onConnect(this.state.ipAddress);
                }
            }
        }, 3000);
    }



    render() {
        return (
            <div style={styles.container}>
                <p className="title center">No Device Connected</p>

                <p className="message center"
                    style={{ marginBottom: 70, }}>Please enter the local IP Address of the device and click connect.</p>

                <input
                    className="text-input"
                    type="text" onChange={(event) => this.setState({ ipAddress: event.target.value + ":8000" })}
                />

                <LoadingButton ref="loadingButton" text="Connect" onClick={() => this.testConnection()} />

            </div>
        )
    }
};

let styles = {
    container: {
        alignSelf: 'center',
        padding: 20,
        paddingTop: 30,
        paddingBottom: 30,
        width: '100%',
        maxWidth: 400,
    }
}
