'use-strict'

import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';

const ExperimentApp = function () {
    this.open = function(){
        const app = document.getElementsByClassName('workspace')[0];
        ReactDOM.render(<Layout/>, app);
    }
};

const experimentApp = new ExperimentApp();
module.exports = experimentApp;