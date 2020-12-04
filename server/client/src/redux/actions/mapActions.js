import axios from 'axios'
import { FETCH_TESTING_CENTRE } from './types'

export const fetchTestingCentre = () => async (dispatch) => {
  const res = await axios.get('/api/testingcentre')
  dispatch({
    type: FETCH_TESTING_CENTRE,
    payload: res.data,
  })
}
