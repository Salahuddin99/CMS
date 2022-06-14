import React, { useState } from 'react'
import {
  Form,
  Button,
  Toast,
  Container,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'
import { useEffect } from 'react'
import { detailsOfProject, updateProject } from '../actions/projectAction'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import ErrorMessageBox from '../components/ErrorMessagebox'
import {
  PROJECT_UPDATE_RESET,
  PROJECT_UPLOAD_REQUEST,
  PROJECT_UPLOAD_SUCCESS,
  PROJECT_UPLOAD_FAIL,
} from '../constants/projectConstant'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function ProjectEditScreen(props) {
  const navigate = useNavigate()
  const params = useParams()
  const { id: projectId } = params
  const [uploading, setUploading] = useState(false)
  const [name, setName] = useState('')
  const [by, setBy] = useState('')
  const [category, setCategory] = useState()
  const [image, setImage] = useState('')
  const [images, setImages] = useState([])
  const [description, setDescription] = useState('')
  const [Challenge, setChallenge] = useState('')
  const [Solution, setSolution] = useState('')
  const [longTermImpact, setLongTermImpact] = useState('')
  const [additionalDocumentation, setAdditionalDocumentation] = useState('')

  const projectUpdate = useSelector((state) => state.projectUpdate)
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = projectUpdate

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProject({
        _id: projectId,
        name,
        by,
        category,
        image,
        images,
        description,
        Challenge,
        Solution,
        longTermImpact,
        additionalDocumentation,
      })
    )
  }
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const projectDetails = useSelector((state) => state.projectDetails)
  const { project, loading, error } = projectDetails
  const dispatch = useDispatch()
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PROJECT_UPDATE_RESET })
      navigate('/adminDashboard')
    }
    if (!project.name || project._id !== projectId || successUpdate) {
      dispatch(detailsOfProject(projectId))
    } else {
      setName(project.name)
      setBy(project.by)
      setCategory(project.category)
      setImage(project.image)
      setDescription(project.description)
      setChallenge(project.Challenge)
      setSolution(project.Solution)
      setLongTermImpact(project.longTermImpact)
      setAdditionalDocumentation(project.additionalDocumentation)
    }
  }, [project, successUpdate, navigate, dispatch, projectId, userInfo])

  const uploadFileHandler = async (e, forImages) => {
    const file = e.target.files[0]
    const bodyformData = new FormData()
    bodyformData.append('file', file)
    setUploading(true)
    try {
      dispatch({ type: PROJECT_UPLOAD_REQUEST })
      const { data } = await axios.post('/api/upload', bodyformData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      dispatch({ type: PROJECT_UPLOAD_SUCCESS })
      if (forImages) {
        setImages([...images, data.secure_url])
      } else {
        setImage(data.secure_url)
      }
      Toast.success('image upload sucessful')
      setUploading(false)
    } catch (error) {
      dispatch({ type: PROJECT_UPLOAD_FAIL })
      console.error(error)
      setUploading(false)
    }
  }
  const deleteFileHandler = async (fileName) => {
    setImages(images.filter((x) => x === fileName))
    Toast.succes('Image removed successfully')
  }

  return (
    <Container>
      <h1>Edit Project {project.name}</h1>
      {loadingUpdate && <Loading></Loading>}
      {errorUpdate && (
        <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>
      )}
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="by" className="mt-2">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Company Name"
              value={by}
              onChange={(e) => setBy(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="charity category">
            <Form.Label>Charity category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={category}
              required
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Open this select menu</option>
              <option value="Stuff charity">Stuff charity</option>
              <option value="Food charity">Food charity</option>
              <option value="Fund raise">Fund raise</option>
              <option value="Education charity">Education charity</option>
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.Group controlId="imageFile">
              <Form.Label>Upload File</Form.Label>
              <Form.Control
                type="file"
                onChange={uploadFileHandler}
              ></Form.Control>
              {uploading && <Loading />}
            </Form.Group>
          </Form.Group>
          <Form.Group className="mb-3" controlId="additionalImage">
            <Form.Label>Additional Images</Form.Label>
            {images.length === 0 && <ErrorMessageBox>No image</ErrorMessageBox>}
            <ListGroup variant="flush">
              {images.map((x) => (
                <ListGroupItem
                  key={x}
                  onChange={(e) => setImages(e.target.value)}
                >
                  {x}
                  <Button variant="light" onClick={(x) => deleteFileHandler(x)}>
                    <i className="fa fa-times-circle"></i>
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
            <Form.Group controlId="additionalImageFile">
              <Form.Label>Upload Aditional Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => uploadFileHandler(e, true)}
              ></Form.Control>
              {uploading && <Loading />}
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="Challenge">
            <Form.Label>Challenge</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Challenge"
              value={Challenge}
              onChange={(e) => setChallenge(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="Solution">
            <Form.Label>Solution</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Solution"
              value={Solution}
              onChange={(e) => setSolution(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="Long Term Impact">
            <Form.Label>Long Term Impact</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter long Term Impact"
              value={longTermImpact}
              onChange={(e) => setLongTermImpact(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="additionalDocumentation">
            <Form.Label>Additional Documentation</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter additionalDocumentation"
              value={additionalDocumentation}
              onChange={(e) => setAdditionalDocumentation(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Update
          </Button>{' '}
          {userInfo.isAdmin && userInfo.isNGO && (
            <Button
              variant="light"
              type="button"
              onClick={() => navigate('/adminDashboard')}
            >
              Back
            </Button>
          )}
          {!userInfo.isAdmin && userInfo.isNGO && (
            <Button
              variant="light"
              type="button"
              onClick={() => navigate('/projectlist/Ngo')}
            >
              Back
            </Button>
          )}
        </Form>
      )}
    </Container>
  )
}
