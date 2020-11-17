import React, { useEffect, useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { Input } from 'antd'
import { connect, useSelector } from 'react-redux'
import { fetchReportCases } from '../../redux/actions/visitsActions'

const { Search } = Input

function Map({ fetchReportCases }) {
  const reportCases = useSelector((state) => state.selfReport.reportCases)
  const [currentGeoLocation, setCurrentGeoLocation] = useState({ lat: 49.246292, lng: -123.116226 })
  let visits = []

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

  if (reportCases) {
    reportCases.map((report) => {
      report.visits.map((visit) => {
        visits.push(visit)
      })
    })
  }

  const handleSearch = () => {
    console.log('search button clicked')
  }

  // try custom marker ref = https://levelup.gitconnected.com/reactjs-google-maps-with-custom-marker-ece0c7d184c4
  // map page design idea => drawer
  const renderMarkers = (map, maps) => {
    const tempLocations = [
      { lat: 49.2615, lng: -122.8899 },
      { lat: 49.2485, lng: -122.897 },
    ]

    const contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
      '<div id="bodyContent">' +
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the ' +
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
      'south west of the nearest large town, Alice Springs; 450&#160;km ' +
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
      'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
      'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
      'Aboriginal people of the area. It has many springs, waterholes, ' +
      'rock caves and ancient paintings. Uluru is listed as a World ' +
      'Heritage Site.</p>' +
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
      '(last visited June 22, 2009).</p>' +
      '</div>' +
      '</div>'

    new maps.Marker({
      position: currentGeoLocation,
      map,
      title: 'This is current location',
    })

    new maps.Marker({
      position: tempLocations[0],
      map,
      title: 'Second title',
    })

    const marker3 = new maps.Marker({
      position: tempLocations[1],
      map,
      title: 'Third title',
    })

    const infowindow = new maps.InfoWindow({
      content: contentString,
    })

    marker3.addListener('mouseover', () => {
      infowindow.open(map, marker3)
    })

    marker3.addListener('mouseout', () => {
      infowindow.close()
    })
  }

  return (
    <div style={{ width: '80vw', margin: '0px auto' }}>
      <Search placeholder="input search text" onSearch={handleSearch} enterButton size="large" />
      <div style={{ height: '70vh', width: 'calc(100vw - 100px)' }}>
        <GoogleMapReact
          defaultCenter={currentGeoLocation}
          defaultZoom={14}
          onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
        ></GoogleMapReact>
      </div>
    </div>
  )
}

export default connect(null, { fetchReportCases })(Map)
