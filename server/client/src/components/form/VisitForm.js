import React, { useState } from 'react'
import { Card, DatePicker, TimePicker, Input } from 'antd'

const VisitForm = (props) => {
  const [date, setDate] = useState()

  return (
    <Card>
      <DatePicker
        onChange={(time, timeString) => {
          console.log(`time: ${time}`)
          console.log(timeString)
        }}
      />
      <TimePicker />
      <Input placeholder="Place or Address" />
    </Card>
  )
}

export default VisitForm
