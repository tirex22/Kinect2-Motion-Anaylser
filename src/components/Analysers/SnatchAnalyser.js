import React, { Component } from 'react';
import { getYDistance, getZDistance, getMovementLevel, getAngle } from '../Functions/FeatureExtractor';
import LineChart from './LineChart';


let ref = require('../Functions/motion.json');
let motion = [];
let motion2 = [];
let barAnkleYDists = [];

class SnatchAnalyser extends Component {

    constructor() {
        super();
        this.state = {
            step: 0,
            graphs: false,
            barLevel_ref: [],
            kneeAngle_ref: [],
        }
        this.getBarLevel = this.getBarLevel.bind(this);
        this.updateSnatchStep = this.updateSnatchStep.bind(this);
    }

    compressMotionModel(motionModel, callback) {
        let newMotionModel = [];
        let jointsPosition = [];
        let newJointsPosition = {};

        motionModel.forEach(function (element) {

            element.bodies.forEach(function (elem) {
                if (elem.joints) {
                    jointsPosition = elem.joints;
                    newJointsPosition = {};
                    jointsPosition.forEach(function (position, i) {
                        newJointsPosition["" + i] = {
                            cameraX: position.cameraX,
                            cameraY: position.cameraY,
                            cameraZ: position.cameraZ,
                            // z: position.depthZ,
                        };
                    });
                    newMotionModel.push(newJointsPosition);
                }
            });
        });
        callback(newMotionModel);
    }

    componentWillMount() {
        this.getBarLevel(ref, true);
        this.getBarBodyDist(ref, true);
        this.getKneeAngle(ref, true);
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
            motion.push(bodyFrame);
            motion2.push(newBodyFrame);
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
                    // this.props.steps.setStep(1);
                    this.setState({ step: 1 });
                }
            }
        }
    }

    checkFirstPull(bodyFrame) {
        if (bodyFrame[10].cameraY > bodyFrame[16].cameraY) {
            // this.props.steps.setStep(2);
            this.setState({ step: 2 });
        }
        return;
    }

    checkSecondPull(bodyFrame) {
        if (bodyFrame[10].cameraY > bodyFrame[8].cameraY) {
            // this.props.steps.setStep(3);
            this.setState({ step: 3 });
        }
        return;
    }

    checkTurnover(bodyFrame) {
        let dist = getYDistance(bodyFrame[0], bodyFrame[18]);
        if (dist < 0.37) {
            // this.props.steps.setStep(4);
            this.setState({ step: 4 });
            this.compressMotionModel(motion, (compressed) => {
                console.log(compressed);
                this.getBarLevel(compressed, false);
                this.getBarBodyDist(compressed, false);
                this.getKneeAngle(compressed, false);
            })
        }
        return;
    }

    getBarBodyDist = (bodyFrames, ref) => {
        let barDist = [];
        bodyFrames.forEach((bodyFrame, index) => {
            let dist = getZDistance(bodyFrame[1], bodyFrame[10]);
            barDist.push(dist);
            if (index === bodyFrames.length - 1) {
                if (ref) {
                    this.setState({
                        barDist_ref: barDist,
                    });
                } else {
                    this.setState({
                        barDist: barDist,
                    });
                }
            }
        });
    }


    getBarLevel = (bodyFrames, ref) => {
        let barLevel = [];
        bodyFrames.forEach((bodyFrame, index) => {
            let dist = getYDistance(bodyFrame[6], bodyFrame[10]);
            barLevel.push(dist);
            if (index === bodyFrames.length - 1) {
                if (ref) {
                    this.setState({
                        barLevel_ref: barLevel,
                    });
                } else {
                    this.setState({
                        barLevel: barLevel,
                    });
                }
            }
        });
    }

    getMovementLevel() {
        let l = motion2.length;
        if (l > 1) {
            let diff = getMovementLevel(motion2[l - 1], motion2[l - 2]);
            if (this.props.liveGraphA) {
                this.props.liveGraphA.addData(diff);
            }
        }
    }

    getKneeAngle = (bodyFrames, ref) => {
        let kneeAngle = [];
        bodyFrames.forEach((bodyFrame, index) => {
            let angle = getAngle(bodyFrame[16], bodyFrame[17], bodyFrame[18]);
            kneeAngle.push(angle);
            if (index === bodyFrames.length - 1) {
                console.log(kneeAngle);
                if (ref) {
                    this.setState({
                        kneeAngle_ref: kneeAngle,
                    });
                } else {
                    this.setState({
                        kneeAngle: kneeAngle,
                        graphs: true,
                    });
                }
            }
        });
    }



    render() {
        return (
            this.state.graphs ?
                <div style={{ paddingLeft: 17, }}>
                    <LineChart width={this.props.graphWidth}
                        data1={this.state.barLevel}
                        data2={this.state.barLevel_ref}
                    />

                    <LineChart width={this.props.graphWidth}
                        data1={this.state.barDist}
                        data2={this.state.barDist_ref}
                    />

                    <LineChart width={this.props.graphWidth}
                        data1={this.state.kneeAngle}
                        data2={this.state.kneeAngle_ref}
                    />

                </div>
                : null
        );
    }
}

export default SnatchAnalyser;