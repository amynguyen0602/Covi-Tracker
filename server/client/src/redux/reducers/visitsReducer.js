import { ADD_VISITS, REMOVE_VISIT, ADD_CONFIRMED_DATE, RESET_ON_SELF_REPORT_SUBMIT } from '../actions/types'

const initialState = {
  visits: [],
  confirmedDate: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_VISITS:
      return {
        ...state,
        visits: [...state.visits, action.payload],
      }
    case REMOVE_VISIT:
      return {
        ...state,
        visits: state.visits.filter((visit) => visit.key !== action.payload),
      }
    case ADD_CONFIRMED_DATE:
      return {
        ...state,
        confirmedDate: action.payload,
      }
    case RESET_ON_SELF_REPORT_SUBMIT:
      return action.payload
    default:
      return state
  }
}
