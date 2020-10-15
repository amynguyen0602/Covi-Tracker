export const addVisit = (visit) => {
  console.log('actioncreater visit:' + visit.place)
  return {
    type: 'ADD_VISIT',
    payload: visit,
  }
}

export const getVisits = (state) => {
  return {
    type: 'GET_VISITS',
    payload: state.visits,
  }
}
