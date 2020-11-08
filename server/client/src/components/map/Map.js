import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'

function Map() {
  const [currentGeoLocation, setCurrentGeoLocation] = useState({ lat: 49.246292, lng: -123.116226 })

  useEffect(() => {})

  return (
    <div style={{ height: '70vh', width: 'calc(100vw - 100px)' }}>
      <GoogleMapReact defaultCenter={currentGeoLocation} defaultZoom={11}></GoogleMapReact>
    </div>
  )
}

export default Map
