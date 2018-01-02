import React from 'react';
import { connect } from 'react-redux'
import NumericInput from 'react-numeric-input';
import RangeSlider from './RangeSlider';
import ExperimentProgressBar from './ExperimentProgressBar';
import Select from 'react-select';
import store from './../../storage';
const algorithmActions = require('./../../actions/algorithm-actions');
const timeMeasureActions = require('./../../actions/time-measure-actions');
const app = require('./../../../app');

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
            return this.props.graphsProcessedCount / this.state.graphsCount * 100;
        };

        this.state = {
            graphsCount: 10,
            graphSizeFrom: 50,
            graphSizeTo: 100,
            edgesRatioFrom: 0.1,
            edgesRatioTo: 0.7,
            testsCount: 1,
            selectedProblem: defaultProblem,
            selectedAlgorithms: "",
            graphProblems: this.getGraphProblems(),
            problemAlgorithms: this.getProblemAlgorithms(defaultProblem),
        };
    }

    handleChangeGraphSize(from, to){
        this.setState({
            graphSizeFrom: from,
            graphSizeTo: to
        });
    }

    handleChangeEdgesRatio(from, to){
        this.setState({
            edgesRatioFrom: from,
            edgesRatioTo: to
        });
    }

    handleChangeGraphsCount(graphsCount){
        this.setState({graphsCount});
    }

    handleChangeTestsCount(testsCount){
        this.setState({testsCount});
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
                this.state.graphsCount,
                this.state.graphSizeFrom,
                this.state.graphSizeTo,
                this.state.edgesRatioFrom,
                this.state.edgesRatioTo,
                this.state.testsCount
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
            <br/>
            <div className="form-group">
                <label className="col-md-4">Graphs count</label>
                <div className="col-md-2">
                    <NumericInput className="form-control" type="text" value={this.state.graphsCount} onChange={this.handleChangeGraphsCount.bind(this)} min={5} max={100}/>
                </div>
            </div>
            <div>
                <RangeSlider label="Vertices" minValue={10} maxValue={1000} stepSize={10} from={this.state.graphSizeFrom} to={this.state.graphSizeTo} onChange={this.handleChangeGraphSize.bind(this)}/>
            </div>
            <div>
                <RangeSlider label="Edges ratio" minValue={0.1} maxValue={1.0} stepSize={0.1} from={this.state.edgesRatioFrom} to={this.state.edgesRatioTo} onChange={this.handleChangeEdgesRatio.bind(this)}/>
            </div>
            <h3>Step 2. Select algorithms for experiment</h3>
            <br/>
            <div className="form-group">
                <label className="col-md-3">Problem</label>
                <Select className="col-md-9" name="problem" value={this.state.selectedProblem} onChange={this.handleChangeProblem.bind(this)} options={this.state.graphProblems} />
            </div>
            <div className="form-group">
                <label className="col-md-3">Algorithms</label>
                <Select simpleValue className="col-md-9" name="algorithms" multi onChange={this.handleChangeAlgomithms.bind(this)} value={this.state.selectedAlgorithms} options={this.state.problemAlgorithms} />
            </div>
            <h3>Step 3. Run experiment</h3>
            <br/>
            <div className="form-group">
                <label className="col-md-4">Tests count</label>
                <div className="col-md-2">
                    <NumericInput className="form-control" type="text" value={this.state.testsCount} onChange={this.handleChangeTestsCount.bind(this)} min={1} max={64}/>
                </div>
            </div>
            <div className="form-group">
                <div className="col-md-2">
                    <label>Progress:</label>
                </div>
                <div className="col-md-8">
                    <ExperimentProgressBar percentComplete={this.getProcessedGraphsPercent().toFixed(2)} />
                </div>
                <div className="col-md-2">
                    <a href="#" className="btn-sm btn-primary" onClick={this.runAlgorithms.bind(this)}>
                        <i className="fa fa-play" aria-hidden="true"> Run</i>
                    </a>
                </div>
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