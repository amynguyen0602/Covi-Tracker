import React, { Component } from 'react'
import { DatePicker } from 'antd'

import VisitForm from './VisitForm'

export class SelfReport extends Component {
  onChange = () => {
    console.log('onChange triggered!')
  }

  render() {
    return (
      <div>
        <DatePicker onChange={this.onChange} />
        <VisitForm />
      </div>
    )
  }
}

export default SelfReport
