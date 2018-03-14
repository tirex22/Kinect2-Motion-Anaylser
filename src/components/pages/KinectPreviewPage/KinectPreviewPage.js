import React, { Component } from 'react';
import Header from '../../Header/Header';
import JointAnimator from './JointAnimator';
import KinectNotFound from './KinectNotFound';
import { Row } from 'antd';
import './KinectPreviewPage.css';

const io = require('socket.io-client');

var content;

class KinectPreviewPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            kinectIsConnected: false,
        };

        this.startConnection = this.startConnection.bind(this);
    }

    componentDidMount() {
        this.startConnection();
    }

    // Connect to kinect server
    startConnection = () => {
        var socket = io.connect('127.0.0.1:8000');
        socket.on('bodyFrame', function (bodyFrame) {
            this.setState({ kinectIsConnected: true });
            this.refs.jointAnimator.drawBodyFrame(bodyFrame);
        }.bind(this));
    }

    render() {
        if (this.state.kinectIsConnected) {
            content = <JointAnimator ref="jointAnimator" />
        } else {
            content = <KinectNotFound />
        }
        return (
            <Row type="flex" justify="center">

                <Header title="Kinect Live Preview" />

                {content}

            </Row>
        );
    }
}

export default KinectPreviewPage;