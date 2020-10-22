import { combineReducers } from 'redux'
import statisticReducer from './statisticReducer'

export default combineReducers({
  statistic: statisticReducer
})
