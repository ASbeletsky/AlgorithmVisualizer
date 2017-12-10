export default function reducer(state=[], action) {
    switch (action.type) {
        case "ADD_TIME_MEASURE":{
            return state.concat(action.payload);
        }
        case "GET_ALL_TIME_MEASURES":{
            return state;
        }
        case  "REMOVE_ALL_TIME_MEASURES":{
            return [];
        }
    }

    return state;
}
