importScripts("/js/experiment/workers/fakeDOM.js");
importScripts("/public/lib/jquery-2.2.3.min.js");
const graphGenerator = require('./../../module/data/weighted_directed_graph');
const utils = require('./../../utils');
const getText = require('./../../server/ajax/get_text');
const integerUtils = require('./../../module/data/integer');
const arrayUtils = require('./../../module/data/array1d');

    const algorithmsCode = new Map();
    const loadAlgorithms = (problem, algorithms) => {
        return Promise.all(algorithms.map(algorithm => {
            var codeDir = './.' + utils.getFileDir(problem, algorithm, problem);
            return getText(`${codeDir}pure-code.js`).then(code => algorithmsCode.set(algorithm, code))
        }));
    };

    const measureExecutionTime = (graph, code, execuresCount = 1) => {
        var algo = new Function("G", code);
        var executionTimes = [];
        for(let i = 0; i < execuresCount; i++){
            const start = performance.now();
            algo(graph);
            const end = performance.now();
            executionTimes.push(end - start);
        }
        return executionTimes;
    };

    const countEdges = (graph) => {
        var edgesCount = 0;
        for(let i = 0; i < graph.length; i++){
            for(let j = i; j < graph.length; j++){
                if(graph[i][j] > 0) {
                    edgesCount++;
                }
            }
        }

        return edgesCount;
    };

    self.runAlgorithms = (problem, algorithms, runsCount, startSize, endSize, startEdgesRatio, endEdgesRatio, testsCount) => {
        var timeMeasures = [];
        return loadAlgorithms(problem, algorithms).then(() => {
            for (let iteration = 1; iteration <= runsCount; iteration++) {
                var currentGraphSize = integerUtils.random(startSize, endSize);
                var currentEdgesRatio = integerUtils.random(startEdgesRatio, endEdgesRatio);
                const graph = graphGenerator.random(currentGraphSize, currentEdgesRatio);
                const edgesCount = currentEdgesRatio == 1? currentGraphSize * (currentGraphSize - 1) / 2 : countEdges(graph)
                const timeMeasure = { graphSize: currentGraphSize, edgesCount: edgesCount };
                algorithms.forEach((algorithm) => {
                    let executionTimes = measureExecutionTime(graph, algorithmsCode.get(algorithm), testsCount);
                    timeMeasure[algorithm] = {};
                    timeMeasure[algorithm] = arrayUtils.calculateAverage(executionTimes);
                });
                timeMeasures.push(timeMeasure);

                let graphsProcessedRatio = iteration/runsCount;
                if( graphsProcessedRatio >= 0.1){
                    postMessage(timeMeasures.slice(0, iteration));
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