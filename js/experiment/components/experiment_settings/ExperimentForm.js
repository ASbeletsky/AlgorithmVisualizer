import React from 'react';
import { connect } from 'react-redux'
import GraphSizeSlider from './GraphSizeSlider';
import ExperimentProgressBar from './ExperimentProgressBar';
import Select from 'react-select';
const algorithmActions = require('./../../actions/algorithm-actions');
const timeMeasureActions = require('./../../actions/time-measure-actions');
const app = require('./../../../app');
import store from './../../storage'

class ExperimentForm extends React.Component{
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

        this.getProcessedGraphsPercent = function(){
            let graphsToProccessCount = (this.state.graphSizeTo + this.state.graphSizeStep - this.state.graphSizeFrom) / this.state.graphSizeStep;
            return this.props.graphsProcessedCount / graphsToProccessCount * 100;
        };

        this.state = {
            graphSizeFrom: 10,
            graphSizeTo: 500,
            graphSizeStep: 10,
            selectedProblem: defaultProblem,
            selectedAlgorithms: "",
            graphProblems: this.getGraphProblems(),
            problemAlgorithms: this.getProblemAlgorithms(defaultProblem),
            percentComplete: 0,
        };
    }

    handleChangeGraphSize(from, to, step){
        this.setState({
            graphSizeFrom: from,
            graphSizeTo: to,
            graphSizeStep: step
        });
    }

    handleChangeProblem (selectedProbem){
        this.setState({
            selectedProblem: selectedProbem,
            selectedAlgorithms: "",
            problemAlgorithms: this.getProblemAlgorithms(selectedProbem.value)
        });
    };

    handleChangeAlgomithms(selectedAlgorithmsString){
        let selectedAlgorithms = selectedAlgorithmsString.split(",");
        this.setState({ selectedAlgorithms: selectedAlgorithmsString });
        this.props.dispatch(algorithmActions.setAlgorithms(selectedAlgorithms));
    };

    runAlgorithms() {
        this.props.dispatch(timeMeasureActions.clear());
        this.algorithmWorker = this.algorithmWorker || new Worker('./public/algorithm-executer.js');
        this.algorithmWorker.postMessage({
            task: 'runAlgorithms',
            args: [this.state.selectedProblem.value,
                this.state.selectedAlgorithms.split(","),
                this.state.graphSizeFrom,
                this.state.graphSizeTo,
                this.state.graphSizeStep,
            ]
        });

        this.algorithmWorker.onmessage = function (msg) {
            store.dispatch(timeMeasureActions.addTimeMeasure(msg.data));
        };
    }

    render(){
        return (
        <div className="form-horizontal">
            <h3>Step 1. Generate input graphs</h3>
            <GraphSizeSlider minValue={10} maxValue={2000} stepSize={this.state.graphSizeStep} from={this.state.graphSizeFrom} to={this.state.graphSizeTo} onChange={this.handleChangeGraphSize.bind(this)}/>
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
            <button onClick={this.runAlgorithms.bind(this)} className="btn btn-primary">Run</button>
            <div className="col-md-8">
                <ExperimentProgressBar percentComplete={this.getProcessedGraphsPercent().toFixed(2)} />
            </div>
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        graphsProcessedCount: state.timeMeasure.length
    };
}

export default connect(mapStateToProps)(ExperimentForm)