importScripts("/js/experiment/workers/fakeDOM.js");
importScripts("/public/lib/jquery-2.2.3.min.js");
const graphGenerator = require('./../../module/data/weighted_directed_graph');
const utils = require('./../../utils');
const getText = require('./../../server/ajax/get_text');

    postMessage("in worker");
    const algorithmsCode = new Map();
    const loadAlgorithms = (problem, algorithms) => {
        return Promise.all(algorithms.map(algorithm => {
            var codeDir = './.' + utils.getFileDir(problem, algorithm, problem);
            return getText(`${codeDir}pure-code.js`).then(code => algorithmsCode.set(algorithm, code))
        }));
    };

    const measureExecutionTime = (graph, code) => {
        var algo = new Function("G", code);
        const start = performance.now();
        algo(graph);
        const end = performance.now();
        return end - start;
    };

    self.runAlgorithms = (problem, algorithms, startSize, endSize, step) => {
        var timeMeasures = [];
        const graphsCount = (endSize - startSize) / step;
        return loadAlgorithms(problem, algorithms).then(() => {
            for (let currentGraphSize = startSize; currentGraphSize <= endSize; currentGraphSize += step) {
                const graph = graphGenerator.random(currentGraphSize);
                const timeMeasure = {graphSize: currentGraphSize};
                algorithms.forEach((algorithm) => {
                    let executionTime = measureExecutionTime(graph, algorithmsCode.get(algorithm));
                    timeMeasure[algorithm] = executionTime;
                });
                timeMeasures.push(timeMeasure);

                let graphsDoneCount = (currentGraphSize - startSize + step) / step;
                if( graphsDoneCount / graphsCount >= 0.1){
                    postMessage(timeMeasures.slice(0, graphsDoneCount));
                    timeMeasures = [];
                }
            }

            postMessage(timeMeasures);
        });
    };

    self.onmessage = function (msg) {
        console.log(msg);
        if (msg.data.task) {
            self[msg.data.task].apply(self, msg.data.args);
        }
    };