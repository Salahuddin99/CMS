import React, { useEffect, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'

import { startAproject, detailsUser } from '../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import ErrorMessageBox from '../components/ErrorMessagebox'
import axios from 'axios'

// import {
//   START_PROJECT_RESET,
//   USER_DELETE_FAIL,
// } from '../constants/userConstant'
import {
  PROJECT_UPLOAD_REQUEST,
  PROJECT_UPLOAD_SUCCESS,
  PROJECT_UPLOAD_FAIL,
} from '../constants/projectConstant'
import { useNavigate } from 'react-router-dom'

export default function StartAProjectScreen() {
  // const navigate = useNavigate()
  const dispatch = useDispatch()
  const [uploading, setUploading] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [companylogo, setCompanylogo] = useState('')
  const [description, setDescription] = useState('')
  const [companyRegistrationNumber, setCompanyRegistrationNumber] = useState('')
  const [companyAddress, setCompanyAddress] = useState('')
  const [yearFounded, setYearFounded] = useState('')
  const [contactName, setContactName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [country, setCountry] = useState('')
  const [telephoneNo, setTelephoneNo] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      startAproject({
        nGO: {
          uploading,
          companyName,
          companylogo,
          description,
          companyRegistrationNumber,
          companyAddress,
          yearFounded,
          contactName,
          emailAddress,
          country,
          telephoneNo,
        },
      })
    )
  }

  const userDetail = useSelector((state) => state.userDetail)
  const { user } = userDetail
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin')
    } else {
      if (!user.name) {
        dispatch(detailsUser(userInfo._id))
      } else {
        if (user.nGO) {
          setCompanyName(user.nGO.companyName)
          setDescription(user.nGO.description)
          setCompanyRegistrationNumber(user.nGO.companyRegistrationNumber)
          setCompanyAddress(user.nGO.companyAddress)
          setYearFounded(user.nGO.yearFounded)
          setContactName(user.nGO.contactName)
          setEmailAddress(user.nGO.emailAddress)
          setCountry(user.nGO.country)
          setTelephoneNo(user.nGO.telephoneNo)
        }
      }
    }
  }, [navigate, userInfo, dispatch, user])

  const ProjectStart = useSelector((state) => state.ProjectStart)
  const {
    error: errorUpdate,
    loading: loadingUpdate,
    success: successUpdate,
  } = ProjectStart

  const uploadFileHandler = async (e) => {
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
      setCompanylogo(data.secure_url)
      setUploading(false)
    } catch (error) {
      dispatch({ type: PROJECT_UPLOAD_FAIL })
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <Container>
      <h1>Become NGO</h1>
      <label>Add your info below and wait for approval from admin</label>
      {loadingUpdate && <Loading></Loading>}
      {errorUpdate && (
        <ErrorMessageBox variant="danger">error{errorUpdate}</ErrorMessageBox>
      )}
      {successUpdate && (
        <ErrorMessageBox variant="success">
          Pending for request{successUpdate}
        </ErrorMessageBox>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="Company Name" className="mt-5">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="Company Description" className="mt-3">
          <Form.Label>Company description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter company description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="image" className="mt-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="image url"
            value={companylogo}
            onChange={(e) => setCompanylogo(e.target.value)}
          ></Form.Control>
          <Form.Group controlId="imageFile" className="mt-3">
            <Form.Label>Upload image</Form.Label>
            <Form.Control
              type="file"
              onChange={uploadFileHandler}
            ></Form.Control>
            {uploading && <Loading />}
          </Form.Group>
        </Form.Group>
        <Form.Group controlId="Company Registration Number" className="mt-3">
          <Form.Label>Company Registration Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your Company Registration Number etc: 2019 xx xxxx"
            value={companyRegistrationNumber}
            required
            onChange={(e) => setCompanyRegistrationNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="Company Address" className="mt-3">
          <Form.Label>Company Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Company Address"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="yearFounded" className="mt-3">
          <Form.Label>Company year founded</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your Company year founded"
            value={yearFounded}
            required
            onChange={(e) => setYearFounded(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="contactName" className="mt-3">
          <Form.Label>Company contact Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Company contact Name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="telephoneNo" className="mt-3">
          <Form.Label>company contact Number</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your company contact Number"
            value={telephoneNo}
            required
            onChange={(e) => setTelephoneNo(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="emailAddress" className="mt-3">
          <Form.Label>Company Email Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Company Email Address"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country" className="mt-3">
          <Form.Label>Company country from</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country Name"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-4">
          Update
        </Button>{' '}
      </Form>
    </Container>
  )
}
