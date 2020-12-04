import { FETCH_TESTING_CENTRE } from '../actions/types'

export default function mapReducer(state = [], action) {
  switch (action.type) {
    case FETCH_TESTING_CENTRE:
      return {
        ...state,
        testingCentres: action.payload,
      }

    default:
      return state
  }
}
