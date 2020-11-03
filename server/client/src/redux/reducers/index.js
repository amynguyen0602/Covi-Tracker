import { combineReducers } from 'redux'
import statisticReducer from './statisticReducer'
import chatbotReducer from './chatbotReducer'
import visitsReducer from './visitsReducer'

export default combineReducers({
  selfReport: visitsReducer,
  statistic: statisticReducer,
  chatbot: chatbotReducer,
})
