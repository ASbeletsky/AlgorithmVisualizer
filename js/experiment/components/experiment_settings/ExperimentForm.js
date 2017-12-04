import React from 'react';
import GraphSizeSlider from './GraphSizeSlider';
import ExperimentProgressBar from './ExperimentProgressBar';
import Select from 'react-select';
const app = require('./../../../app');
const algoritmsExecute = require('./../../algorithm-executer');

export default class ExperimentForm extends React.Component{
    constructor(props) {
        super(props);
        var defaultProblem = Object.keys(props.categories)[0];
        this.getGraphProblems = () => {
            return Object.keys(props.categories).map((categoryKey) => {
                return {value: categoryKey, label: app.getCategory(categoryKey).name}
            });
        };

        this.getProblemAlgorithms = (selectedProblem) => {
            return Object.entries(app.getCategory(selectedProblem).list).map((algorithm) => {
                return {value: algorithm[0], label: algorithm[1]}
            });
        };

        this.state = {
            selectedProblem: defaultProblem,
            selectedAlgorithms: "",
            graphProblems: this.getGraphProblems(),
            problemAlgorithms: this.getProblemAlgorithms(defaultProblem)
        };
    }

    handleChangeProblem (selectedProbem){
        this.setState({
            selectedProblem: selectedProbem,
            selectedAlgorithms: "",
            problemAlgorithms: this.getProblemAlgorithms(selectedProbem.value)
        });
    };

    handleChangeAlgomithms(selectedAlgorithms){
        this.setState({
            selectedAlgorithms: selectedAlgorithms,
        });
    };

    runAlgorithms(){
        algoritmsExecute(this.state.selectedProblem.value,
                         this.state.selectedAlgorithms.split(","),
                         10,
                         20);
    }

    render(){
        return (
        <div className="form-horizontal">
            <h3>Step 1. Generate input graphs</h3>
            <GraphSizeSlider minValue={10} maxValue={2000} stepSize="10" from={10} to={500}/>
            <h3>Step 2. Select algorithms for experiment</h3>
            <div className="form-group">
                <label className="col-md-3">Problem</label>
                <Select className="col-md-5" name="problem" value={this.state.selectedProblem} onChange={this.handleChangeProblem.bind(this)} options={this.state.graphProblems} />
            </div>
            <div className="form-group">
                <label className="col-md-3">Algorithms</label>
                <Select simpleValue className="col-md-5" name="algorithms" multi onChange={this.handleChangeAlgomithms.bind(this)} value={this.state.selectedAlgorithms} options={this.state.problemAlgorithms} />
            </div>
            <h3>Step 3. Run experiment</h3>
            <button onClick={this.runAlgorithms.bind(this)}>Run</button>
            <div className="col-md-8">
                <ExperimentProgressBar percentComplete={0} />
            </div>
        </div>);
    }
}
