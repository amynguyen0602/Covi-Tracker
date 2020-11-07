import { FETCH_CHATBOT_RESPONSE } from "../actions/types";

export default function statisticReducer(state =[], action) {
    switch(action.type) {
        case FETCH_CHATBOT_RESPONSE:
            return {
                ...state,
                bot_response: action.payload,
              }
        default:
            return state;
    }
}