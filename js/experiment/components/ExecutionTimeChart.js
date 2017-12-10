import React from 'react';
import { connect } from 'react-redux'
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const colors = ["#8884d8", "#82ca9d", "#ffc658" ];

class ExecutionTimeChart extends React.Component {
    render() {
        return (
            <LineChart width={700} height={350} data={this.props.timeMeasure}
                       margin={{top: 5, right: 20, left: 10, bottom: 5}}>
                <XAxis dataKey="graphSize"/>
                <YAxis />
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
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
