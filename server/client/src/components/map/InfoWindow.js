import React from 'react'
import moment from 'moment'

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
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>{visit.place}</div>
      <div style={{ fontSize: 14 }}>
        {/* <span style={{ color: 'grey' }}>{place.rating} </span>
        <span style={{ color: 'orange' }}>{String.fromCharCode(9733).repeat(Math.floor(place.rating))}</span> */}
        {/* <span style={{ color: 'lightgrey' }}>{String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}</span> */}
      </div>
      {/* <div style={{ fontSize: 14, color: 'grey' }}>{place.types[0]}</div> */}
      <div style={{ fontSize: 14, color: 'grey' }}>{`${moment(visit.date).format('DD-MMM-YYYY')} ${moment(
        visit.time
      ).format('hh:MM A')}`}</div>
      {/* <div style={{ fontSize: 14, color: 'green' }}>{place.opening_hours.open_now ? 'Open' : 'Closed'}</div> */}
    </div>
  )
}

export default InfoWindow
