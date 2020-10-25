import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, DatePicker, TimePicker, Input, Button, Row, Col, Space } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import PlacesAutocomplete from './PlacesAutocomplete'
import { addVisit, getVisits, removeVisit } from '../../redux/actions/visitsActions'

const validationWarning = {
  fontSize: 12,
  color: 'red',
  paddingLeft: 2,
}

const VisitForm = ({ addVisit, getVisits, removeVisit, defaultData }) => {
  const [date, setDate] = useState(defaultData && defaultData.date ? defaultData.date : null)
  const [time, setTime] = useState(defaultData && defaultData.time ? defaultData.time : null)
  const [place, setPlace] = useState(defaultData && defaultData.place ? defaultData.place : null)

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

    if (!place) {
      setPlaceValidateMessage('Please input a place')
    }

    if (date && time && place) {
      addVisit({
        key: getVisitKey(),
        date: date,
        time: time,
        place: place,
      })

      console.log(getVisits())

      setDate(null)
      setTime(null)
      setPlace(null)
      setDateValidateMessage('')
      setTimeValidateMessage('')
      setPlaceValidateMessage('')
    }
  }

  const handleDelete = () => {
    removeVisit(getVisitKey())
    console.log(getVisitKey())
  }

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
                <PlacesAutocomplete
                  defaultData={defaultData ? defaultData : ''}
                  value={place}
                  onChange={(place) => {
                    if (place) {
                      setPlaceValidateMessage('')
                    }
                    setPlace(place)
                  }}
                />
              </Row>
              <Row>{!place && <div style={validationWarning}>{placeValidateMessage}</div>}</Row>
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
