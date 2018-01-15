import React from 'react';
import { connect } from 'react-redux'
import {LineChart, Line, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
const arrayUtils = require('./../../module/data/array1d.js');
const colors = ["#8884d8", "#82ca9d", "#ffc658" ];

class ExecutionTimeChart extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.getAverageExecutionTime = function (algorithmName) {
            return (graph) => { return graph[algorithmName]};
        };
    }

    render() {
        if(this.props.calculationsPerformed){
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
                        return <Line key={index} type="monotone" dataKey={this.getAverageExecutionTime(algorithmName)} stroke={colors[index]}/>
                    })
                }
            </LineChart>);

        } else{
           return <div></div>;
        }
    }
}

function mapStateToProps(state) {
    return {
        calculationsPerformed: state.timeMeasure.length > 0,
        algorithms: state.algorithms,
        timeMeasure: state.timeMeasure.sort(arrayUtils.sortBy("graphSize"))
    };
}

export default connect(mapStateToProps)(ExecutionTimeChart)
