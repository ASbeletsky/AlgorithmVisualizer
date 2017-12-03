const WeightedDirectedGraph = require('./../module/data/weighted_directed_graph');

function* generateRange(fromSize, toSize, step = 10) {
    for(let size = fromSize; size <= toSize; size += step){
       yield WeightedDirectedGraph.random(size)
    }
}

module.exports = generateRange;