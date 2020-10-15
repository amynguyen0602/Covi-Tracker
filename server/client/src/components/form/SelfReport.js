import React from 'react'
import { connect } from 'react-redux'
import { DatePicker, Row, Col } from 'antd'
import { getVisits } from '../../redux/actions/selfReportActions'
import VisitForm from './VisitForm'

function SelfReport(props) {
  const handleAdd = () => {}
  console.log(props.visits)

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
        <Col span={8}>
          <VisitForm />
        </Col>
        <Col span={2}></Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { visits: state.visits }
}

export default connect(mapStateToProps, { getVisits })(SelfReport)
