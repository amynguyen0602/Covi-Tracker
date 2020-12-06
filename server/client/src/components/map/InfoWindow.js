import React from 'react'
import moment from 'moment'
import { Card } from 'antd'
import { ExclamationCircleTwoTone, MedicineBoxTwoTone } from '@ant-design/icons'
import { useEffect, useState } from 'react'

// InfoWindow component
const InfoWindow = (props) => {
  const [visit, setVisit] = useState({})

  useEffect(() => {
    setVisit(props.visit)
  }, [props.visit])
  const infoWindowStyle = {
    position: 'relative',
    bottom: 150,
    left: '-45px',
    width: 220,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 14,
    zIndex: 100,
  }

  return (
    <>
      <div style={{ fontSize: 16}}>
        {visit.testingCentre && <MedicineBoxTwoTone style={{ marginRight: '5px' }} twoToneColor="#14c929" />}
        {visit.place?.split(',')[0] ?? 'Testing Centre'}
      </div>
      <div style={{ fontSize: 14, color: '#adadad' }}>
        {visit.place?.split(',')[1] === visit.city
          ? `${visit.city}, ${visit.province}, ${visit.country}`
          : visit.place?.split(',')[1] ?? `${visit.city}, ${visit.province}, ${visit.country}`}
      </div>
      <div style={{ fontSize: 14, color: 'grey' }}>
        {visit.date && visit.time && (
          <>
            <ExclamationCircleTwoTone style={{ marginRight: '5px' }} twoToneColor="#de1818" />
            {moment(visit.date).format('MMM DD, YYYY')} {moment(visit.time).format('h:MM A')}
          </>
        )}
      </div>
      </>
  )
}

export default InfoWindow
