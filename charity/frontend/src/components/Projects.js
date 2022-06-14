import React from 'react'
import { Accordion, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Project = ({ project }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/Project/${project._id}`}>
        <Card.Img src={project.image} variant="top" />
      </Link>
      <Card.Body>
        <Card.Title as="div">
          <strong>{project.name}</strong>
        </Card.Title>
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Description</Accordion.Header>
            <Accordion.Body>
              <Card.Text as="div">
                <div className="my-3">{project.description}</div>
              </Card.Text>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <Card.Title as="div">Donation goal= ${project.donationGoal}</Card.Title>
        <Link to={`/Project/${project._id}`}>
          <Button variant="primary">Donate</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}
export default Project
