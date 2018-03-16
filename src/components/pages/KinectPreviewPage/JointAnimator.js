import React, { Component } from 'react';
import { Card } from 'antd';

var ctx;
var canvas;

let jointColor = '#e03162';
let width = 400;
let height = 333;
var bodyFrame;

class JointAnimator extends Component {

    componentDidMount() {
        canvas = document.getElementById('bodyCanvas');
        ctx = canvas.getContext('2d');
        this.playMotion = this.playMotion.bind(this);
    }

    drawBodyFrame = (bodyFrame) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bodyFrame.bodies.forEach(function (body) {
            for (let jointType in body.joints) {
                let joint = body.joints[jointType];
                ctx.fillStyle = jointColor;
                ctx.fillRect(joint.depthX * width, joint.depthY * height, 4, 4);
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
            <Card title={this.props.title} className="joint-animator" >
                <canvas id="bodyCanvas"
                    width={width.toString()}
                    height={height.toString()} />
            </Card>
        );
    }
}

export default JointAnimator;