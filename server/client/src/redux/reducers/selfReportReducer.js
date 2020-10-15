export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_VISIT':
      console.log(action.payload)
      return [...state, action.payload]
    case 'GET_VISITS':
      console.log(action.payload)
      return { visits: action.payload }
    default:
      return state
  }
}
