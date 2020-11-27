import React from 'react'
import InfoWindow from './InfoWindow'

// Marker component
const CovidMarker = ({ show, place }) => {
  const markerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '15px',
    height: '15px',
    border: '2px solid #fff',
    borderRadius: '100%',
    userSelect: 'none',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'red',
    cursor: 'pointer',
  }

  return (
    <>
      <div style={markerStyle} />
      {show && <InfoWindow visit={place} />}
    </>
  )
}

export default CovidMarker
