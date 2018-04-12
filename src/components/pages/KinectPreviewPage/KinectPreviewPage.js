import React, { Component } from 'react';
import Header from '../../Header/Header';
import JointAnimator from './JointAnimator';
import KinectNotFound from './KinectNotFound';
import ActionBar from './ActionBar';
import SaveModal from './SaveModal';
import LiveAnalyser from '../../Graphs/LiveAnalyser';
import { Row, notification } from 'antd';
import './KinectPreviewPage.css';

const io = require('socket.io-client');

var content;
var recordedMotion;

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
        this.deleteRecordedMotion = this.deleteRecordedMotion.bind(this);
        this.saveRecordedMotion = this.saveRecordedMotion.bind(this);
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

    toggleRecording = () => {
        if (this.state.isRecording) {
            this.setState({ isRecording: false, isPlaying: true });
            this.refs.jointAnimator.playMotion(recordedMotion);
        } else {
            recordedMotion = [];
            this.setState({ isRecording: true, isPlaying: false });
        }
    }

    deleteRecordedMotion = () => {

        // clear recorded motion array and frame count
        recordedMotion = [];

        // Stop motion player
        this.setState({ isPlaying: false, recordedFrames: 0 });
    }

    saveRecordedMotion = () => {
        if (this.refs.saveModal.requestSave(recordedMotion));
    }


    render() {
        if (this.state.kinectIsConnected) {
            content = (
                <div>
                    <JointAnimator ref="jointAnimator"
                        playMotion={this.state.isPlaying}
                        title={this.state.isPlaying ? "Replay" : "Live Preview"} />
                    {/* <LiveAnalyser /> */}
                </div>
            )
        } else {
            content = (
                <div>
                    <KinectNotFound />
                </div>
            )
        }
        return (
            <Row type="flex" justify="center">

                <Header title="Kinect Live Preview" />

                <ActionBar
                    disabled={!this.state.kinectIsConnected}
                    isRecording={this.state.isRecording}
                    frameCount={this.state.recordedFrames}
                    onRecordingToggled={this.toggleRecording}
                    onDelete={this.deleteRecordedMotion}
                    onSave={this.saveRecordedMotion} />

                {content}

                <SaveModal deleteMotion={this.deleteRecordedMotion} ref='saveModal' />

            </Row>
        );
    }
}

export default KinectPreviewPage;