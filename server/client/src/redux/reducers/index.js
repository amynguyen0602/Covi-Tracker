import { combineReducers } from 'redux'
import selfReportReducer from './selfReportReducer'

export default combineReducers({
  visits: selfReportReducer,
})
