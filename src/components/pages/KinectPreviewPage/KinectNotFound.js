import React, { Component } from 'react';
import { Icon, Spin } from 'antd';
import './KinectPreviewPage.css';

class KinectNotFound extends Component {
    render() {
        return (
            <div>
                <Icon style={{ marginTop: window.innerHeight / 4 }} type="loading" className="loader" spin />
                <p className="not-found-error" >Waiting For Kinect </p>
            </div>
        );
    }
}

export default KinectNotFound;