import React from 'react'
import { Form } from 'react-bootstrap'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export default class PhoneNo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { phone: '' }
  }
  render() {
    return (
      <div>
        <Form.Group>
          <PhoneInput
            placeholder="Enter your company contact Number"
            country="MY"
            value={this.state.phone}
            onChange={(phone) => this.setState({ phone })}
          />
        </Form.Group>
      </div>
    )
  }
}
