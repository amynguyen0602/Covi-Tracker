import axios from 'axios'
import { FETCH_CHATBOT_RESPONSE } from './types'

export const send_bot_text = ({ text, userID }) => async (dispatch) => {
    const res = await axios.post('/api/bot_text', { text })
    dispatch({
      type: FETCH_CHATBOT_RESPONSE,
      payload: res.data,
    })
  }
  
export const send_bot_event = ({ event, userID }) => async (dispatch) => {
  const res = await axios.post('/api/bot_event', { event })
  dispatch({
  type: FETCH_CHATBOT_RESPONSE,
      payload: res.data,
  })
}  