import React from 'react';

export default class GraphSizeSlider extends React.Component{
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
        this.setState({ from: e.value[0], to: e.value[1] });
        this.props.onChange(this.state.from, this.state.to);
    }

    changeLowerBound(e){
        this.setState({ from: parseInt(e.target.value)});
        this.props.onChange(this.state.from, this.state.to);
    }

    changeUpperBound(e){
        this.setState({ to: parseInt(e.target.value) });
        this.props.onChange(this.state.from, this.state.to);
    }

    render(){
        return (
            <div>
                <div className="form-group">
                    <label className="col-md-4">Vertices count range</label>
                    <input ref="vertexRange" type="text" />
                </div>
                <div className="form-group">
                    <label className="col-md-4">Lower bound</label>
                    <div className="col-md-2">
                        <input className="form-control" type="number" value={this.state.from} onChange={this.changeLowerBound.bind(this)} min={this.props.minValue} max={this.props.maxValue} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-md-4">Upper bound</label>
                    <div className="col-md-2">
                        <input className="form-control" type="number" value={this.state.to} onChange={this.changeUpperBound.bind(this)} min={this.props.minValue} max={this.props.maxValue}/>
                    </div>
                </div>
            </div>
        );
    }
}
