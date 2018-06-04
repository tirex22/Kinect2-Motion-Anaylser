import React, { Component } from 'react';
import { Line, defaults } from 'react-chartjs-2';
import { Col } from 'antd';
import { getMovementLevel } from '../Processing/FeatureExtractor';

defaults.global.animation = false;

const divs = 80;

let bodyFrames = [];
let emptyLables = [];
let zeroValues = [];

export default class LiveGraph extends Component {

    constructor() {
        super();

        for (let i = 0; i < divs; i++) {
            emptyLables.push("");
            zeroValues.push(0);
        }

        this.state = {
            height: 0,
            width: 0,
            labels: emptyLables,
            datasets: [{
                label: 'Motion Level',
                data: zeroValues,
                fill: true,
                lineTension: .01,
                backgroundColor: '#F5FBFB',
                borderColor: '#B9E6DF',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: '#fff',
                pointRadius: 1,
                pointHitRadius: 0,
            }]
        }
        this.addData = this.addData.bind(this);
    }

    componentDidMount() {

        let width = window.innerWidth;
        let height = window.innerHeight;
        let graphHeight = 0;

        if (height > width) {

            graphHeight = height - (height / 3) - 210;

            this.setState({
                width: width,
                height: graphHeight,
            });

        } else {

            graphHeight = width / 3;

            this.setState({
                width: width,
                height: height - (width / 6) - 210,
            });
        }

        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var grd = ctx.createLinearGradient(0, 0, 0, graphHeight);
        grd.addColorStop(0, "#EFFDFE");
        grd.addColorStop(1, "white");

        this.setState({
            marginLeft: 20,
            labels: emptyLables,
            datasets: [{
                label: 'Motion Level',
                data: zeroValues,
                fill: true,
                lineTension: .01,
                // backgroundColor: '#F5FBFB',
                backgroundColor: grd,
                borderColor: '#B9E6DF',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: '#fff',
                pointRadius: 1,
                pointHitRadius: 0,
            }]
        });

    }

    addData = (n) => {
        let newData = this.state.datasets;
        let dataFile = newData[0].data;
        let value = n;
        if (n > 2) {
            value = 2
        }
        // if (newData.length > 0) {
        //     let lastPoint = dataFile[dataFile.length - 1];
        //     if (n > lastPoint && (n - lastPoint) > .05) {
        //         value = lastPoint + 0.05;
        //     } else if (n < lastPoint && (lastPoint - n) > .05) {
        //         value = lastPoint - 0.05;
        //     }
        // }
        dataFile.push(value);
        // dataFile = this.smoothOut(dataFile,0.5);
        newData[0].data = dataFile.slice(Math.max(dataFile.length - divs, 1))
        // console.log(newData);
        this.setState({ datasets: newData });
    }

    addBodyFrame = (bodyFrame) => {
        let newBodyFrame = [];
        bodyFrame.bodies.forEach(function (body) {
            for (let jointType in body.joints) {
                let joint = body.joints[jointType];
                newBodyFrame[jointType] = joint;
            }
        });
        if (newBodyFrame[0] && newBodyFrame[0].cameraY) {
            bodyFrames.push(newBodyFrame);
            if (bodyFrames.length > 1) {
                let motionLevel = getMovementLevel(bodyFrames[bodyFrames.length - 1], bodyFrames[bodyFrames.length - 2]);
                this.addData(motionLevel);
            }
        }
    }

    avg = (v) => {
        return v.reduce((a, b) => a + b, 0) / v.length;
    }

    smoothOut = (vector, variance) => {
        var t_avg = this.avg(vector) * variance;
        var ret = Array(vector.length);
        for (var i = 0; i < vector.length; i++) {
            (function () {
                var prev = i > 0 ? ret[i - 1] : vector[i];
                var next = i < vector.length ? vector[i] : vector[i - 1];
                ret[i] = this.avg([t_avg, this.avg([prev, vector[i], next])]);
            }.bind(this))();
        }
        return ret;
    }

    render() {
        return (
            <div>
                <canvas id="canvas" height={0} width={0} />
                {this.state.height == 0 ? null :
                    <Line
                        height={this.state.height}
                        width={this.state.width} data={this.state}
                        options={{
                            legend: {
                                display: false
                            },
                            scales: {
                                yAxes: [{
                                    gridLines: {
                                        color: "rgba(0, 0, 0, 0)",
                                        drawTicks: false,
                                    },
                                    id: 'left-y-axis',
                                    type: 'linear',
                                    position: 'left',
                                    ticks: {
                                        display: false,
                                        min: 0,
                                        max: 2,
                                    }
                                }],

                                xAxes: [{
                                    display: false,
                                    gridLines: {
                                        color: "rgba(0, 0, 0, 0)",
                                    },
                                }]
                            }
                        }} />
                }
            </div>
        );
    }
}

let styles = {
    container: {
        display: 'inline-block',
    }
}