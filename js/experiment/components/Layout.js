import React from 'react';
import ExperimentForm from './experiment_settings/ExperimentForm'
import ExecutionTimeChart from './ExecutionTimeChart'
import TimeEfficiencyTable from './TimeEfficiencyTable'
const app = require('./../../app');

class Layout extends React.Component{
    render(){
        return(
            <div className="col-md-12">
                <div className="col-md-5 col-xs-12">
                    <ExperimentForm categories={app.getCategories()}/>
                </div>
                <div className="col-md-7 col-xs-12">
                    <div className="text-center">
                        <h3>Execution time</h3>
                    </div>
                    <ExecutionTimeChart/>
                    <div className="text-center">
                        <h3>Time efficiency</h3>
                    </div>
                    <TimeEfficiencyTable/>
                </div>
            </div>);
    }
}

export default Layout