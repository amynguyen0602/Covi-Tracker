import React from 'react'
import { DatePicker, Row, Col, Button } from 'antd'
import { connect } from 'react-redux'
import { addVisit } from '../../redux/actions/selfReportActions'
import VisitForm from './VisitForm'

function SelfReport(props) {

  const handleAdd = () => {
    console.log(props);
    props.addVisit(
      {
        date: 'temp date',
        time: 'temp time',
        place: 'temp place'
      }
    )
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

      <Row>
        <Col span={2}></Col>
        <Col span={6}>
          <VisitForm/>
        </Col>
        <Col span={2}>
          <Button type="link" onClick={handleAdd}>Add</Button>
        </Col>
        <Col span={2}></Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { visits: state.visits }
}

export default connect(mapStateToProps, { addVisit })(SelfReport)
