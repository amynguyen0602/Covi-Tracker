import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { Input, List } from 'antd'
import { connect, useSelector } from 'react-redux'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
import { fetchReportCases } from '../../redux/actions/visitsActions'
import CovidMarker from './CovidMarker'

const { Search } = Input

function Map({ fetchReportCases, reportCases, state }) {
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentGeoLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    }
  }, [currentGeoLocation])

  // onChildClick callback can take two arguments: key and childProps
  const handleChildMouseHover = (key) => {
    if (visits) {
      setVisits({ ...visits, [key]: { ...visits[key], show: !visits[key].show } })
    }
  }

  /* ==================== Search Functions  ==================== */
  const [mapApi, setMapApi] = useState({
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
  })
  const [selectedPlace, setSelectedPlace] = useState({
    name: '',
    latitude: null,
    longitude: null,
  })

  // useEffect(() => {
  //   console.log(selectedPlace)
  // }, [selectedPlace])

  const handleSearch = (e) => {
    console.log('search button clicked')
  }

  const apiHasLoaded = (map, maps) => {
    setMapApi({
      mapApiLoaded: true,
      mapInstance: map,
      mapApi: maps,
    })
  }
  /* ==================== End of Search Functions  ==================== */

  /* ===================== PlacesAutoComplete ======================== */
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
      componentRestrictions: { country: ['ca'] },
    },
    debounce: 300,
  })

  // useEffect(() => {
  //   setValue(defaultData && defaultData.place ? defaultData.place : null)
  // }, [defaultData])

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value)
    console.log(`handleInput value: ${value}`)
  }

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false)
    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log(lat, lng, description)
        setSelectedPlace({
          name: description,
          latitude: lat,
          longitude: lng,
        })
      })
      .catch((error) => {
        console.log('😱 Error: ', error)
      })
    clearSuggestions()
  }

  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions()
    setSelectedPlace(selectedPlace ? selectedPlace : '')
    setValue(selectedPlace ? selectedPlace.name : '')
  })

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion
      return (
        <List.Item key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </List.Item>
      )
    })
  /* ==================== End of AutoComplete ========================== */

  // found better documentation
  // https://github.com/google-map-react/google-map-react/blob/master/API.md
  return (
    <div style={{ width: '80vw', margin: '0px auto' }}>
      <div ref={ref}>
        <Search
          placeholder="input search text"
          onSearch={handleSearch}
          onChange={handleInput}
          disabled={!ready}
          value={value}
          enterButton
          size="large"
          style={{ marginBottom: '20px' }}
        />
        {status === 'OK' && <ul>{renderSuggestions()}</ul>}
      </div>
      <div style={{ height: '80vh', width: '80vw' }}>
        {/* 'calc(100vw - 100px)' */}
        <GoogleMapReact
          defaultCenter={currentGeoLocation}
          center={currentGeoLocation}
          defaultZoom={14}
          onChildMouseEnter={handleChildMouseHover}
          onChildMouseLeave={handleChildMouseHover}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiHasLoaded(map, maps)}
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
