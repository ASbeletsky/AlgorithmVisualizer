export function addTimeMeasure(algorithm, graphSize, executionTime) {
    return {
        type: "ADD",
        payload: {
            algorithm,
            graphSize,
            executionTime
        }
    }
}

export function getTimeMeasures() {
    return {
        type: "GET_ALL"
    }
}

export function getTimeMeasure(algorithm) {
    return {
        type: "GET_BY_ALGORITHM",
        payload: algorithm
    }
}
