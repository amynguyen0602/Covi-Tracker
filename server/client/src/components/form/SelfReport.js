import React from 'react'
import { DatePicker, Row, Col, Button } from 'antd'

import VisitForm from './VisitForm'

function SelfReport(props) {
  const handleAdd = () => {
    console.log('add clicked!!!@!@!@!@!@')
  }

  const createVisitForm = () => {
    // get state from redux store and map -> return
  }

  return (
    <div>
      <Row>
        <Col span={2}></Col>
        <Col span={8}>
          Confirmed Date: <DatePicker />
        </Col>
        <Col span={2}></Col>
      </Row>
    </div>
  )
}

export default SelfReport
