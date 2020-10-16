import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Card, DatePicker, TimePicker, Input, Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import moment from 'moment'
import { addVisit, getVisits } from '../../redux/actions/visitsActions'

const VisitForm = ({ addVisit, getVisits, defaultData }) => {
  console.log(defaultData)
  const [date, setDate] = useState(defaultData && defaultData.date ? defaultData.date : null)
  const [time, setTime] = useState(defaultData && defaultData.time ? defaultData.time : null)
  const [place, setPlace] = useState(defaultData && defaultData.place ? defaultData.place : null)

  const handleAdd = () => {
    addVisit({
      date: date,
      time: time,
      place: place,
    })

    setDate(null)
    setTime(null)
    setPlace(null)
  }

  const handleDelete = () => {}

  return (
    <Card>
      <Button onClick={handleDelete}>
        <CloseOutlined />
      </Button>
      <DatePicker
        disabled={defaultData}
        value={date}
        onChange={(selectedDate, dateString) => {
          // returns a moment
          setDate(selectedDate)
        }}
      />
      <TimePicker
        disabled={defaultData}
        value={time}
        onChange={(selectedTime, timeString) => {
          // returns a moment
          setTime(selectedTime)
        }}
      />
      <Input
        disabled={defaultData}
        value={place}
        placeholder="Place or Address"
        onChange={(e) => {
          setPlace(e.target.value)
        }}
      />
      {!defaultData && (
        <Button type="link" onClick={handleAdd}>
          Add
        </Button>
      )}
    </Card>
  )
}

const mapStateToProps = (state) => {
  return { visits: state.visits }
}

export default connect(mapStateToProps, { addVisit, getVisits })(VisitForm)
