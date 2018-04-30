import React, { Component } from 'react';
import { getYDistance, getMovementLevel } from '../Functions/FeatureExtractor';


let motion = [];
let barAnkleYDists = [];

class SnatchAnalyser extends Component {

    constructor() {
        super();
        this.state = {
            step: 0,
        }
        this.getBarLevel = this.getBarLevel.bind(this);
        this.updateSnatchStep = this.updateSnatchStep.bind(this);
    }

    addFrame = (bodyFrame) => {
        let newBodyFrame = {};
        bodyFrame.bodies.forEach(function (body) {
            for (let jointType in body.joints) {
                let joint = body.joints[jointType];
                newBodyFrame[jointType] = joint;
            }
        });

        if (newBodyFrame[0] && newBodyFrame[0].cameraY) {
            motion.push(newBodyFrame);
            this.getMovementLevel();
            this.updateSnatchStep(newBodyFrame);
        }
    }

    updateSnatchStep(bodyFrame) {
        switch (this.state.step) {
            case 0: this.checkStance(bodyFrame); break;
            case 1: this.checkFirstPull(bodyFrame); break;
            case 2: this.checkSecondPull(bodyFrame); break;
            case 3: this.checkTurnover(bodyFrame); break;
        }
    }

    checkStance(bodyFrame) {
        let dist = getYDistance(bodyFrame[18], bodyFrame[10]);
        barAnkleYDists.push(dist);
        let l = barAnkleYDists.length;
        let correctStance = true;
        if (l >= 50) {
            for (let i = 0; i < 50; i++) {
                if (barAnkleYDists[l - i - 1] >= 0.3) {
                    correctStance = false;
                    break;
                }
                if (correctStance) {
                    this.props.steps.setStep(1);
                    this.setState({ step: 1 });
                }
            }
        }
    }

    checkFirstPull(bodyFrame) {
        if (bodyFrame[10].cameraY > bodyFrame[16].cameraY) {
            this.props.steps.setStep(2);
            this.setState({ step: 2 });
        }
        return;
    }

    checkSecondPull(bodyFrame) {
        if (bodyFrame[10].cameraY > bodyFrame[8].cameraY) {
            this.props.steps.setStep(3);
            this.setState({ step: 3 });
        }
        return;
    }

    checkTurnover(bodyFrame) {
        let dist = getYDistance(bodyFrame[0], bodyFrame[18]);
        if (dist < 0.37) {
            this.props.steps.setStep(4);
            this.setState({ step: 4 });
        }
        return;
    }




    getBarLevel = (bodyFrame) => {
        let dist = getYDistance(bodyFrame[6], bodyFrame[10]);
        return dist;
    }

    getMovementLevel() {
        let l = motion.length;
        if (l > 1) {
            let diff = getMovementLevel(motion[l - 1], motion[l - 2]);
            // console.log(diff);
            if (this.props.liveGraphA) {
                this.props.liveGraphA.addData(diff);
            }
        }
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default SnatchAnalyser;