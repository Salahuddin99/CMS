import React from 'react'
import { Form } from 'react-bootstrap'

class Datepicker extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <Form.Group controlId="dob">
              <Form.Label>Company year founded</Form.Label>
              <Form.Control type="date" name="dob" placeholder="pick date" />
            </Form.Group>
          </div>
        </div>
      </div>
    )
  }
}

export default Datepicker
