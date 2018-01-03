import React from 'react';
import { connect } from 'react-redux';
const Plotly = require('plotly.js');
const arrayUtils = require('./../../module/data/array1d.js');
const colors = ["#8884d8", "#82ca9d", "#ffc658" ];

class ExecutionTime3dChart extends React.Component {
    constructor(props){
        super(props);
        this.containerId = '3d-plot';
        this.options = {
            title: 'Execution time',
            showlegend: true,
            autosize: true,
            bgcolor: '#505050',
            scene: {
                xaxis: {
                    title: 'Vertices count'},
                    yaxis: {title: 'Edges count'},
                    zaxis: {title: 'Execution time'}
                 }
            };
    }

    componentDidUpdate(){
        const xPoints = this.props.timeMeasure.map(t => t.graphSize);
        const yPoints = this.props.timeMeasure.map(t => t.edgesCount);
        const data = this.props.algorithms.map((algorithmName, index) =>{
            let zPoints = this.props.timeMeasure.map(t => t[algorithmName].averageExecutionTime);
            return {
                opacity:0.8,
                color: colors[index],
                type: 'mesh3d',
                x: xPoints,
                y: yPoints,
                z: zPoints,
            };
        });
        if(this.props.calculationsPerformed) {
            this.graph3d = Plotly.newPlot(this.containerId, data, this.options);
        }
    }

    render() {
         if(this.props.calculationsPerformed) {
             return <div id='3d-plot'></div>
         } else {
             return <div></div>
         }
    }
}

function mapStateToProps(state) {
    return {
        calculationsPerformed: state.timeMeasure.length > 2,
        algorithms: state.algorithms,
        timeMeasure: state.timeMeasure.sort(arrayUtils.sortBy("graphSize"))
    };
}

export default connect(mapStateToProps)(ExecutionTime3dChart)

