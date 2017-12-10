'use-strict'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Layout from './components/Layout';
import store from './storage'

const ExperimentApp = function () {
    this.open = function(){
        const app = document.getElementsByClassName('workspace')[0];
        ReactDOM.render(<Provider store={store}>
                            <Layout/>
                        </Provider>, app);
    }
};

module.exports = new ExperimentApp();