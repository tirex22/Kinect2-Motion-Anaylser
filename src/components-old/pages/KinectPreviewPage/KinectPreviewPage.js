import React, { Component } from 'react';
import Header from '../../Header/Header';
import JointAnimator from './JointAnimator';
import KinectNotFound from './KinectNotFound';
import ActionBar from './ActionBar';
import ChooseDatasetModal from './ChooseDatasetModal';
import LiveAnalyser from '../../Analysers/LiveAnalyser';
import SnatchAnalyser from '../../Analysers/SnatchAnalyser';
import { Row, notification } from 'antd';
import { getAllDatasets } from '../../../firebase/firestore';
import Steps from './Steps';
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
            workingDataset: {},
            animatorWidth: 0,
            analyzerWidth: 0,
            analyzerHeight: 0,
            graphWidth: 0,
            port: false,
        };

        this.startConnection = this.startConnection.bind(this);
        this.toggleRecording = this.toggleRecording.bind(this);
        this.deleteRecordedMotion = this.deleteRecordedMotion.bind(this);
        this.saveRecordedMotion = this.saveRecordedMotion.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.startConnection();
        getAllDatasets((res) => {
            if (res.success) {
                this.setState({ datasets: res.datasets });
            }
        });
        this.updateWindowDimensions();
        // window.addEventListener('resize', this.updateWindowDimensions);
    }


    startConnection = () => {
        // Connect to kinect server
        var socket = io.connect('192.168.0.104:8000');
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

                // Analayse body frame
                this.refs.moveAnalyser.addFrame(bodyFrame);
            }

        }.bind(this));
    }

    updateWindowDimensions() {
        if (window.innerHeight > window.innerWidth) {
            this.setState({
                port: true,
                analyzerWidth: window.innerWidth - 60,
                analyzerHeight: window.innerHeight - window.innerWidth - 50,
                animatorWidth: window.innerWidth - 40,
                graphWidth: window.innerWidth - 40,
            });
        } else {
            this.setState({
                animatorWidth: (window.innerWidth / 3) - 40,
                analyzerWidth: (window.innerWidth) - ((window.innerWidth / 3)) - 60,
                analyzerHeight: (window.innerWidth / 3) - 48,
                graphWidth: (window.innerWidth / 2) - 60,
            });
        }

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateDataset(datasetName) {
        this.setState({ datasetName: datasetName });
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
                        width={this.state.animatorWidth}
                        port={this.state.port}
                    />
                    <div className="live-displacement">
                        {/* <Steps ref="steps" /> */}
                        <LiveAnalyser ref="liveGraphA"
                            width={this.state.analyzerWidth}
                            height={this.state.analyzerHeight}
                        />
                    </div>
                    <SnatchAnalyser
                        graphWidth={this.state.graphWidth}
                        steps={this.refs.steps}
                        ref="moveAnalyser"
                        liveGraphA={this.refs.liveGraphA}
                        recorder={this}
                    />
                </div>
            )
        } else {
            content = (
                <div>
                    <JointAnimator ref="jointAnimator"
                        playMotion={this.state.isPlaying}
                        width={this.state.animatorWidth}
                        port={this.state.port}
                    />
                    <div className="live-displacement">
                        {/* <Steps ref="steps" /> */}
                        <LiveAnalyser ref="liveGraphA"
                            width={this.state.analyzerWidth}
                            height={this.state.analyzerHeight} />
                    </div>
                    <SnatchAnalyser
                        graphWidth={this.state.graphWidth}
                        steps={this.refs.steps}
                        ref="moveAnalyser"
                        liveGraphA={this.refs.liveGraphA}
                        recorder={this}
                    />
                    {/* <KinectNotFound /> */}
                </div>
            )
        }
        return (
            <Row type="flex" justify="center">

                <Header ref="header" title="Kinect Live Preview" />

                {/* <ActionBar
                    disabled={!this.state.kinectIsConnected}
                    isRecording={this.state.isRecording}
                    frameCount={this.state.recordedFrames}
                    onRecordingToggled={this.toggleRecording}
                    onDelete={this.deleteRecordedMotion}
                    onSave={this.saveRecordedMotion} /> */}

                {content}

                {/* <ChooseDatasetModal ref='chooseDatasetModal' header={this.refs.header} animator={this.refs.jointAnimator} /> */}

            </Row>
        );
    }
}

export default KinectPreviewPage;