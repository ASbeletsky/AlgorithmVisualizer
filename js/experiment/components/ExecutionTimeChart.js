import React from 'react';
import { connect } from 'react-redux'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

const colors = ["#8884d8", "#82ca9d", "#ffc658" ];

class ExecutionTimeChart extends React.Component {
    render() {
        return (
            <LineChart width={700} height={350} data={this.props.timeMeasure}
                       margin={{top: 10, right: 50, left: 5, bottom: 15}}>
                <XAxis dataKey="graphSize">
                    <Label value="Graph size" offset={0} position="bottom" />
                </XAxis>
                <YAxis >
                    <Label value="Time (ms)" offset={0} position="insideLeft" />
                </YAxis>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend verticalAlign="top"/>
                {
                    this.props.algorithms.map((algorithmName, index) =>{
                        return <Line key={index} type="monotone" dataKey={algorithmName} stroke={colors[index]}/>
                    })
                }
            </LineChart>
        );
    }
}

function mapStateToProps(state) {
    return {
        algorithms: state.algorithms,
        timeMeasure: state.timeMeasure
    };
}

export default connect(mapStateToProps)(ExecutionTimeChart)
