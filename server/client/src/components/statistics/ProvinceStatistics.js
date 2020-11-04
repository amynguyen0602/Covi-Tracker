import React, { useState, useEffect } from 'react'
import { Select, Card } from 'antd'
import { connect, useSelector } from 'react-redux'
import { fetchProvinceStatistic } from '../../redux/actions/statisticActions'
import axios from 'axios'
import StatisticCard from './StatisticCard'

export function ProvinceStatistics({ fetchProvinceStatistic }) {
  const [provinces, setProvinces] = useState([])
  const [statisticArray, setStatisticArray] = useState([])

  const provincial = useSelector((state) => state.statistics.provincial)

  useEffect(() => {
    fetchProvinceStatistic('BC')
  }, [])

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
          defaultValue="BC"
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
