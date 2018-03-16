import React, { Component } from 'react';
import { Row, Button } from 'antd';
import './KinectPreviewPage.css';

let saveButtons;
class ActionBar extends Component {

    constructor() {
        super();
        this.state = {
            isRecording: false,
        }
    }

    toggleRecording = () => {
        this.props.onRecordingToggled();
        this.setState({ isRecording: !this.state.isRecording });
    }

    render() {

        if (!this.state.isRecording && this.props.frameCount > 0) {
            saveButtons =
                <div style={{ height: 35 }}>
                    <a onClick={() => this.props.onSave()}><div className="button"> Save</div></a>
                    <a onClick={() => this.props.onDelete()}><div className="button" >Delete</div></a>
                </div>
        } else {
            saveButtons = null;
        }

        return (
            <Row type="flex" justify="start" className="action-bar" >
                <Button onClick={() => this.toggleRecording()} type="danger"
                    className="record-button"
                    disabled={this.props.disabled || (this.props.frameCount > 0 && !this.state.isRecording)}>
                    {this.state.isRecording || this.props.frameCount > 0 ? this.props.frameCount + " Frames" : "Record"}
                </Button>

                {saveButtons}

            </Row >
        );
    }
}

export default ActionBar;