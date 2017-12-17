const calculateAverage = arr => arr.reduce( ( accum, current ) => accum + current, 0 ) / arr.length;

const calculateAlgorithmDominanceRateAtPoint = function (executionTime1, executionTime2) {
    return (executionTime1 - executionTime2)/Math.max(executionTime1, executionTime2);
};

const calculateAlgorithmDominanceRate = function (firstAlgorithmName, secondAlgorithmName, executionTimeMeasure) {
    let dominanceRates = executionTimeMeasure.map(timeAtPoint => calculateAlgorithmDominanceRateAtPoint(timeAtPoint[firstAlgorithmName], timeAtPoint[secondAlgorithmName]));
    return calculateAverage(dominanceRates);
};

const calculateAlgorithmDominanceRegionAtPoint = function (executionTime1, executionTime2) {
    return Math.sign(executionTime1 - executionTime2);
};

const calculateAlgorithmDominanceRegion = function(firstAlgorithmName, secondAlgorithmName, executionTimeMeasure){
    let dominanceRegions = executionTimeMeasure.map(timeAtPoint => calculateAlgorithmDominanceRegionAtPoint(timeAtPoint[firstAlgorithmName], timeAtPoint[secondAlgorithmName]));
    return calculateAverage(dominanceRegions);
};

const calculateDominance = function (algothms, executionTimeMeasure) {
    const dominance = {};
    algothms.forEach((first) => {
        dominance[first] = {};
        algothms.forEach((second) => {
            let same = first == second;
            dominance[first][second] = {
                rate: same ? 0 : calculateAlgorithmDominanceRate(first, second, executionTimeMeasure),
                region: same ? 0 : calculateAlgorithmDominanceRegion(first, second, executionTimeMeasure)
            }
        });
    });

    return dominance;
};

module.exports = {
    calculateDominance,
    calculateAlgorithmDominanceRegion,
    calculateAlgorithmDominanceRate
};