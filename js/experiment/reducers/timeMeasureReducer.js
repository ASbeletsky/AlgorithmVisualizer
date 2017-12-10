export default function reducer(state=[], action) {
    switch (action.type) {
        case "ADD":{
            return state.concat(action.payload);
        }
        case "GET_ALL":{
            return state;
        }
        case "GET_BY_ALGORITHM":{
            return state.filter((m) => m.algorithm === action.payload)
        }
    }

    return state;
}
