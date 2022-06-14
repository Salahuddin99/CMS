import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Image,
  ListGroup,
  Row,
  Col,
  Card,
  Button,
  ListGroupItem,
  Container,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { detailsOfProject } from '../actions/projectAction'
import ErrorMessageBox from '../components/ErrorMessagebox'
import Loading from '../components/Loading'

export default function ProjectScreen() {
  const navigate = useNavigate()
  const params = useParams()
  const { id: projectId } = params
  const dispatch = useDispatch()
  const projectDetails = useSelector((state) => state.projectDetails)
  const { project, loading, error } = projectDetails
  const [selectedImage, setSelectedImage] = useState('')
  // const userLogin = useSelector((state) => state.userLogin)
  // const { userInfo } = userLogin

  useEffect(() => {
    dispatch(detailsOfProject(projectId))
  }, [dispatch, projectId])

  const proceedToPay = () => {
    navigate(`/payment_project/${projectId}`)
  }
  return loading ? (
    <Loading />
  ) : error ? (
    <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>
  ) : (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Image
            src={selectedImage || project.image}
            alt={project.name}
            fluid
          />
          <ListGroupItem>
            <Row xs={1} md={2} className="g-2">
              {[project.image, ...project.images].map((x) => (
                <Col key={x}>
                  <Card>
                    <Button
                      className="thumbnail"
                      type="button"
                      variant="light"
                      onClick={() => setSelectedImage(x)}
                    >
                      <Card.Img variant="top" src={x} alt="project" />
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </ListGroupItem>
        </Col>
        <Col md={5}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{project.name}</h3>
            </ListGroupItem>
            <ListGroupItem>
              <h6>
                <strong>Location: </strong> {project.location}
              </h6>
              <h6>
                <strong>By: </strong> {project.by}
              </h6>
            </ListGroupItem>

            <ListGroupItem>
              <p>
                <strong>Description: </strong> {project.description}
              </p>
              <p>
                <strong>Challenge:</strong> {project.Challenge}
              </p>
              <p>
                <strong>Solution: </strong>
                {project.Solution}
              </p>
              <p>
                <strong>Longterm Impact:</strong> {project.longTermImpact}
              </p>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h5>Category: {project.category}</h5>
              </ListGroupItem>
              <ListGroupItem>
                <div>
                  Status:{' '}
                  {project.donationGoal <= project.currentdonation
                    ? 'Donation goal has been completed'
                    : 'In progress'}
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div>Donation needed: ${project.donationGoal}</div>
                <div>Collected amount: ${project.currentdonation}</div>
              </ListGroupItem>
              <ListGroupItem>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={project.donationGoal <= project.currentdonation}
                  onClick={proceedToPay}
                >
                  Donate
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  )
}
