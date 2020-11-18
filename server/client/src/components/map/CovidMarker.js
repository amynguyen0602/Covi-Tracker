import React from 'react'
import InfoWindow from './InfoWindow'

// Marker component
const CovidMarker = ({ show, place }) => {
  const markerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '18px',
    height: '18px',
    backgroundColor: '#000',
    border: '2px solid #fff',
    borderRadius: '100%',
    userSelect: 'none',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'purple',
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
