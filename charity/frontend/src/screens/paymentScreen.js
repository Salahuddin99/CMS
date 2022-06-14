import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { ORDER_CREATE_RESET } from '../constants/paymentConstant'
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  Button,
  Image,
} from 'react-bootstrap'
import CheckoutSteps from '../components/paymentStep'
import ErrorMessageBox from '../components/ErrorMessagebox'
import { createDonation } from '../actions/paymentAction'
import Loading from '../components/Loading'

export default function PaymentScreen() {
  const dispatch = useDispatch()

  const donationCreate = useSelector((state) => state.donationCreate)
  const { success, error, loading, donations } = donationCreate

  const navigate = useNavigate()
  useEffect(() => {
    if (success) {
      navigate(`/`)
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [success, navigate, dispatch, donations])

  const payment = useSelector((state) => state.payment)
  payment.taxPrice = Number((0.11 * payment.savePayment.donation).toFixed(2))
  payment.totalPrice =
    Number(payment.taxPrice) + Number(payment.savePayment.donation)

  const placeOrderHandler = () => {
    dispatch(
      createDonation({
        ...payment,
        DonateItems: payment.Items,
        savePayment: payment.savePayment,
        taxPrice: payment.taxPrice,
        totalPrice: payment.totalPrice,
      })
    )
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Donation Project detail</h2>
              <Col md={3} className="mt-3" key={payment.Items.project}>
                <Image
                  src={payment.Items.image}
                  rounded
                  fluid
                  alt={payment.Items.name}
                ></Image>
              </Col>
              <Col className="mt-2">
                <p>Name:{payment.Items.name}</p>
                <p>Email: {payment.Items.category}</p>
                <p>Description: {payment.Items.description}</p>
                <p>Solution: {payment.Items.Solution}</p>
              </Col>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Donor Detail</h2>
              <p>Name: {payment.savePayment.name}</p>
              <p>Email: {payment.savePayment.email}</p>
              <p>Description: {payment.savePayment.description}</p>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Donation Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Donation amount</Col>
                  <Col>${payment.savePayment.donation}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${payment.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${payment.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  amount={payment.totalPrice}
                  onClick={placeOrderHandler}
                >
                  Pay now
                </Button>

                {loading && <Loading></Loading>}
                {error && (
                  <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
