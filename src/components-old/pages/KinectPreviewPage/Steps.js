import React, { Component } from 'react';
import { Steps } from 'antd';
const Step = Steps.Step;

class moveSteps extends Component {
    constructor() {
        super();
        this.state = {
            step: 0,
        }

        this.setStep = this.setStep.bind(this);
    }

    setStep(n) {
        this.setState({ step: n });
    }

    render() {
        return (
            <div className="card move-steps">
                <Steps current={this.state.step}>
                    <Step title="Stance" />
                    <Step title="First Pull" />
                    <Step title="Second Pull" />
                    <Step title="Turnover" />
                    <Step title="Finish" />
                </Steps>
            </div>
        );
    }
}

export default moveSteps;