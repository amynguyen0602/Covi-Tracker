import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { fetchCanStatistic } from '../../redux/actions/statisticActions'
import { Card } from 'antd'
import StatisticCard from './StatisticCard'

export function CanadaStatistics({ fetchCanStatistic }) {
  const [statisticArray, setStatisticArray] = useState([])
  const canada = useSelector((state) => state.statistics.canada)

  useEffect(() => {
    fetchCanStatistic()
  }, [])

  useEffect(() => {
    if (canada) {
      const statistic = canada.data[0]

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
  }, [canada])

  const renderStatistic = () => {
    return statisticArray.map((stat) => {
      return <StatisticCard key={stat.title} data={stat} />
    })
  }

  return (
    <Card
      style={{ margin: '20px 10px 20px 10px', boxShadow: '1px 1px 10px 2px #F0F0F0' }}
      title={
        <div>
          <img alt="" src="/canada-flag.png" style={{ width: '20px' }} />
          <span
            style={{
              padding: '10px',
              position: 'relative',
              top: '2px',
              fontWeight: 'bold',
            }}
          >
            {' '}
            Canada{' '}
          </span>
        </div>
      }
    >
      {renderStatistic()}
    </Card>
  )
}

export default connect(null, { fetchCanStatistic })(CanadaStatistics)
