import React from 'react'

const Marker = (props) => {
  const markerSytle = {
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
  }

  const { color, name, id } = props

  return <div className="marker" style={{ backgroundColor: color, cursor: 'pointer' }} title={name} />
}
