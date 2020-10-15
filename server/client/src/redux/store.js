import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import visitsReducer from './reducers/visitsReducer'

const initialState = {}

const middleware = [thunk]

const reducers = combineReducers({
  selfReport: visitsReducer,
})

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

export default store
