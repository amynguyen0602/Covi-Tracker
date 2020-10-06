export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_VISIT':
      return [...state, action.payload]
    default:
      return state
  }
}
