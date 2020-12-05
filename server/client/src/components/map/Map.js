import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { Input, List, Switch, Col, Row, Space, Tooltip } from 'antd'
import { connect, useSelector } from 'react-redux'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
import { fetchReportCases } from '../../redux/actions/visitsActions'
import { fetchTestingCentre } from '../../redux/actions/mapActions'
import CovidMarker from './CovidMarker'
import { MedicineBoxFilled } from '@ant-design/icons'

const { Search } = Input

function Map({ fetchReportCases, fetchTestingCentre, reportCases, testingCentres, state, match: { params } }) {
  const [visits, setVisits] = useState({})
  const [currentGeoLocation, setCurrentGeoLocation] = useState({ lat: 49.246292, lng: -123.116226 })
  const [testingCentresState, setTestingCentresState] = useState({})
  const [switchState, setSwitchSate] = useState(false)

  useEffect(() => {
    fetchReportCases()
    fetchTestingCentre()
  }, [])

  // store visits
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

  // store testing centres
  useEffect(() => {
    let testingCentreMap = {}
    if (testingCentres) {
      testingCentres.map((centre) => {
        testingCentreMap = {
          ...testingCentreMap,
          [centre.attributes.GlobalID]: {
            city: centre.attributes.USER_City,
            country: 'Canada',
            date: '',
            lat: centre.geometry.y,
            lng: centre.geometry.x,
            place: centre.attributes.USER_Name,
            province: centre.attributes.USER_Prov,
            show: false,
            time: '',
            _id: centre.attributes.GlobalID,
            testingCentre: true,
          },
        }
      })
      setTestingCentresState(testingCentreMap)
    }
  }, [testingCentres])

  // get current location
  useEffect(() => {
    const setCurrentLocation = () => {
      if (Object.keys(params).length !== 0) {
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

  // onChildClick callback can take two arguments: key and childProps
  const handleChildMouseHover = (key) => {
    if (visits && !Number.isInteger(key) && !key.includes('-')) {
      setVisits({ ...visits, [key]: { ...visits[key], show: !visits[key].show } })
    }

    if (switchState && testingCentresState && !Number.isInteger(key) && key.includes('-')) {
      setTestingCentresState({
        ...testingCentresState,
        [key]: { ...testingCentresState[key], show: !testingCentresState[key].show },
      })
    }
  }

  // clinic button on
  // clinic api: https://resources-covid19canada.hub.arcgis.com/datasets/exchange::covid19-testing-centres-in-canada-1/geoservice?geometry=168.780%2C42.488%2C-12.714%2C61.143

  /* ==================== Search Functions  ==================== */
  const [mapApi, setMapApi] = useState({
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
  })
  const [selectedPlace, setSelectedPlace] = useState({
    place: '',
    latitude: null,
    longitude: null,
  })

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

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value)
    console.log(`handleInput value: ${value}`)
    setCurrentGeoLocation({ lat: selectedPlace.latitude, lng: selectedPlace.longitude })
  }

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false)
    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setSelectedPlace({
          place: description,
          latitude: lat,
          longitude: lng,
        })
        setCurrentGeoLocation({ lat: lat, lng: lng })
      })
      .catch((error) => {
        console.log('😱 Error: ', error)
      })
    clearSuggestions()
  }

  const ref = useOnclickOutside(() => {
    console.log('useOnlickOutside')
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions()
    setSelectedPlace(selectedPlace ? selectedPlace : '')
    setValue(selectedPlace ? selectedPlace.place : '')
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

  // Handle toggle switch on and off
  const handleSwitch = (checked) => {
    setSwitchSate(checked)
  }

  // found better documentation
  // https://github.com/google-map-react/google-map-react/blob/master/API.md
  return (
    <div>
      <Row ref={ref}>
        <Col span={2}></Col>
        <Col span={20}>
          <Input
            placeholder="input search text"
            onChange={handleInput}
            disabled={!ready}
            value={value}
            enterButton
            size="large"
            style={{ marginBottom: '20px' }}
          />
          {status === 'OK' && <ul>{renderSuggestions()}</ul>}
        </Col>
        <Col span={2}>
        </Col>
      </Row>
      <Row className="ignore-onclickoutside">
        <Col span={2}></Col>
        <Col span={20} style={{ height: '80vh' }}>
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
              return (
                <CovidMarker
                  key={visit._id}
                  lat={visit.lat}
                  lng={visit.lng}
                  show={visit.show}
                  place={visit}
                  color="#d1140a"
                  size="15px"
                />
              )
            })}

            {selectedPlace && (
              <CovidMarker
                lat={selectedPlace.latitude}
                lng={selectedPlace.longitude}
                show={selectedPlace.show}
                place={selectedPlace}
                color="#fcad03"
                size="25px"
              />
            )}

            {/* switchState && */}
            {switchState &&
              Object.values(testingCentresState)?.map((centre) => {
                return (
                  <CovidMarker
                    key={centre._id}
                    lat={centre.lat}
                    lng={centre.lng}
                    show={centre.show}
                    place={centre}
                    color="#40918b"
                    size="15px"
                  />
                )
              })}
          </GoogleMapReact>
        </Col>
        <Col span={2}>
        <div style={{ fontSize: 'small', marginLeft: '5px', marginTop: '2px' }}>
            <Tooltip placement="topLeft" title="Testing Center">
              <Switch checkedChildren={<MedicineBoxFilled />} unCheckedChildren={<MedicineBoxFilled />} onChange={handleSwitch} />
            </Tooltip>
          </div>
        </Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { state: state, reportCases: state.selfReport.reportCases, testingCentres: state.maps.testingCentres }
}

export default connect(mapStateToProps, { fetchReportCases, fetchTestingCentre })(Map)
