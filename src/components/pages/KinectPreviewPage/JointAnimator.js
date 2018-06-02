import React, { Component } from 'react';

var ctx;
var canvas;

let activeJointColor = '#5d17ff';

var bodyFrame;

let selectedJoints = [];


class JointAnimator extends Component {
    constructor() {
        super();
        this.state = {
            selectedJoints: [0, 1, 2, 3],
            currentJoint: 9,
        }
        this.drawBodyFrame = this.drawBodyFrame.bind(this);
    }

    componentDidMount() {
        canvas = document.getElementById('bodyCanvas');
        ctx = canvas.getContext('2d');
        this.playMotion = this.playMotion.bind(this);
        this.drawBodyFrame = this.drawBodyFrame.bind(this);
    }

    setSelectedJoints(joints) {
        selectedJoints = joints;
        console.log(selectedJoints);
    }

    drawBodyFrame = (bodyFrame) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        bodyFrame.bodies.forEach(function (body) {
            for (let jointType in body.joints) {
                // if (other.includes(parseInt(jointType))) {
                let joint = body.joints[jointType];
                ctx.fillStyle = activeJointColor;
                ctx.fillRect(joint.depthX * this.props.width, joint.depthY * this.props.width, 4, 4);
                // }
                // else if (selectedJoints.includes(parseInt(jointType))) {
                //     let joint = body.joints[jointType];
                //     ctx.fillStyle = activeJointColor;
                //     ctx.fillRect(joint.depthX * width, joint.depthY * height, 6, 6);
                // } else {
                //     let joint = body.joints[jointType];
                //     ctx.fillStyle = inActiveJointColor;
                //     ctx.fillRect(joint.depthX * width, joint.depthY * height, 6, 6);
                // }
            }
        }.bind(this));
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
            <div title={this.props.title} style={{ marginRight: this.props.port ? 20 : 0, }} className="joint-animator" >
                <canvas id="bodyCanvas"
                    // style={{ backgroundColor: '#0f0' }}
                    width={this.props.width.toString()}
                    height={this.props.width.toString()} />
            </div>
        );
    }
}

export default JointAnimator;