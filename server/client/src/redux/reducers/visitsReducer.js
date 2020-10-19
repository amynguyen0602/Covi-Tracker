const initialState = {
  visits: [],
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
    default:
      return state
  }
}
