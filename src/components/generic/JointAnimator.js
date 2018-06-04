import React, { Component } from 'react';
import { Col } from 'antd';

var ctx;
var canvas;

let activeJointColor = 'rgb(49, 59, 73)';

export default class JointAnimator extends Component {

    constructor() {
        super();
        this.state = {
            canvasSize: 0,
            marginLeft: 0,
        }
    }

    componentDidMount() {

        let width = window.innerWidth;
        let height = window.innerHeight;

        if (height > width) {

            let canvasSize = height / 2.5;

            this.setState({
                canvasSize: canvasSize,
                marginLeft: (width - canvasSize) / 2,
            });

            setTimeout(() => {
                canvas = document.getElementById('bodyCanvas');
                ctx = canvas.getContext('2d');
            }, 50);

        } else {

            let canvasSize = width / 6;

            this.setState({
                canvasSize: canvasSize,
                marginLeft: (width - (width / 6)) / 2,
            });

            setTimeout(() => {
                canvas = document.getElementById('bodyCanvas');
                ctx = canvas.getContext('2d');
            }, 150);

        }

        this.drawBodyFrame = this.drawBodyFrame.bind(this);
    }

    drawBodyFrame = (bodyFrame) => {
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            bodyFrame.bodies.forEach(function (body) {
                for (let jointType in body.joints) {
                    let joint = body.joints[jointType];
                    ctx.fillStyle = activeJointColor;
                    ctx.fillRect(joint.depthX * this.state.canvasSize, joint.depthY * this.state.canvasSize, 4, 4);
                }
            }.bind(this));
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.canvasSize === 0 ? null :
                        <div>
                            <p style={{ textAlign: 'center', fontWeight: '900', color: '#85CED1', margin: 0, marginTop: 20, fontSize: '1rem' }} >
                                Kinect Preview
                                </p>
                            <canvas id="bodyCanvas"
                                className="visible"
                                style={{
                                    height: this.state.canvasSize,
                                    width: this.state.canvasSize,
                                    borderRadius: this.state.canvasSize / 2,
                                    marginLeft: this.state.marginLeft,
                                    backgroundColor: '#fff',
                                    borderStyle: 'solid',
                                    borderWidth: 15,
                                    borderColor: '#f7f7f7',
                                    boxShadow: '0px 0px 50px 0px rgba(0, 0, 0, 0.20)',
                                    marginTop: 20,
                                    alignSelf: 'center',
                                    marginBottom: 10,
                                }}
                                width={this.state.canvasSize.toString()}
                                height={this.state.canvasSize.toString()} />
                        </div>
                }
            </div>
        );
    }
}
