export function addTimeMeasure(payload) {
    return {
        type: "ADD_TIME_MEASURE",
        payload: payload
    }
}

export function getTimeMeasures() {
    return {
        type: "GET_ALL_TIME_MEASURES"
    }
}

export function clear() {
    return {
        type: "REMOVE_ALL_TIME_MEASURES"
    }
}