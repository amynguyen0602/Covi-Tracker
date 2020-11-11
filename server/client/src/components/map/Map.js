import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { Input } from 'antd'
import { AudioOutlined } from '@ant-design/icons'

const { Search } = Input

function Map() {
  const [currentGeoLocation, setCurrentGeoLocation] = useState({ lat: 49.246292, lng: -123.116226 })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentGeoLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    }
  }, [])

  const handleSearch = () => {
    console.log('search button clicked')
  }

  return (
    <div style={{ width: '80vw', margin: '0px auto' }}>
      <Search placeholder="input search text" onSearch={handleSearch} enterButton size="large" />
      <div style={{ height: '70vh', width: 'calc(100vw - 100px)' }}>
        <GoogleMapReact defaultCenter={currentGeoLocation} defaultZoom={14}></GoogleMapReact>
      </div>
    </div>
  )
}

export default Map
