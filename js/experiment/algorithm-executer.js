const graphGenerator = require('./graph-generator');
const utils = require('./../utils');
const get = require('./../server/ajax/get');
const Server = require('./../server');


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
    const graphs = graphGenerator(startSize, endSize);
    return loadAlgorithms(problem, algorithms).then(() => {
        for(var graph of graphs){
            algorithms.forEach((algorithm) =>{
                let executionTime = measureExecutionTime(graph, algorithmsCode.get(algorithm));
                algorithmsMeasure.set(algorithm, {graph, executionTime });
            });
        }

        return algorithmsMeasure;
    });
};

module.exports = runAlgorithms;