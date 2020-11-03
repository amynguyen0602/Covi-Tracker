import { FETCH_CANADA_STATISTICS, FETCH_PROVINCE_STATISTICS } from '../actions/types'

export default function statisticReducer(state = [], action) {
  switch (action.type) {
    case FETCH_CANADA_STATISTICS:
      return {
        ...state,
        canada: action.payload,
      }

    case FETCH_PROVINCE_STATISTICS:
      return {
        ...state,
        provincial: action.payload,
      }

    default:
      return state
  }
}
