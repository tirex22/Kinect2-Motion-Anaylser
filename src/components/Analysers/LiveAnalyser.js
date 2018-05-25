import React, { Component } from 'react';
import './Graphs.css';
import { Line, defaults } from 'react-chartjs-2';

defaults.global.animation = false;

const divs = 100;

class LiveAnalyser extends Component {
    constructor() {
        super();

        let emptyLables = [];
        let zeroValues = [];

        for (let i = 0; i < divs; i++) {
            emptyLables.push("");
            zeroValues.push(0);
        }

        this.state = {
            labels: emptyLables,
            datasets: [{
                label: 'Motion Level',
                data: zeroValues,
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: '#71FEDB',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                pointBackgroundColor: '#fff',
                pointRadius: 0,
                pointHitRadius: 0,
            }]

        }
        this.addData = this.addData.bind(this);
    }

    componentDidMount() {
        // this.addData(0);
    }

    getRandomInt(max) {
        let n = Math.floor(Math.random() * Math.floor(max));
        // console.log(n);
        return n;
    }

    addData(n) {
        let newData = this.state.datasets
        let dataFile = newData[0].data;
        dataFile.push(n);
        newData[0].data = dataFile.slice(Math.max(dataFile.length - divs, 1))
        // console.log(newData);
        this.setState({ datasets: newData });
    }

    render() {
        return (
            <div className="card">
                {this.props.height !== 0 ?
                    <Line height={this.props.height} width={this.props.width} data={this.state}
                        options={{
                            scales: {
                                yAxes: [{
                                    id: 'left-y-axis',
                                    type: 'linear',
                                    position: 'left',
                                    ticks: {
                                        display: false,
                                        min: 0,
                                        max: 2.5,
                                    }
                                }]
                            }
                        }} />
                    : null
                }
            </div>
        );
    }
}

export default LiveAnalyser;