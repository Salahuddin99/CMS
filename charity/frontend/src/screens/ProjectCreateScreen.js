import React, { useEffect, useState } from 'react'
import {
  Form,
  Button,
  Container,
  Toast,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { createProject } from '../actions/projectAction'
import ErrorMessageBox from '../components/ErrorMessagebox'
import {
  PROJECT_UPLOAD_REQUEST,
  PROJECT_UPLOAD_SUCCESS,
  PROJECT_UPLOAD_FAIL,
} from '../constants/projectConstant'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ProjectCreateScreen() {
  const navigate = useNavigate()
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
  const [location, setLocation] = useState('')
  const [donationGoal, setDonationGoal] = useState('')
  const dispatch = useDispatch()

  const projectCreate = useSelector((state) => state.projectCreate)
  const {
    success: successCreate,
    loading: load,
    error: errorCreate,
  } = projectCreate

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProject({
        name,
        category,
        image,
        images,
        description,
        Challenge,
        Solution,
        longTermImpact,
        additionalDocumentation,
        by,
        location,
        donationGoal,
        // companyRegistrationNumber,
        // companyAddress,
        // yearFounded,
        // contactName,
        // telephoneNo,
        // emailAddress,
        // country,
      })
    )
  }
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo.isAdmin && !userInfo.isNGO) {
      navigate('/')
    } else {
      if (successCreate) {
        navigate('/adminDashboard')
      }
    }
  }, [navigate, successCreate, userInfo])

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
      <h1>Create Project</h1>
      {successCreate && (
        <ErrorMessageBox variant="danger">{successCreate}</ErrorMessageBox>
      )}
      {errorCreate && (
        <ErrorMessageBox variant="danger">{errorCreate}</ErrorMessageBox>
      )}
      {load && <Loading />}

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Project Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Project Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="by">
          <Form.Label>Company Name </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Company name"
            required
            onChange={(e) => setBy(e.target.value)}
          />
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
        <Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <fieldset disabled>
              <Form.Control
                placeholder="choose image below"
                value={image}
                required
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </fieldset>
            <Form.Group controlId="imageFile">
              <Form.Label>Upload Image</Form.Label>
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
        </Form.Group>
        <Form.Group controlId="Donation Goal">
          <Form.Label>Donation Goal</Form.Label>
          <Form.Control
            type="number"
            min="100"
            placeholder="minimum $100"
            value={donationGoal}
            required
            onChange={(e) => setDonationGoal(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="Location">
          <Form.Label>Project Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter project location take place"
            value={location}
            required
            onChange={(e) => setLocation(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Project Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="Challenge">
          <Form.Label>Project Challenge</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter project Challenge"
            value={Challenge}
            onChange={(e) => setChallenge(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="Solution">
          <Form.Label>project Solution</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter project Solution"
            value={Solution}
            onChange={(e) => setSolution(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="Project long term impact">
          <Form.Label>Project long term impact</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter project long term impact"
            value={longTermImpact}
            onChange={(e) => setLongTermImpact(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="formFile">
          <Form.Label>Project additional Documentation</Form.Label>
          <Form.Control
            type="file"
            placeholder="additional Documentation"
            value={additionalDocumentation}
            onChange={(e) => setAdditionalDocumentation(e.target.value)}
          />
        </Form.Group>
        {/* <Form.Group controlId="Name of organization">
          <Form.Label>Name of organization</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the name of your organization"
            value={by}
            required
            onChange={(e) => setBy(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="Company Registration Number">
          <Form.Label>Company Registration Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your Company Registration Number etc: 2019 xx xxxx"
            value={companyRegistrationNumber}
            required
            onChange={(e) => setCompanyRegistrationNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="Company Address">
          <Form.Label>Company Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Company Address"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="yearFounded">
          <Form.Label>Company year founded</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your Company year founded"
            value={yearFounded}
            required
            onChange={(e) => setYearFounded(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="contactName">
          <Form.Label>Company contact Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Company contact Name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="telephoneNo">
          <Form.Label>company contact Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your company contact Number"
            value={telephoneNo}
            required
            onChange={(e) => setTelephoneNo(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="emailAddress">
          <Form.Label>Company Email Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Company Email Address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label>Company country from</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Company contact Name"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group> */}
        <Button variant="primary" type="submit">
          Create
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
    </Container>
  )
}
