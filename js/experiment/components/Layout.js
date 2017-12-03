import React from 'react';
import ExperimentForm from './experiment_settings/ExperimentForm'
const app = require('./../../app');

export default class Layout extends React.Component{
    render(){
        return(
            <div className="col-md-12">
                <div className="col-md-6">
                    <ExperimentForm categories={app.getCategories()}/>
                </div>
                <div className="col-md-6"></div>
            </div>);
    }
}