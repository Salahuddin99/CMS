import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logout } from '../actions/userAction'

function Header() {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>CMS</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mr-auto">
              <LinkContainer to="/Project">
                <Nav.Link>Discover Project</Nav.Link>
              </LinkContainer>
              {userInfo && userInfo.isNGO && userInfo.isNGO ? (
                <Navbar.Collapse id="navbarScroll">
                  <NavDropdown title="My project">
                    <LinkContainer to="/projectlist/Ngo">
                      <NavDropdown.Item>Project Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    {/* <LinkContainer to="/Ngo/project">
                      <NavDropdown.Item>Progress update</NavDropdown.Item>
                    </LinkContainer> */}
                  </NavDropdown>
                </Navbar.Collapse>
              ) : (
                <LinkContainer to="/start-a-project">
                  <Nav.Link>Start a Project</Nav.Link>
                </LinkContainer>
              )}

              <LinkContainer to="/About-us">
                <Nav.Link>About us</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ml-auto ">
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>My Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/donation/history">
                  <NavDropdown.Item>Donation history</NavDropdown.Item>
                </LinkContainer>
                {userInfo && userInfo.isAdmin && (
                  <LinkContainer to="/adminDashboard">
                    <NavDropdown.Item>Admin Dashboard</NavDropdown.Item>
                  </LinkContainer>
                )}

                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav className="ml-auto ">
                <LinkContainer to="/signin">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Login
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to="/register">
                  <Nav.Link>
                    <i className="fas fa-smile"></i> Register
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}

export default Header
