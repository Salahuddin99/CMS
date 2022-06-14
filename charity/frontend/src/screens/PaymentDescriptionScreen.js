import React, { useState } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { savePaymentInformation } from '../actions/paymentAction'
import CheckoutSteps from '../components/paymentStep'

export default function PaymentDescriptionScreen() {
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  if (!userInfo) {
    navigate('/')
  }

  const payment = useSelector((state) => state.payment)
  const { savePayment } = payment
  const [name, setName] = useState(savePayment.name)
  const [email, setemail] = useState(savePayment.email)
  const [description, setdescription] = useState(savePayment.description)
  const [donation, setDonation] = useState(savePayment.donation)
  const dispatch = useDispatch()

  const submithandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentInformation({ name, email, description, donation }))
    navigate(`/payment_confirm`)
  }

  return (
    <>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <Form className="form" onSubmit={submithandler}>
        <Form.Group as={Row} className="mt-3" controlId="name">
          <Form.Label column sm={2}>
            Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="name"
              placeholder="name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-3" controlId="email">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              placeholder="email"
              value={email}
              required
              onChange={(e) => setemail(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-3" controlId="description">
          <Form.Label column sm={2}>
            Description for Project donation owner
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              placeholder="description"
              value={description}
              required
              onChange={(e) => setdescription(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mt-3" controlId="donation">
          <Form.Label column sm={2}>
            Donation amount
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="number"
              placeholder="Donation amount $"
              value={donation}
              required
              onChange={(e) => setDonation(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mt-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Proceed</Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  )
}
