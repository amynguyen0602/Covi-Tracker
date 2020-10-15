import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Card, DatePicker, TimePicker, Input, Button } from 'antd'
import moment from 'moment'
import { addVisit } from '../../redux/actions/selfReportActions'

const VisitForm = ({ addVisit }) => {
  const [date, setDate] = useState()
  const [time, setTime] = useState()
  const [place, setPlace] = useState()

  const handleAdd = () => {
    addVisit({
      date: date,
      time: time,
      place: place,
    })
  }

  return (
    <Card>
      <DatePicker
        onChange={(selectedDate, dateString) => {
          // returns a moment
          setDate(selectedDate)
        }}
      />
      <TimePicker
        onChange={(selectedTime, timeString) => {
          // returns a moment
          setTime(selectedTime)
        }}
      />
      <Input
        placeholder="Place or Address"
        onChange={(e) => {
          setPlace(e.target.value)
        }}
      />
      <Button type="link" onClick={handleAdd}>
        Add
      </Button>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return { visits: state.visits }
}

export default connect(mapStateToProps, { addVisit })(VisitForm)
