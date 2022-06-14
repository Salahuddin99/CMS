import React, { useEffect } from 'react'
import { Col, Nav, Tab, Row, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import DonationHistoryAdmin from './DonationHistoryAdmin'
import ProjectListScreen from './ProjectListScreen'
import UserListScreen from './UserListScreen'

function AdminDashboard() {
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate('/')
    }
  }, [userInfo, navigate])

  return (
    <Container className="mt-3">
      <h3 className="my-3">Admin Dashboard</h3>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3} className="mt-4">
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Create Project</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">All user</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">Donation History</Nav.Link>
              </Nav.Item>
              {/* <Nav.Item>
                <Nav.Link eventKey="fourth">Analytic</Nav.Link>
              </Nav.Item> */}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <ProjectListScreen />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <UserListScreen />
              </Tab.Pane>
              <Tab.Pane eventKey="third">
                <DonationHistoryAdmin />
              </Tab.Pane>
              {/* <Tab.Pane eventKey="fourth">asdasd</Tab.Pane> */}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  )
}

export default AdminDashboard
