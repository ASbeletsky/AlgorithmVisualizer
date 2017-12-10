export function setAlgorithms(algorithmNames) {
    return {
        type: "SET_ALGORITHMS",
        payload: algorithmNames
    }
}

export function getAlgorithms() {
    return {
        type: "GET_ALL_ALGORITHMS"
    }
}

export function removeAll() {
    return {
        type: "REMOVE_ALL_ALGORITHMS"
    }
}