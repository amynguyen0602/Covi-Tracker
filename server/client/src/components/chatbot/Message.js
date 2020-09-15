import React from 'react'
import { Typography, Row, Col } from 'antd'
import styles from '../../styles/styles'

function Message(props) {
    return (
        <>
           <Row>
               {props.speaks === 'bot' ?
                <Col span={24}><Typography type="primary" style={styles.botSpeak}> {props.text} </Typography></Col>
                : <Col span={24}><Typography type="primary" style={styles.userSpeak}> {props.text} </Typography></Col>
                }
                </Row>
        </>
    )
}

export default Message
