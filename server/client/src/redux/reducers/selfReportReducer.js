export default (state = [], action) => {
  console.log(`previous state ${state}`);
  console.log(`ACTION ${action}`);
  switch (action.type) {
    case 'ADD_VISIT':
      return [...state, action.payload]
    default:
      return state
  }
}
