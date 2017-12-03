import React from 'react';

export default class ExperimentProgressBar extends React.Component{
    render(){
        return(
            <div className="progress">
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{width:this.props.percentComplete + '%', color: 'black'}}
                     aria-valuemin="0"
                     aria-valuemax="100"
                     aria-valuenow={this.props.percentComplete}>
                    {this.props.percentComplete + '% Complete'}
                </div>
            </div>);
    }
}