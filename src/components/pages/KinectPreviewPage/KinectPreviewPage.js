import React, { Component } from 'react';
import Header from '../../Header/Header';
import JointAnimator from './JointAnimator';
import KinectNotFound from './KinectNotFound';
import ActionBar from './ActionBar';
import { Row, notification } from 'antd';
import './KinectPreviewPage.css';

const io = require('socket.io-client');

var content;
var recordedMotion;
var recordedFrames;

class KinectPreviewPage extends Component {

    constructor(props) {
        super(props);

        recordedMotion = [];

        this.state = {
            kinectIsConnected: false,
            isRecording: false,
            isPlaying: false,
            recordedFrames: 0,
        };

        this.startConnection = this.startConnection.bind(this);
        this.toggleRecording = this.toggleRecording.bind(this);
    }

    componentDidMount() {
        this.startConnection();
    }


    startConnection = () => {

        // Connect to kinect server
        var socket = io.connect('127.0.0.1:8000');
        socket.on('bodyFrame', function (bodyFrame) {

            if (!this.state.kinectIsConnected) {
                this.setState({ kinectIsConnected: true });
                notification['success']({
                    message: 'Kinect Detected',
                    duration: 3
                });
            }

            // Save body frame if user is recording
            if (this.state.isRecording) {
                this.setState({ recordedFrames: this.state.recordedFrames + 1 });
                recordedMotion.push(bodyFrame);
            }

            if (!this.state.isPlaying) {

                // Draw new body frame
                this.refs.jointAnimator.drawBodyFrame(bodyFrame);
            }

        }.bind(this));
    }

    toggleRecording() {
        if (this.state.isRecording) {
            this.setState({ isRecording: false, isPlaying: true });
            this.refs.jointAnimator.playMotion(recordedMotion);
        } else {
            recordedMotion = [];
            this.setState({ isRecording: true, isPlaying: false });
        }
    }



    render() {
        if (this.state.kinectIsConnected) {
            content = <JointAnimator playMotion={this.state.isPlaying} ref="jointAnimator" />
        } else {
            content = <KinectNotFound />
        }
        return (
            <Row type="flex" justify="center">

                <Header title="Kinect Live Preview" />

                <ActionBar frameCount={this.state.recordedFrames} onRecordingToggled={this.toggleRecording} />

                {content}

            </Row>
        );
    }
}

export default KinectPreviewPage;