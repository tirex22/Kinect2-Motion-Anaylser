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
                label: '',
                data: zeroValues,
                fill: true,
                lineTension: 0.1,
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: '#c2bee5',
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
        this.addData(0);
    }

    getRandomInt(max) {
        let n = Math.floor(Math.random() * Math.floor(max));
        console.log(n);
        return n;
    }

    addData(n) {
        setTimeout(() => {
            let newData = this.state.datasets
            let dataFile = newData[0].data;
            dataFile.push(this.getRandomInt(10));
            newData[0].data = dataFile.slice(Math.max(newData.length - divs, 1))
            this.setState({ datasets: newData });
            this.addData(n + 1);
        }, 50);
    }

    render() {
        return (
            <div className="live-displacement">
                <Line height={440} width={770} data={this.state}
                    options={{
                        maintainAspectRatio: true
                    }} />
            </div >
        );
    }
}

export default LiveAnalyser;