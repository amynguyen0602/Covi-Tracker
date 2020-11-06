import axios from 'axios'

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

export const addConfirmedDate = (confirmedDate) => (dispatch) => {
  dispatch({
    type: 'ADD_CONFIRMED_DATE',
    payload: confirmedDate,
  })
}

export const resetOnSelfReportSubmit = () => (dispatch) => {
  dispatch({
    type: 'RESET_ON_SELF_REPORT_SUBMIT',
    payload: {
      visits: [],
      confirmedDate: null,
    },
  })
}

export const addSelfReportCase = (selfReport) => async (dispatch) => {
  const res = await axios.post('/api/self_report', selfReport)
  dispatch({
    type: 'ADD_SELF_REPORT_CASE',
    payload: res.data,
  })
}

export const fetchReportCases = () => async (dispatch) => {
  const res = await axios.get('/api/report_cases')
  dispatch({
    type: 'FETCH_REPORT_CASES',
    payload: res.data,
  })
}
