import React from 'react';
import { connect } from 'react-redux'
const arrayUtils = require('./../../../module/data/array1d.js');
const CSVExporter = require('./../../csv-exporter');

class CSVExport extends React.Component{
    handleClick(e) {
        e.preventDefault();
        CSVExporter.downloadCSV({ filename: "experiment.csv", data: this.props.timeMeasure })
    }
    render(){
        if(this.props.experimentDone){
            return(
                <a href='#' onClick={this.handleClick.bind(this)}>Download results</a>
            )
        } else {
            return (<div></div>)
        }
    }
}

function mapStateToProps(state) {
    return {
        timeMeasure: state.timeMeasure.sort(arrayUtils.sortBy("graphSize"))
    };
}

export default connect(mapStateToProps)(CSVExport)
