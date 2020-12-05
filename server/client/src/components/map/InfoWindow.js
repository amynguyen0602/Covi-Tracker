import React from 'react'
import moment from 'moment'
import { Card } from 'antd'
import { ExclamationCircleTwoTone, MedicineBoxTwoTone } from '@ant-design/icons'

// InfoWindow component
const InfoWindow = (props) => {
  const { visit } = props
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
    <Card style={{ width: 300, zIndex: 5 }}>
      <div style={{ fontSize: 16 }}>
        {visit.testingCentre && <MedicineBoxTwoTone twoToneColor="#14c929" />}&nbsp;
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
            <ExclamationCircleTwoTone twoToneColor="#de1818" />
            &nbsp;
            {moment(visit.date).format('MMM DD, YYYY')} {moment(visit.time).format('h:MM A')}
          </>
        )}
      </div>
    </Card>
  )
}

export default InfoWindow
