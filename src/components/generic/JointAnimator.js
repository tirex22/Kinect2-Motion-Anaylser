import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
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
            loader: 0,
            showProg: true,
        }

        this.setProgress = this.setProgress.bind(this);
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

    setProgress = (percentage) => {
        this.setState({ loader: percentage });
    }

    drawBodyFrame = (bodyFrame) => {
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            bodyFrame.forEach(function (joint) {
                ctx.fillStyle = this.state.showProg ? 'transparent' : activeJointColor;
                ctx.fillRect(joint.depthX * this.state.canvasSize, joint.depthY * this.state.canvasSize, 4, 4);
            }.bind(this));
        }
    }

    clear = () => {
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.canvasSize === 0 ? null :
                        <a onClick={() => this.setState({ showProg: !this.state.showProg })}>
                            <div>
                                <p style={{ textAlign: 'center', fontWeight: '900', color: '#85CED1', margin: 0, marginTop: 20, fontSize: '1rem' }} >
                                    Kinect Preview
                                </p>
                                <div style={{
                                    marginTop: 20,
                                    width: this.state.canvasSize - 9,
                                    height: this.state.canvasSize - 9,
                                    position: 'absolute',
                                    marginLeft: this.state.marginLeft + 4.5,
                                }}>
                                    <CircularProgressbar textForPercentage={this.state.showProg ? (pct) => `${pct}%` : ""} strokeWidth={2} percentage={this.state.loader}
                                        styles={{
                                            // path: { stroke: `rgba(62, 152, 199, ${yourPercentage / 100})` },
                                            path: { stroke: '#85CED1' },
                                            trail: { stroke: 'transparent' },
                                            text: { stroke: 'rgb(49, 59, 73)', fill: 'rgb(49, 59, 73)' }
                                        }}
                                    />
                                </div>
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
                                        marginTop: 15,
                                        alignSelf: 'center',
                                        marginBottom: 10,
                                    }}
                                    width={this.state.canvasSize.toString()}
                                    height={this.state.canvasSize.toString()} >
                                </canvas>
                            </div>
                        </a>

                }
            </div>
        );
    }
}
