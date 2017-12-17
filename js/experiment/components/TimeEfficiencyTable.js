import React from 'react';
import { connect } from 'react-redux'
const efficiencyMeasure = require('./../efficiency-measure.js')

class TimeEfficiencyTable extends React.Component{
    render(){
        var showResults = this.props.calculationsPerformed && this.props.algorithms.length >= 2;
        if(showResults) {
            return (
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Algorithm</th>
                        <th>Efficiency criteria</th>
                        {
                            this.props.algorithms.map((algorithmName, index) => {
                                return <th key={index}>{algorithmName}</th>
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.algorithms.map((firstAlgorithm, index) => {
                            return (<tr key={index}>
                                <td>{firstAlgorithm}</td>
                                <td>
                                    <div>Dominance rate</div>
                                    <div>Dominance region</div>
                                </td>
                                {
                                    this.props.algorithms.map((secondAlgorithm, index) => {
                                        return <td key={index}>
                                            <div>{this.props.dominance[firstAlgorithm][secondAlgorithm].rate.toFixed(2) * 100 + '%'}</div>
                                            <div>{this.props.dominance[firstAlgorithm][secondAlgorithm].region.toFixed(2) * 100 + '%'}</div>
                                        </td>
                                    })
                                }
                            </tr>)
                        })
                    }
                    </tbody>
                </table>
            );
        } else {
           return <div></div>;
        }
    }
}

function mapStateToProps(state) {
    return {
        algorithms: state.algorithms,
        calculationsPerformed: state.timeMeasure.length > 0,
        dominance: efficiencyMeasure.calculateDominance(state.algorithms, state.timeMeasure)
    };
}

export default connect(mapStateToProps)(TimeEfficiencyTable)
