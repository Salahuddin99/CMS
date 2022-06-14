import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  Image,
} from 'react-bootstrap'
import ErrorMessageBox from '../components/ErrorMessagebox'
import { detailsDonation } from '../actions/paymentAction'
import Loading from '../components/Loading'

export default function DonationPayScreen() {
  const params = useParams()
  const { id: donationId } = params
  // const { pathname } = useLocation()
  // const nGOMode = pathname.indexOf('/Ngo') >= 0
  const donationDetail = useSelector((state) => state.donationDetail)
  const { loading, error, donation } = donationDetail

  //   const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(detailsDonation(donationId))
  }, [dispatch, donationId])

  return loading ? (
    <Loading></Loading>
  ) : error ? (
    <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>
  ) : (
    <>
      <h1>Donation {donation._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Donation Project detail</h2>
              <Col md={3} className="mt-3" key={donation.DonateItems.project}>
                <Image
                  src={donation.DonateItems.image}
                  rounded
                  fluid
                  alt={donation.DonateItems.name}
                ></Image>
              </Col>
              <Col className="mt-2">
                <p>Name:{donation.DonateItems.name}</p>
                <p>Email: {donation.DonateItems.category}</p>
                <p>Description: {donation.DonateItems.description}</p>
                <p>Solution: {donation.DonateItems.Solution}</p>
              </Col>
            </ListGroupItem>
            <ListGroupItem>
              <h2>Donor Detail</h2>
              <p>Name: {donation.savePayment.name}</p>
              <p>Email: {donation.savePayment.email}</p>
              <p>Description: {donation.savePayment.description}</p>
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
                  <Col>${donation.savePayment.donation}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${donation.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${donation.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}
