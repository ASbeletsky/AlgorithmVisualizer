export default function reducer(state=[], action) {
    switch (action.type) {
        case "SET_ALGORITHMS":{
            return action.payload;
        }
        case "GET_ALL_ALGORITHMS":{
            return state;
        }
        case "REMOVE_ALL_ALGORITHMS":{
            return [];
        }
    }

    return state;
}
