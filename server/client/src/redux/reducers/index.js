import { combineReducers } from 'redux'
import statisticReducer from './statisticReducer'
import chatbotReducer from './chatbotReducer'

export default combineReducers({
  statistic: statisticReducer,
  chatbot: chatbotReducer
})
