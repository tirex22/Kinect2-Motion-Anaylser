import React, { Component } from 'react';
import { Card } from 'antd';

var ctx;
var canvas;

let activeJointColor = '#e03162';
let inActiveJointColor = '#ddd';

let width = 400;
let height = 333;
var bodyFrame;


class JointAnimator extends Component {
    constructor() {
        super();
        this.state = {
            selectedJoints: [0, 1, 2, 3],
            currentJoint: 9,
        }
    }

    componentDidMount() {
        canvas = document.getElementById('bodyCanvas');
        ctx = canvas.getContext('2d');
        this.playMotion = this.playMotion.bind(this);
        this.drawBodyFrame = this.drawBodyFrame.bind(this);
    }

    drawBodyFrame = (bodyFrame) => {
        let that = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bodyFrame.bodies.forEach(function (body) {
            for (let jointType in body.joints) {
                if (true) {
                    let joint = body.joints[jointType];
                    ctx.fillStyle = activeJointColor;
                    ctx.fillRect(joint.depthX * width, joint.depthY * height, 6, 6);
                } else {
                    let joint = body.joints[jointType];
                    ctx.fillStyle = inActiveJointColor;
                    ctx.fillRect(joint.depthX * width, joint.depthY * height, 6, 6);
                }
            }
        });
    }

    playMotion = (motion, frame) => {
        let that = this;
        if (frame === undefined) {
            alert("Start Playing");
            this.setState({ isPlaying: true });
            frame = 0;
        }

        if (frame === motion.length - 1) {
            if (this.props.playMotion) {
                frame = 0;
            } else {
                return;
            }
        }
        bodyFrame = motion[frame];
        if (this.props.playMotion) {
            that.drawBodyFrame(bodyFrame);
        }
        setTimeout(function () {
            return that.playMotion(motion, frame + 1);
        }, 30);

    }

    render() {
        return (
            <div title={this.props.title} className="joint-animator" >
                <canvas id="bodyCanvas"
                    width={width.toString()}
                    height={height.toString()} />
            </div>
        );
    }
}

export default JointAnimator;