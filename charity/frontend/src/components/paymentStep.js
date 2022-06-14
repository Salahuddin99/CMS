import React from 'react'
import { Nav } from 'react-bootstrap'

export default function CheckoutSteps(props) {
  return (
    <Nav className="justify-content-center">
      <Nav.Item>
        {props.step1 ? (
          <Nav.Link>Payment Description</Nav.Link>
        ) : (
          <Nav.Link disabled>PaymentDescription</Nav.Link>
        )}
      </Nav.Item>
      <Nav.Item>
        {props.step2 ? (
          <Nav.Link>Payment</Nav.Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}
