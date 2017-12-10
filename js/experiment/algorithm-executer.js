const graphGenerator = require('./../module/data/weighted_directed_graph');
const utils = require('./../utils');
const get = require('./../server/ajax/get');
import store from './storage'
const actions = require('./actions/time-measure-actions');

const algorithmsCode = new Map();
const algorithmsMeasure = new Map();
const loadAlgorithms = (problem, algorithms) => {
    return Promise.all(algorithms.map(algorithm => {
        var codeDir = utils.getFileDir(problem, algorithm, problem);
        return get(`${codeDir}pure-code.js`).then(code => algorithmsCode.set(algorithm, code))
    }));
};

const measureExecutionTime = (graph, code) => {
    var algo = new Function("G", code);
    const start = performance.now();
    algo(graph);
    const end = performance.now();
    return end - start;
};

const runAlgorithms = (problem, algorithms, startSize, endSize) => {
    return loadAlgorithms(problem, algorithms).then(() => {
        for(let size = startSize; size <= endSize; size += 10){
            const graph = graphGenerator.random(size);
            const result = { graphSize: size };
            algorithms.forEach((algorithm) =>{
                let executionTime = measureExecutionTime(graph, algorithmsCode.get(algorithm));
                result[algorithm] = executionTime;
            });

            store.dispatch(actions.addTimeMeasure(result));
        }

        return algorithmsMeasure;
    });
};

module.exports = runAlgorithms;