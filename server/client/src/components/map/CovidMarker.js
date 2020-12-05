import React, { useEffect } from 'react'
import InfoWindow from './InfoWindow'

// Marker component
const CovidMarker = ({ show, place, color, size }) => {
  // const markerStyle = {
  //   width: '15px',
  //   height: '15px',
  //   borderRadius: '50% 50% 50% 0',
  //   background: '#fc3d03',
  //   position: 'absolute',
  //   transform: 'rotate(-45deg)',
  //   left: '50%',
  //   top: '50%',
  //   margin: '-20px 0 0 -20px',
  // }
  let markerStyle = {
    borderRadius: '50% 50% 50% 0',
    position: 'absolute',
    transform: 'rotate(-45deg)',
    left: '50%',
    top: '50%',
    margin: '-20px 0 0 -20px',
  }

  if (color && size) {
    markerStyle = { ...markerStyle, background: [color], width: [size], height: [size] }
  }

  return (
    <>
      <div className = "marker" style={markerStyle} />
      {show && <InfoWindow visit={place} />}
    </>
  )
}

export default CovidMarker
