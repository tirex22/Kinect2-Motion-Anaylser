import React, { Component } from 'react';
import { Row } from 'antd';

import ConnectForm from '../generic/ConnectForm';
import JointAnimator from '../generic/JointAnimator';
import LiveGraph from '../generic/LiveGraph';
import OptionButton from '../generic/OptionButton';

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
        this.onConnect('192.168.0.104:8000');
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
            this.refs.liveGraph.addBodyFrame(bodyFrame);
        }.bind(this));
    }

    render() {
        return (
            <div>
                <Row type='flex' justify="center" style={{
                    minHeight: window.innerHeight,
                }}>
                    {this.state.connected ?
                        <div>
                            <JointAnimator ref="jointAnimator" />
                            <LiveGraph ref="liveGraph" />
                            <OptionButton title='User' option='Youssef Maged' />
                            <OptionButton title='Move' option='Olympic Snatch' />
                        </div>
                        :
                        <ConnectForm onConnect={(ipAddress) => this.onConnect(ipAddress)} />
                    }

                </Row>
            </div >
        )
    }
};