import React from 'react';
import { connect } from 'react-redux';
const Plotly = require('plotly.js');
const arrayUtils = require('./../../module/data/array1d.js');

class ExecutionTime3dChart extends React.Component {
    constructor(props){
        super(props);
        this.containerId = '3d-plot';
        this.options = {
            title: 'Mt Bruno Elevation',
            autosize: false,
            width: 500,
            height: 500,
            margin: {
                l: 65,
                r: 50,
                b: 65,
                t: 90,
            }
        };
    }

    componentDidUpdate(){
        const xPoints = this.props.timeMeasure.map(t => t.graphSize);
        const yPoints = this.props.timeMeasure.map(t => t.edgesCount);
        const data = this.props.algorithms.map(algorithmName =>{
            let zPoints = this.props.timeMeasure.map(t => t[algorithmName].averageExecutionTime);
            return {
                x: xPoints,
                y: yPoints,
                z: zPoints,
                type: 'surface'
            };
        });
        if(this.props.calculationsPerformed) {
            this.graph3d = Plotly.newPlot(this.containerId, data, this.options);
        }
    }

    render() {
         if(this.props.calculationsPerformed) {
             return <div id={this.containerId}></div>
         } else {
             return <div></div>
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

export default connect(mapStateToProps)(ExecutionTime3dChart)

