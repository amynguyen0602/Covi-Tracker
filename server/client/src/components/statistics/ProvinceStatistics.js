import React, { useState, useEffect } from 'react'
import { Select, Card } from 'antd'
import { connect, useSelector } from 'react-redux'
import { fetchProvinceStatistic } from '../../redux/actions/statisticActions'
import axios from 'axios'
import StatisticCard from './StatisticCard'

export function ProvinceStatistics({ fetchProvinceStatistic }) {
  const [provinces, setProvinces] = useState([])
  const [statisticArray, setStatisticArray] = useState([])
	const [currentProvince, setCurrentProvince] = useState('')

  const provincial = useSelector((state) => state.statistics.provincial)

  useEffect(() => {
    if(currentProvince)
      fetchProvinceStatistic(currentProvince)
  }, [currentProvince])

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('https://api.covid19tracker.ca/provinces')
      setProvinces(res.data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (provincial) {
      const statistic = provincial.data.reverse()[0]
      setStatisticArray([
        {
          title: 'Confirmed',
          total: statistic.total_cases,
          change: statistic.change_cases,
        },
        {
          title: 'Active',
          total: statistic.total_cases - statistic.total_recoveries - statistic.total_fatalities,
          change: statistic.change_cases - statistic.change_recoveries - statistic.change_fatalities,
        },
        {
          title: 'Recovered',
          total: statistic.total_recoveries,
          change: statistic.change_recoveries,
        },
        {
          title: 'Deaths',
          total: statistic.total_fatalities,
          change: statistic.change_fatalities,
        },
      ])
    }
  }, [provincial])

  

	useEffect(() => {
		const getCurrentLocation = async () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async ({coords: {longitude, latitude}}) => {
          console.log();
        const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`)
        const { results } = res.data
        const provinces = results.filter((addressRes) => addressRes.types[0] == "administrative_area_level_1")
        setCurrentProvince(provinces[0].address_components[0].short_name)
       }) 
      }
    } 
    getCurrentLocation()
  }, [])

  const renderStatistic = () => {
    return statisticArray.map((stat) => {
      return <StatisticCard key={stat.title} data={stat} />
    })
  }

  const getProvinceSelection = () => {
    return provinces.map((data) => {
      return (
        <Select.Option key={data.code} value={data.code}>
          {data.name}
        </Select.Option>
      )
    })
  }

  const onChange = async (val) => {
    setCurrentProvince(val)
    await fetchProvinceStatistic(val)
  }

  return (
    <Card
      style={{ margin: '20px 10px 20px 10px', boxShadow: '1px 1px 10px 2px #F0F0F0' }}
      title={
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select province"
          optionFilterProp="children"
          value={currentProvince}
          onChange={onChange}
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        > 
          {getProvinceSelection()}
        </Select>
      }
    >
      {renderStatistic()}
    </Card>
  )
}

export default connect(null, { fetchProvinceStatistic })(ProvinceStatistics)
