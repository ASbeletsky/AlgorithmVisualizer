const graphGenerator = require('./graph-generator');
const utils = require('./../utils');
const get = require('./..ajax/get');
const Server = require('./../server');
const graphs = graphGenerator();


const measureExecutionTime = (code) => {
    const start = performance.now();
    eval(code);
    const end = performance.now();
    return end - start;
};

// const runAlgorithms = (problem, algorithms) => {
//     for(var graph in graphs){
//         for(var algorithm in algorithmsNames){
//             var codeDir = utils.getFileDir(problem, algorithm, problem);
//             get(`${codeDir}code.js`).then((code) => {
//                 var executionTime = measureExecutionTime(code);
//             })
//         }
//     }
// }
