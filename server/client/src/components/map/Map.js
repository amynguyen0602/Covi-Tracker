import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { Input } from 'antd'
import { connect, useSelector } from 'react-redux'
import { fetchReportCases } from '../../redux/actions/visitsActions'
import CovidMarker from './CovidMarker'

const { Search } = Input

function Map({ fetchReportCases, reportCases, state, match: {params} }) {
  const [visits, setVisits] = useState({})
  const [currentGeoLocation, setCurrentGeoLocation] = useState({ lat: 49.246292, lng: -123.116226 })
  useEffect(() => {
    fetchReportCases()
  }, [])

  useEffect(() => {
    let visitsMap = {}
    if (reportCases) {
      reportCases.map((report) => {
        report.visits.map((visit) => {
          visitsMap = { ...visitsMap, [visit._id]: { ...visit, show: false } }
        })
      })
      setVisits(visitsMap)
    }
  }, [reportCases])

  useEffect(() => {
    const setCurrentLocation = () => {
      if(Object.keys(params).length !== 0) {
        setCurrentGeoLocation({
          lat: Number(params.latitude),
          lng: Number(params.longitude),
        })
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            setCurrentGeoLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          })
        }
      }
    }
    setCurrentLocation()
  }, [params])

  const handleSearch = () => {
    console.log('search button clicked')
  }

  // onChildClick callback can take two arguments: key and childProps
  const handleChildMouseHover = (key) => {
    if (visits) {
      setVisits({ ...visits, [key]: { ...visits[key], show: !visits[key].show } })
    }
  }

  // found better documentation
  // https://github.com/google-map-react/google-map-react/blob/master/API.md
  return (
    <div style={{ width: '80vw', margin: '0px auto' }}>
      <Search
        placeholder="input search text"
        onSearch={handleSearch}
        enterButton
        size="large"
        style={{ marginBottom: '20px' }}
      />
      <div style={{ height: '80vh', width: '80vw' }}>
        {/* 'calc(100vw - 100px)' */}
        <GoogleMapReact
          defaultCenter={currentGeoLocation}
          defaultZoom={14}
          onChildMouseEnter={handleChildMouseHover}
          onChildMouseLeave={handleChildMouseHover}
        >
          {Object.values(visits)?.map((visit) => {
            return <CovidMarker key={visit._id} lat={visit.lat} lng={visit.lng} show={visit.show} place={visit} />
          })}
        </GoogleMapReact>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { state: state, reportCases: state.selfReport.reportCases }
}

export default connect(mapStateToProps, { fetchReportCases })(Map)
