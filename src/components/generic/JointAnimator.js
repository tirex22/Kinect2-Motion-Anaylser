import React, { Component } from 'react';

var ctx;
var canvas;

let activeJointColor = 'rgb(49, 59, 73)';

export default class JointAnimator extends Component {

    constructor() {
        super();
        this.state = {
            width: 300,
            height: 300,
        }
    }

    componentDidMount() {
        canvas = document.getElementById('bodyCanvas');
        ctx = canvas.getContext('2d');
        this.drawBodyFrame = this.drawBodyFrame.bind(this);
    }

    drawBodyFrame = (bodyFrame) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bodyFrame.bodies.forEach(function (body) {
            for (let jointType in body.joints) {
                let joint = body.joints[jointType];
                ctx.fillStyle = activeJointColor;
                ctx.fillRect(joint.depthX * this.state.width, joint.depthY * this.state.width, 4, 4);
            }
        }.bind(this));
    }

    render() {
        return (
            <canvas id="bodyCanvas"
                style={styles.container}
                width={this.state.width.toString()}
                height={this.state.width.toString()} />
        );
    }
}

let styles = {
    container: {
        height: 300,
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 150,
        borderStyle: 'solid',
        borderWidth: 15,
        borderColor: '#f7f7f7',
        boxShadow: '0px 0px 40px 0px rgba(0, 0, 0, 0.2)',
        marginTop: 20,
    }
}