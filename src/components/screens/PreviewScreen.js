import React, { Component } from 'react';
import { Row } from 'antd';

import ConnectForm from '../generic/ConnectForm';

export default class PreviewScreen extends Component {
    constructor() {
        super();
        this.state = {
            connected: false,
        }
    }
    render() {
        return (
            <div>
                <Row type="flex" justify="center" style={{
                    padding: 20,
                    minHeight: window.innerHeight,
                }}>
                    <ConnectForm />
                </Row>
            </div >
        )
    }
};
