import { FETCH_STATISTICS } from "../actions/types";

export default function statisticReducer(state =[], action) {
    switch(action.type) {
        case FETCH_STATISTICS:
            return action.payload;
        default:
            return state;
    }
}