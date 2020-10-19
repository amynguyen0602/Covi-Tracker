import store from '../store'

export const getVisits = () => (dispatch, getState) => {
  return getState().selfReport.visits
}

export const addVisit = (visitData) => (dispatch) => {
  dispatch({
    type: 'ADD_VISITS',
    payload: visitData,
  })
}

export const removeVisit = (visitKey) => (dispatch) => {
  console.log(`removeVisit ${visitKey}`)
  dispatch({
    type: 'REMOVE_VISIT',
    payload: visitKey,
  })
}
