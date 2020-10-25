import React from 'react'
import { connect, useSelector } from 'react-redux'
import { DatePicker, Row, Col } from 'antd'
import { getVisits } from '../../redux/actions/visitsActions'
import VisitForm from './VisitForm'

function SelfReport(props) {
  const visits = useSelector((state) => state.selfReport.visits)

  return (
    <div>
      <Row style={{ margin: '20px 0px' }}>
        <Col span={9}></Col>
        <Col span={6}>
          Confirmed Date: <DatePicker />
        </Col>
        <Col span={9}></Col>
      </Row>

      <Row>
        <Col span={7}></Col>
        <Col span={10}>
          <VisitForm />
          {visits.map((visitData) => {
            return <VisitForm key={visitData.key} defaultData={visitData} />
          })}
        </Col>
        <Col span={7}></Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { visits: state.selfReport.visits }
}

export default connect(mapStateToProps, { getVisits })(SelfReport)
