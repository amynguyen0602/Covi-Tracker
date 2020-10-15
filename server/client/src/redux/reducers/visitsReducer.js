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
    default:
      return state
  }
}
