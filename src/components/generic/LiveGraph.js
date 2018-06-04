import React, { Component } from 'react';
import { Line, defaults } from 'react-chartjs-2';
import { Col } from 'antd';
import { getMovementLevel } from '../Processing/FeatureExtractor';
import { Smooth } from '../Processing/Smooth';
Smooth.METHOD_CUBIC = 'cubic'

defaults.global.animation = false;

const divs = 100;

let bodyFrames = [];
let emptyLables = [];
let zeroValues = [];

export default class LiveGraph extends Component {

    constructor() {
        super();

        for (let i = 0; i < divs; i++) {
            emptyLables.push("");
            zeroValues.push(1);
        }

        this.state = {
            height: 0,
            width: 0,
            labels: emptyLables,
            datasets: [{
                label: 'Motion Level',
                data: zeroValues,
                fill: true,
                lineTension: 0,
                backgroundColor: '#F5FBFB',
                borderColor: '#85CED1',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: '#fff',
                pointRadius: 0,
                pointHitRadius: 0,
                cubicInterpolationMode: 'default',
            }]
        }
        this.addData = this.addData.bind(this);
    }

    componentDidMount() {

        let width = window.innerWidth;
        let height = window.innerHeight;
        let graphHeight = 0;

        if (height > width) {

            graphHeight = (height - (height / 3)) - 235;

            this.setState({
                width: width,
                height: graphHeight,
            });

        } else {

            graphHeight = width / 3;

            this.setState({
                width: width,
                height: height - (width / 6) - 270,
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

        let avg0 = 0;
        let avg1 = 0;
        let avg2 = 0;
        let avg3 = 0;


        // let lastPoint = dataFile[dataFile.length - 1];
        // if (lastPoint < value) {
        //     avg0 = (value + lastPoint) / 8;
        //     avg1 = (value + lastPoint) / 6;
        //     avg2 = (value + lastPoint) / 4;
        //     avg3 = (value + lastPoint) / 2;
        // } else {
        //     avg0 = (value + lastPoint) / 2;
        //     avg1 = (value + lastPoint) / 4;
        //     avg2 = (value + lastPoint) / 6;
        //     avg3 = (value + lastPoint) / 8;
        // }
        // dataFile.push(avg0)
        // dataFile.push(avg1)
        // dataFile.push(avg2);
        // dataFile.push(avg3);

        dataFile.push(value);
        // dataFile = this.smoothOut(dataFile,0.5);
        // let smoothed = Smooth(dataFile);
        // for (let i = 1; i <= dataFile.length; i++) {
        //     dataFile[i] = smoothed(i);
        //     if (i === dataFile.length) {
        //         alert("ll");
        //     }
        // }

        newData[0].data = dataFile.slice(Math.max(dataFile.length - divs, 1))
        // console.log(newData);
        this.setState({ datasets: newData });
    }

    addBodyFrame = (bodyFrame) => {
        bodyFrames.push(bodyFrame);
        if (bodyFrames.length > 1) {
            let motionLevel = getMovementLevel(bodyFrames[bodyFrames.length - 1], bodyFrames[bodyFrames.length - 2]);
            this.addData(motionLevel);
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
                        cubicInterpolationMode={'monotone'}
                        options={{
                            bezierCurve: true,
                            legend: {
                                display: false
                            },
                            cubicInterpolationMode: 'default',
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