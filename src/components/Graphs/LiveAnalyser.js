import React, { Component } from 'react';
import './Graphs.css';

import {
    ResponsiveContainer, LineChart, Line, XAxis, YAxis, ReferenceLine,
    ReferenceDot, Tooltip, CartesianGrid, Legend, Brush, ErrorBar, AreaChart, Area,
    Label, LabelList
} from 'recharts';


class LiveAnalyser extends Component {
    constructor() {
        super();
        this.state = {
            data: [
                { diff: 2 },
            ],
        }
        this.addData = this.addData.bind(this);
    }

    componentDidMount() {
        this.addData(0);
        this.addData(1);
        this.addData(2);
        this.addData(3);
    }

    addData(n) {
        let newData = this.state.data;
        newData.push({ diff: n });
        this.setState({ data: newData });
    }

    render() {
        return (
            <div className="live-displacement">
                <LineChart height={448} width={770}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    data={this.state.data}>
                    <CartesianGrid stroke='#ddd' fill="rgba(255,255,255,0.6)" />
                    <Line type="monotone" dataKey="diff" stroke="#8884d8" />
                </LineChart>
            </div >
        );
    }
}

export default LiveAnalyser;