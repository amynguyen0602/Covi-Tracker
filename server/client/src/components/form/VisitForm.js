import React from 'react'
import { Card, DatePicker, TimePicker, Input } from 'antd'

function VisitForm(props) {
  return (
    <Card>
      <DatePicker />
      <TimePicker />
      <Input placeholder="Place or Address" />
    </Card>
  )
}

export default VisitForm
