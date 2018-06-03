import React, { Component } from 'react';
import { Row } from 'antd';

import ConnectForm from '../generic/ConnectForm';
import JointAnimator from '../generic/JointAnimator';

const io = require('socket.io-client');

export default class PreviewScreen extends Component {
    constructor() {
        super();
        this.state = {
            connected: false,
        }

        this.onConnect = this.onConnect.bind(this);
    }

    componentDidMount() {
        // this.onConnect('192.168.0.104:8000');
    }

    onConnect = (ipAddress) => {
        setTimeout(() => {
            this.setState({ connected: true });
            this.startConnection(ipAddress);
        }, 1300);
    }

    startConnection = (ipAddress) => {
        var socket = io.connect(ipAddress);
        socket.on('bodyFrame', function (bodyFrame) {
            this.refs.jointAnimator.drawBodyFrame(bodyFrame);
        }.bind(this));
    }

    render() {
        return (
            <div>
                <Row type="flex" justify="center" style={{
                    padding: 20,
                    minHeight: window.innerHeight,
                }}>
                    {this.state.connected ?
                        <JointAnimator ref="jointAnimator" />
                        :
                        <ConnectForm onConnect={(ipAddress) => this.onConnect(ipAddress)} />
                    }

                </Row>
            </div >
        )
    }
};