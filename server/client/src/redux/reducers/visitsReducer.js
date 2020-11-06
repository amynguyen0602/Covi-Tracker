const initialState = {
  visits: [],
  confirmedDate: null,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'ADD_VISITS':
      return {
        ...state,
        visits: [...state.visits, action.payload],
      }
    case 'REMOVE_VISIT':
      return {
        ...state,
        visits: state.visits.filter((visit) => visit.key !== action.payload),
      }
    case 'ADD_CONFIRMED_DATE':
      return {
        ...state,
        confirmedDate: action.payload,
      }
    case 'RESET_ON_SELF_REPORT_SUBMIT':
      return action.payload
    case 'ADD_SELF_REPORT_CASE':
      return {
        ...state,
        newCase: action.payload,
      }
    case 'FETCH_REPORT_CASES':
      return {
        ...state,
        reportCases: action.payload,
      }
    default:
      return state
    
  }
}
