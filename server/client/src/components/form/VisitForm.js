import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Form, DatePicker, TimePicker, Input, Button, Row, Col, List } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { addVisit, getVisits, removeVisit } from '../../redux/actions/visitsActions'

const validationWarning = {
  fontSize: 12,
  color: 'red',
  paddingLeft: 2,
}
let latitude = 0
let longitude = 0

const VisitForm = ({ addVisit, getVisits, removeVisit, defaultData }) => {
  const [date, setDate] = useState(defaultData && defaultData.date ? defaultData.date : null)
  const [time, setTime] = useState(defaultData && defaultData.time ? defaultData.time : null)

  const [dateValidateMessage, setDateValidateMessage] = useState('')
  const [timeValidateMessage, setTimeValidateMessage] = useState('')
  const [placeValidateMessage, setPlaceValidateMessage] = useState('')

  function getVisitKey() {
    return date.format('YYYYMMDD') + time.format('HHMM')
  }

  const handleAdd = () => {
    if (!date) {
      setDateValidateMessage('Please pick a date')
    }

    if (!time) {
      setTimeValidateMessage('Please pick a time')
    }

    if (!value) {
      setPlaceValidateMessage('Please input a place')
    }
    if (date && time && value) {
      addVisit({
        key: getVisitKey(),
        date: date,
        time: time,
        place: value,
        lat: latitude,
        lng: longitude,
      })

      console.log(getVisits())

      setDate(null)
      setTime(null)
      setValue(null)
      setDateValidateMessage('')
      setTimeValidateMessage('')
      setPlaceValidateMessage('')
    }
  }

  const handleDelete = () => {
    removeVisit(getVisitKey())
  }

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

  useEffect(() => {
    setValue(defaultData && defaultData.place ? defaultData.place : null)
  }, [defaultData])

  const handleInput = (e) => {
    // Update the keyword of the input element
    if (e.target.value) {
      setPlaceValidateMessage('')
    }
    setValue(e.target.value)
  }

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setValue(description, false)
    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('📍 Coordinates: ', { lat, lng })
        latitude = lat
        longitude = lng
      })
      .catch((error) => {
        console.log('😱 Error: ', error)
      })
    clearSuggestions()
  }

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

  return (
    <div style={{ border: '1px solid #f0f0f0', padding: '5px 20px 10px 30px', borderRadius: '2px', margin: '10px' }}>
      <Row>
        <Col span={22}></Col>
        <Col span={2}>
          {defaultData ? (
            <Button type="link" onClick={handleDelete}>
              <CloseOutlined style={{ fontSize: '11px', color: '#8f8e8d' }} />
            </Button>
          ) : (
            <span>&nbsp;</span>
          )}
        </Col>
      </Row>

      <Row>
        <Col span={20}>
          <Row>
            <Col span={12} style={{ padding: '3px' }}>
              <Row>
                <DatePicker
                  style={{ width: '100%' }}
                  disabled={defaultData}
                  value={date}
                  onChange={(selectedDate, dateString) => {
                    // returns a moment
                    setDate(selectedDate)
                  }}
                />
              </Row>
              <Row>{!date && <div style={validationWarning}>{dateValidateMessage}</div>}</Row>
            </Col>
            <Col span={12} style={{ padding: '3px' }}>
              <Row>
                <TimePicker
                  style={{ width: '100%' }}
                  disabled={defaultData}
                  value={time}
                  onChange={(selectedTime, timeString) => {
                    // returns a moment
                    setTime(selectedTime)
                  }}
                />
              </Row>
              <Row>{!time && <div style={validationWarning}>{timeValidateMessage}</div>}</Row>
            </Col>
          </Row>

          <Row style={{ padding: '3px' }}>
            <Col span={24}>
              <Row>
                <Input
                  style={{ width: '100%' }}
                  disabled={!ready || defaultData}
                  value={value}
                  onChange={handleInput}
                  placeholder="Place or Address"
                />
                {status === 'OK' && !defaultData && <ul>{renderSuggestions()}</ul>}
              </Row>
              <Row>{!value && <div style={validationWarning}>{placeValidateMessage}</div>}</Row>
            </Col>
          </Row>
        </Col>
        <Col span={4}>
          <Row>&nbsp;</Row>
          <Row>
            {!defaultData && (
              <Button type="link" onClick={handleAdd} style={{ textAlign: 'center', margin: '0 auto' }}>
                Add
              </Button>
            )}
          </Row>
          <Row>&nbsp;</Row>
        </Col>
      </Row>
      <Row> &nbsp;</Row>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { visits: state.visits }
}

export default connect(mapStateToProps, { addVisit, getVisits, removeVisit })(VisitForm)
