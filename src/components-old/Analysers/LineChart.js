import React, { Component } from 'react';
import { Line, defaults } from 'react-chartjs-2';
var LineChart = require("react-chartjs").Line;


class LineChart1 extends Component {

    constructor() {
        super();
    }

    componentWillMount() {
        let emptylabels = [];
        this.props.data1.forEach((element, index) => {
            emptylabels.push("");
        });

        this.state = {
            labels: emptylabels,
            datasets: [
                {
                    data: this.props.data1,
                    fill: true,
                    lineTension: .1,
                    // backgroundColor: '',
                    borderColor: '#5d17ff',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: '#fff',
                    pointRadius: 0,
                    pointHitRadius: 0,
                },
                {
                    data: this.props.data2,
                    fill: true,
                    lineTension: 1,
                    // backgroundColor: '',
                    borderColor: '#ff3c50',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    pointBackgroundColor: '#fff',
                    pointRadius: 0,
                    pointHitRadius: 0,
                }]
        }
    }

    render() {
        return (
            <div className="graph-card" >
                <Line height={'330'} width={this.props.width} data={this.state}
                    options={{
                        legend: {
                            display: false
                        },
                        scales: {

                            yAxes: [{
                                id: 'left-y-axis',
                                type: 'linear',
                                position: 'left',
                                ticks: {
                                    display: true,
                                    // min: 0,
                                    // max: 2.5,
                                }
                            }]
                        }
                    }} />
            </div>
        );
    }
}

export default LineChart1;