import React, { Component } from 'react';
import Header from '../../Header/Header';
import JointAnimator from './JointAnimator';
import { Row } from 'antd';
import './KinectPreviewPage.css';

const io = require('socket.io-client');
var jointAnimator;

class KinectPreviewPage extends Component {

    // constructor(props) {
    //     super(props);
    // }

    componentDidMount() {
        jointAnimator = this.refs.jointAnimator;
        this.startConnection();
    }


    // Connect to kinect server
    startConnection() {
        var socket = io.connect('127.0.0.1:8000');
        socket.on('bodyFrame', function (bodyFrame) {
            jointAnimator.drawBodyFrame(bodyFrame);
        });
    }

    render() {
        return (
            <div>
                <Row type="flex" justify="center">

                    <Header title="Kinect Live Preview" />

                    <JointAnimator ref="jointAnimator" />

                </Row>
            </div >
        );
    }
}

export default KinectPreviewPage;