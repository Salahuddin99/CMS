import React from 'react'
import CheckoutSteps from '../components/paymentStep'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { add } from '../actions/paymentAction'
import {
  ListGroup,
  Button,
  Col,
  Row,
  Image,
  ListGroupItem,
} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

function PaymentDescriptionProject() {
  const params = useParams()
  const { id: projectId } = params
  const navigate = useNavigate()

  const dispatch = useDispatch()
  useEffect(() => {
    if (projectId) {
      dispatch(add(projectId))
    }
  }, [dispatch, projectId])

  const payment = useSelector((state) => state.payment)

  const checkoutHandler = () => {
    navigate(`/payment_description`)
  }
  return (
    <>
      <CheckoutSteps> step1 </CheckoutSteps>
      <Row>
        <ListGroup variant="flush">
          <ListGroup.Item key={payment.project}>
            <Row>
              <Col md={3}>
                <Image
                  src={payment.Items.image}
                  rounded
                  fluid
                  alt={payment.Items.name}
                ></Image>
              </Col>
              <Col>
                <ListGroupItem className="mt-5">
                  <p>
                    <strong>Donation name: </strong> {payment.Items.name}
                  </p>
                  <p>
                    <strong>Category:</strong> {payment.Items.category}
                  </p>
                  <p>
                    <strong>Description: </strong>
                    {payment.Items.description}
                  </p>
                  <p>
                    <strong>Solution:</strong> {payment.Items.Solution}
                  </p>
                </ListGroupItem>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>

        <Button type="button" onClick={checkoutHandler} className="mt-3">
          Proceed
        </Button>
      </Row>
    </>
  )
}

export default PaymentDescriptionProject
