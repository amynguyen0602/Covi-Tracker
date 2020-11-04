import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import statisticReducer from './reducers/statisticReducer'
import chatbotReducer from './reducers/chatbotReducer'
import visitsReducer from './reducers/visitsReducer'

const initialState = {}

const middleware = [thunk]

const reducers = combineReducers({
  selfReport: visitsReducer,
  statistics: statisticReducer,
  chatbot: chatbotReducer,
})

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware), typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
  ? a => a
  : window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__())
)

export default store
