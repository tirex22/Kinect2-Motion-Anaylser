import React, { Component } from 'react';
import { Card } from 'antd';

var ctx;
var canvas;

let jointColor = '#e03162';
let width = 400;
let height = 333;

class JointAnimator extends Component {

    componentDidMount() {
        canvas = document.getElementById('bodyCanvas');
        ctx = canvas.getContext('2d');
    }

    drawBodyFrame = (bodyFrame) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bodyFrame.bodies.forEach(function (body) {
            if (body.tracked) {
                for (let jointType in body.joints) {
                    let joint = body.joints[jointType];
                    ctx.fillStyle = jointColor;
                    ctx.fillRect(joint.depthX * width, joint.depthY * height, 4, 4);
                }
            }
        });
    }

    render() {
        return (
            <Card title="Preview" className="joint-animator" >
                <canvas id="bodyCanvas"
                    width={width.toString()}
                    height={height.toString()} />
            </Card>
        );
    }
}

export default JointAnimator;