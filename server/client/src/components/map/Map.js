import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { Input } from 'antd'
import { connect, useSelector } from 'react-redux'
import { fetchReportCases } from '../../redux/actions/visitsActions'
import CovidMarker from './CovidMarker'

const { Search } = Input

function Map({ fetchReportCases }) {
  const reportCases = useSelector((state) => state.selfReport.reportCases)
  const [currentGeoLocation, setCurrentGeoLocation] = useState({ lat: 49.246292, lng: -123.116226 })
  useEffect(() => {
    fetchReportCases()
  }, [])

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

  let visits = []

  if (reportCases) {
    reportCases.map((report) => {
      report.visits.map((visit) => {
        visit = { ...visit, show: false }
        visits.push(visit)
      })
    })
    console.log(visits)
  }

  const handleSearch = () => {
    console.log('search button clicked')
  }

  // try custom marker ref = https://levelup.gitconnected.com/reactjs-google-maps-with-custom-marker-ece0c7d184c4
  // map page design idea => drawer
  // const renderMarkers = (map, maps) => {
  //   console.log('on google api loaded')

  //   const tempLocations = [
  //     { lat: 49.2615, lng: -122.8899 },
  //     { lat: 49.2485, lng: -122.897 },
  //   ]

  //   const contentString =
  //     '<div id="content">' +
  //     '<div id="siteNotice">' +
  //     '</div>' +
  //     '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
  //     '<div id="bodyContent">' +
  //     '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
  //     'sandstone rock formation in the southern part of the ' +
  //     'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
  //     'south west of the nearest large town, Alice Springs; 450&#160;km ' +
  //     '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
  //     'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
  //     'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
  //     'Aboriginal people of the area. It has many springs, waterholes, ' +
  //     'rock caves and ancient paintings. Uluru is listed as a World ' +
  //     'Heritage Site.</p>' +
  //     '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
  //     'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
  //     '(last visited June 22, 2009).</p>' +
  //     '</div>' +
  //     '</div>'

  //   new maps.Marker({
  //     position: currentGeoLocation,
  //     map,
  //     title: 'This is current location',
  //   })

  //   new maps.Marker({
  //     position: tempLocations[0],
  //     map,
  //     title: 'Second title',
  //   })

  //   const marker3 = new maps.Marker({
  //     position: tempLocations[1],
  //     map,
  //     title: 'Third title',
  //   })

  //   const infowindow = new maps.InfoWindow({
  //     content: contentString,
  //   })

  //   marker3.addListener('mouseover', () => {
  //     infowindow.open(map, marker3)
  //   })
  //   // anson is here
  //   marker3.addListener('mouseout', () => {
  //     infowindow.close()
  //   })
  // }

  // const [place, setPlace] = useState({
  //   id: 1,
  //   name: 'Anson',
  //   formatted_address: 'Anson address',
  //   rating: 5,
  //   types: [],
  //   price_level: 15,
  //   opening_hours: {
  //     open_now: true,
  //   },
  //   show: false,
  // })

  // onChildClick callback can take two arguments: key and childProps
  const handleChildMouseHover = (key) => {
    visits.map((visit) => {
      if (visit._id === key) {
        visit.show = true
      }
    })
  }

  // found better documentation
  // https://github.com/google-map-react/google-map-react/blob/master/API.md
  return (
    <div style={{ width: '80vw', margin: '0px auto' }}>
      <Search placeholder="input search text" onSearch={handleSearch} enterButton size="large" />
      <div style={{ height: '70vh', width: 'calc(100vw - 100px)' }}>
        <GoogleMapReact
          defaultCenter={currentGeoLocation}
          defaultZoom={14}
          onChildMouseEnter={handleChildMouseHover}
          onChildMouseLeave={handleChildMouseHover}
        >
          {/* <CovidMarker key={place.id} lat={49.246292} lng={-123.116226} show={place.show} place={place} /> */}
          {visits.map((visit) => (
            <CovidMarker key={visit._id} lat={visit.lat} lng={visit.lng} show={visit.show} place={visit} />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  )
}

export default connect(null, { fetchReportCases })(Map)
