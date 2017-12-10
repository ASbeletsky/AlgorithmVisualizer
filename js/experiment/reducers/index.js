import { combineReducers } from 'redux';
import algorithms from './algorithms-reducer'
import timeMeasure from './time-measure-reducer'

export default combineReducers({
    algorithms,
    timeMeasure
})