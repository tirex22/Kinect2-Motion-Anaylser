import React, { Component } from 'react';
import { Row, notification, Steps } from 'antd';
const Step = Steps.Step;

class moveSteps extends Component {
    render() {
        return (
            <div className="card move-steps">
                <Steps current={3}>
                    <Step title="First Pull" />
                    <Step title="Second Pull" />
                    <Step title="Waiting" />
                    <Step title="Waiting" />
                    <Step title="Waiting" />
                </Steps>
            </div>
        );
    }
}

export default moveSteps;