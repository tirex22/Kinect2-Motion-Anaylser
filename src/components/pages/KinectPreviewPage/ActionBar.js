import React, { Component } from 'react';
import { Row, Button } from 'antd';
import './KinectPreviewPage.css';

class ActionBar extends Component {

    constructor() {
        super();
        this.state = {
            isRecording: false,
        }
    }

    toggleRecording() {
        this.props.onRecordingToggled();
        this.setState({ isRecording: !this.state.isRecording });
    }

    render() {
        return (
            <Row type="flex" justify="start" className="action-bar">
                <Button onClick={() => this.toggleRecording()} type="danger">
                    {this.state.isRecording ? "Stop Recording" : "Record"}
                </Button>
            </Row >
        );
    }
}

export default ActionBar;