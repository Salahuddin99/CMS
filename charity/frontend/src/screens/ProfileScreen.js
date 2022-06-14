import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { detailsUser, updateUserProfile } from '../actions/userAction'
import ErrorMessageBox from '../components/ErrorMessagebox'
import Loading from '../components/Loading'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstant'

import {
  PROJECT_UPLOAD_REQUEST,
  PROJECT_UPLOAD_SUCCESS,
  PROJECT_UPLOAD_FAIL,
} from '../constants/projectConstant'
import axios from 'axios'

export const ProfileScreen = () => {
  const navigate = useNavigate()
  const [uploading, setUploading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Confirmpassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [nGOcompanyName, setCompanyName] = useState('')
  const [nGOcompanylogo, setCompanylogo] = useState('')
  const [nGOdescription, setDescription] = useState('')
  const [nGOcompanyRegistrationNumber, setCompanyRegistrationNumber] =
    useState('')
  const [nGOcompanyAddress, setCompanyAddress] = useState('')
  const [nGOyearFounded, setYearFounded] = useState('')
  const [nGOcontactName, setContactName] = useState('')
  const [nGOemailAddress, setEmailAddress] = useState('')
  const [nGOcountry, setCountry] = useState('')
  const [nGOtelephoneNo, setTelephoneNo] = useState('')

  const updateProfile = useSelector((state) => state.updateProfile)
  const {
    success: successupdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = updateProfile

  const userDetail = useSelector((state) => state.userDetail)
  const { loading, error, user } = userDetail

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      navigate('/')
      console.log(navigate)
    } else {
      if (!user.name) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(detailsUser(userInfo._id))
      } else {
        setName(user.name)
        setEmail(user.email)
        if (user.nGO) {
          setCompanyName(user.nGO.companyName)
          setCompanylogo(user.nGO.companylogo)
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
  }, [userInfo, dispatch, user, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== Confirmpassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateUserProfile({
          userid: user._id,
          name,
          email,
          password,
          nGOcompanyName,
          nGOcompanylogo,
          nGOdescription,
          nGOcompanyRegistrationNumber,
          nGOcompanyAddress,
          nGOyearFounded,
          nGOcontactName,
          nGOemailAddress,
          nGOcountry,
          nGOtelephoneNo,
        })
      )
    }
  }

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
    <Container className="small-container">
      <h1 className="my-3">Profile</h1>
      {message && <ErrorMessageBox variant="danger">{message}</ErrorMessageBox>}
      {error && <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>}
      {successupdate && (
        <ErrorMessageBox variant="success">Profile Updated</ErrorMessageBox>
      )}
      {errorUpdate && (
        <ErrorMessageBox variant="danger">{errorUpdate}</ErrorMessageBox>
      )}
      {loadingUpdate && <Loading></Loading>}
      {loading && <Loading />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Update Details</Button>
        </div>
      </Form>

      <Form onSubmit={submitHandler}>
        {user.isNGO && (
          <>
            <h2>NGO profile</h2>
            <Form.Group controlId="Company Name" className="mt-5">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Company Name"
                value={nGOcompanyName}
                onChange={(e) => setCompanyName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="Company Description" className="mt-3">
              <Form.Label>Company description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter company description"
                value={nGOdescription}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image" className="mt-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="select image"
                value={nGOcompanylogo}
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
            <Form.Group
              controlId="Company Registration Number"
              className="mt-3"
            >
              <Form.Label>Company Registration Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your Company Registration Number etc: 2019 xx xxxx"
                value={nGOcompanyRegistrationNumber}
                required
                onChange={(e) => setCompanyRegistrationNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="Company Address" className="mt-3">
              <Form.Label>Company Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Company Address"
                value={nGOcompanyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="yearFounded" className="mt-3">
              <Form.Label>Company year founded</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your Company year founded"
                value={nGOyearFounded}
                required
                onChange={(e) => setYearFounded(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="contactName" className="mt-3">
              <Form.Label>Company contact Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Company contact Name"
                value={nGOcontactName}
                onChange={(e) => setContactName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="telephoneNo" className="mt-3">
              <Form.Label>company contact Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your company contact Number"
                value={nGOtelephoneNo}
                required
                onChange={(e) => setTelephoneNo(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="emailAddress" className="mt-3">
              <Form.Label>Company Email Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Company Email Address"
                value={nGOemailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="country" className="mt-3">
              <Form.Label>Company country from</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country Name"
                value={nGOcountry}
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </>
        )}
        <div className="mt-3">
          <Button type="submit">Update Details</Button>
        </div>
      </Form>
    </Container>
  )
}
