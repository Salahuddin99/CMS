import React, { useEffect } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  listProjects,
  deleteProject,
  // createProject,
} from '../actions/projectAction'
import Loading from '../components/Loading'
import ErrorMessageBox from '../components/ErrorMessagebox'
import { useLocation, useNavigate } from 'react-router-dom'
import { PROJECT_CREATE_RESET } from '../constants/projectConstant'

export default function ProjectListScreen() {
  const { pathname } = useLocation()
  const nGOMode = pathname.indexOf('/Ngo') >= 0
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const deleteHandler = (project) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProject(project._id))
    }
  }

  const projectDelete = useSelector((state) => state.projectDelete)
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = projectDelete
  const projectList = useSelector((state) => state.projectList)
  const { loading, error, projects } = projectList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const projectCreate = useSelector((state) => state.projectCreate)
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    project: createdProjects,
  } = projectCreate

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PROJECT_CREATE_RESET })
      if (userInfo.isAdmin) {
        navigate(`/adminDashboard`)
      } else if (userInfo.isNGO) {
        navigate('/projectlist/Ngo')
      }
    }
    dispatch(listProjects({ nGO: nGOMode ? userInfo._id : '' }))
  }, [
    dispatch,
    successCreate,
    createdProjects,
    navigate,
    successDelete,
    nGOMode,
    userInfo,
  ])
  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h2>Projects</h2>
        </Col>
        <Col className="text-right">
          <Button onClick={() => navigate('/project/create')}>
            Create Project
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loading></Loading>}
      {errorCreate && (
        <ErrorMessageBox variant="danger">{errorCreate}</ErrorMessageBox>
      )}
      {loadingDelete && <Loading></Loading>}
      {errorDelete && (
        <ErrorMessageBox variant="danger">{errorDelete}</ErrorMessageBox>
      )}
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>CREATED BY</th>
                {/* <th>CURENT DONATION</th> */}
                <th>CATEGORY</th>
                <th>Location</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>{project._id}</td>
                  <td>{project.name}</td>
                  <td>{project.by}</td>
                  {/* <td>{project.currentdonation}</td> */}
                  <td>{project.category}</td>
                  <td>{project.location}</td>
                  <td>
                    <LinkContainer to={`/project/${project._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        Edit
                      </Button>
                    </LinkContainer>
                    <Button
                      type="button"
                      variant="light"
                      className="btn-sm"
                      onClick={() => deleteHandler(project)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Pagination>
            {[...Array(pages).keys()].map((x) => (
              <LinkContainer key={x + 1} to={`/projectlist/${x + 1}`}>
                <Pagination.Item active={x + 1 === page}>
                  {x + 1}
                </Pagination.Item>
              </LinkContainer>
            ))}
          </Pagination> */}
        </>
      )}
    </>
  )
}
