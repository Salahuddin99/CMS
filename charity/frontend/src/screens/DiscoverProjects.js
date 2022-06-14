import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Project from '../components/Projects'
import { useDispatch, useSelector } from 'react-redux'
import { listProjects } from '../actions/projectAction'
import Loading from '../components/Loading'
import ErrorMessageBox from '../components/ErrorMessagebox'

export default function StartProjectScreen() {
  // const params = useParams()
  // const keyword = params.keyword
  // const pageNumber = params.pageNumber || 1
  const dispatch = useDispatch()
  const projectList = useSelector((state) => state.projectList)
  const { projects, loading, error } = projectList
  useEffect(() => {
    dispatch(listProjects({}))
  }, [dispatch])

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>
      ) : (
        <>
          <h1>Featured Projects</h1>
          <Row>
            {projects.map((project) => (
              <Col key={project._id} sm={12} md={6} lg={3}>
                <Project project={project}></Project>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  )
}
