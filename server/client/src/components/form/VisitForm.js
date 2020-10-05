import React from 'react'
import { Card, DatePicker, TimePicker, Input } from 'antd'

function VisitForm(props) {
  return (
    <Card style={{ width: 750 }}>
      <DatePicker />
      <TimePicker />
      <Input placeholder="Place or Address" />
    </Card>
  )
}

export default VisitForm
