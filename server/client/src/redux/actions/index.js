import axios from 'axios'
import { FETCH_STATISTICS } from './types'


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

