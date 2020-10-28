import axios from 'axios'
import { FETCH_STATISTICS, FETCH_CHATBOT_RESPONSE } from './types'


export const fetchCanStatistic = () => 
    async dispatch => {
        const res = await axios.get('https://api.covid19tracker.ca/summary')
        dispatch({
            type: FETCH_STATISTICS,
            payload: res.data
        })
}

export const fetchProvinceStatistic = (provinceCode) => 
    async dispatch => {
        const res = await axios.get(`https://api.covid19tracker.ca/reports/province/${provinceCode}`)
        dispatch({
            type: FETCH_STATISTICS,
            payload: res.data
        })
}


export const send_bot_text = ({ text, userID }) => 
    async dispatch => {
        const res = await axios.post('/api/bot_text', { text })
        dispatch({
            type: FETCH_CHATBOT_RESPONSE,
            payload: res.data
        })
}

export const send_bot_event = ({ event, userID }) => 
    async dispatch => {
        const res = await axios.post('/api/bot_event', { event })
        dispatch({
            type: FETCH_CHATBOT_RESPONSE,
            payload: res.data
        })
}

