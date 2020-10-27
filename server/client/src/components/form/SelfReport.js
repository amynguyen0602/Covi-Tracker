import React, { useState, useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { DatePicker, Row, Col, Button } from 'antd'
import { getVisits, addConfirmedDate, resetOnSelfReportSubmit } from '../../redux/actions/visitsActions'
import store from '../../redux/store'
import VisitForm from './VisitForm'

const validationWarning = {
  fontSize: 12,
  color: 'red',
  paddingLeft: 2,
}

function SelfReport({ addConfirmedDate, resetOnSelfReportSubmit }) {
  const visits = useSelector((state) => state.selfReport.visits)
  const [confirmedDate, setConfirmedDate] = useState()
  const [confirmedDateValidateMessage, setConfirmedDateValidateMessage] = useState('')
  const [visitValidateMessage, setVisitValidateMessage] = useState('')

  const handleSubmit = () => {
    // validation for confirmed data
    if (!confirmedDate) {
      setConfirmedDateValidateMessage('Please pick a confirmed date')
    }
    // validation if there is any visits
    if (visits.length <= 0) {
      setVisitValidateMessage('Please add at least one visit details')
    }

    // submit it
    if (confirmedDate && visits.length > 0) {
      addConfirmedDate(confirmedDate)
      // send the object to the server
      console.log(store.getState())

      fetch('http://localhost:5000/api/self_report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(store.getState().selfReport),
      })
      // .then((res) => {
      //   console.log(res)
      //   return res.text()
      // })
      // .then((data) => {
      //   console.log(data)
      // })
      // .catch((e) => {
      //   console.log(e.message)
      // })

      resetOnSelfReportSubmit()

      // reset things
      setConfirmedDate(null)
      setConfirmedDateValidateMessage('')
      setVisitValidateMessage('')
    }
  }

  return (
    <div>
      <Row style={{ margin: '20px 0px' }}>
        <Col span={7}></Col>
        <Col span={6}>
          {/* <Row> */}
          Confirmed Date:
          <DatePicker
            value={confirmedDate}
            onChange={(selectedDate, dateString) => {
              // returns a moment
              setConfirmedDate(selectedDate)
            }}
          />
          {!confirmedDate && <div style={validationWarning}>{confirmedDateValidateMessage}</div>}
        </Col>
        <Col span={4}>
          <Button type="primary" onClick={handleSubmit}>
            Submit All Visits
          </Button>
        </Col>
        <Col span={7}></Col>
      </Row>

      <Row>
        <Col span={7}></Col>
        <Col span={10}>
          <VisitForm />
          {visits.map((visitData) => {
            return <VisitForm key={visitData.key} defaultData={visitData} />
          })}
          {visits.length <= 0 && <div style={validationWarning}>{visitValidateMessage}</div>}
        </Col>

        <Col span={7}></Col>
      </Row>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { visits: state.selfReport.visits }
}

export default connect(mapStateToProps, { getVisits, addConfirmedDate, resetOnSelfReportSubmit })(SelfReport)
