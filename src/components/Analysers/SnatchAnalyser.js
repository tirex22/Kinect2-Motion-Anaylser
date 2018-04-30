import React, { Component } from 'react';
import { getYDistance, getMovementLevel } from '../Functions/FeatureExtractor';


let motion = [];

class SnatchAnalyser extends Component {

    constructor() {
        super();
        this.getBarLevel = this.getBarLevel.bind(this);
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
        }
    }

    getBarLevel = (bodyFrame) => {
        let dist = getYDistance(bodyFrame[6], bodyFrame[10]);
        if (this.props.liveGraphA) {
            this.props.liveGraphA.addData(Math.min(dist, 0.3));
        }
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