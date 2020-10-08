import React, { useState } from 'react'
import { Card, DatePicker, TimePicker, Input } from 'antd'

const VisitForm = (props) => {
  const [date, setDate] = useState()
  const [time, setTime] = useState()
  const [place, setPlace] = useState()

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
    </Card>
  )
}

export default VisitForm
