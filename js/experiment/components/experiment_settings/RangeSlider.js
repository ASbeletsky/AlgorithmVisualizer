import React from 'react';
import NumericInput from 'react-numeric-input';
const $ = jQuery || require('jquery-browserify');

export default class RangeSlider extends React.Component{
    constructor(props) {
        super(props);
        this.state = {from: props.from, to: props.to}
    }

    componentDidMount(){
        this.$slider = $(this.refs.vertexRange);
        this.$slider.slider({
            min: this.props.minValue,
            max: this.props.maxValue,
            step: this.props.stepSize,
            range: true,
            value: [this.state.from, this.state.to]
        });

        this.$slider.on('slide', this.handleChange.bind(this))
    }

    componentDidUpdate(){
        this.$slider.slider('setValue', [this.state.from, this.state.to]);
    }

    handleChange(e){
        this.setState({ from: e.value[0], to: e.value[1] },() => {
            this.props.onChange(this.state.from, this.state.to);
        });
    }

    changeLowerBound(value){
        this.setState({ from: value},() => {
            this.props.onChange(this.state.from, this.state.to);
        });
    }

    changeUpperBound(value){
        this.setState({ to: value },() => {
            this.props.onChange(this.state.from, this.state.to);
        });
    }

    render(){
        return (
            <div>
                <div className="form-group">
                    <label className="col-md-4">{this.props.label}</label>
                    <div className="col-md-8">
                        <input ref="vertexRange" type="text" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-4">Lower bound</label>
                    <div className="col-md-2">
                        <NumericInput className="form-control" type="text" value={this.state.from} onChange={this.changeLowerBound.bind(this)} min={this.props.minValue} max={this.props.maxValue} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-4">Upper bound</label>
                    <div className="col-md-2">
                        <NumericInput className="form-control" type="text" value={this.state.to} onChange={this.changeUpperBound.bind(this)} min={this.props.minValue} max={this.props.maxValue}/>
                    </div>
                </div>
            </div>
        );
    }
}
