import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { detailsUser, updateUser } from '../actions/userAction'
import Loading from '../components/Loading'
import ErrorMessageBox from '../components/ErrorMessagebox'
import { USER_DETAILS_RESET } from '../constants/userConstant'
import { useNavigate, useParams } from 'react-router-dom'

export default function UpdateUserScreen() {
  const navigate = useNavigate()
  const params = useParams()
  const { id: userId } = params
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isNGO, setNGO] = useState('')
  const [isAdmin, setAdmin] = useState('')
  const [nGOcompanyName, setCompanyName] = useState('')
  const [nGOdescription, setDescription] = useState('')
  const [nGOcompanyRegistrationNumber, setCompanyRegistrationNumber] =
    useState('')
  const [nGOcompanyAddress, setCompanyAddress] = useState('')
  const [nGOyearFounded, setYearFounded] = useState('')
  const [nGOcontactName, setContactName] = useState('')
  const [nGOemailAddress, setEmailAddress] = useState('')
  const [nGOcountry, setCountry] = useState('')
  const [nGOtelephoneNo, setTelephoneNo] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, isNGO, isAdmin }))
  }

  let bool = true

  const changeValue = () => {
    bool = !bool
  }

  const userDetail = useSelector((state) => state.userDetail)
  const { user, loading, error } = userDetail
  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    error: errorUpdate,
    success: successUpdate,
    loading: loadingUpdate,
  } = userUpdate
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo.isAdmin || !userInfo.isNGO) {
      navigate('/')
    } else {
      if (successUpdate) {
        dispatch({ type: USER_DETAILS_RESET })
        navigate('/adminDashboard')
      }
      if (!user.name) {
        dispatch(detailsUser(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setNGO(user.isNGO)
        setAdmin(user.isAdmin)
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
  }, [user, successUpdate, dispatch, navigate, userId, userInfo])

  return (
    <div>
      <h1>Edit User {user.name}</h1>
      {loadingUpdate && <Loading></Loading>}
      {errorUpdate && (
        <ErrorMessageBox variant="danger">{errorUpdate}</ErrorMessageBox>
      )}
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <>
            <h2>NGO Request</h2>
            <Form.Group controlId="Company Name" className="mt-4">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder="Enter Company Name"
                value={nGOcompanyName}
                onChange={(e) => setCompanyName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="Company Description" className="mt-3">
              <Form.Label>Company description</Form.Label>
              <Form.Control
                disabled
                as="textarea"
                placeholder="Enter company description"
                value={nGOdescription}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group
              controlId="Company Registration Number"
              className="mt-3"
            >
              <Form.Label>Company Registration Number</Form.Label>
              <Form.Control
                disabled
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
                disabled
                type="text"
                placeholder="Enter Company Address"
                value={nGOcompanyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="yearFounded" className="mt-3">
              <Form.Label>Company year founded</Form.Label>
              <Form.Control
                disabled
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
                disabled
                type="text"
                placeholder="Enter Company contact Name"
                value={nGOcontactName}
                onChange={(e) => setContactName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="telephoneNo" className="mt-3">
              <Form.Label>company contact Number</Form.Label>
              <Form.Control
                disabled
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
                disabled
                type="text"
                placeholder="Enter Company Email Address"
                value={nGOemailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="country" className="mt-3">
              <Form.Label>Company country from</Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder="Enter Country Name"
                value={nGOcountry}
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </>

          <Form.Group controlId="NGO" className="mt-3">
            <Form.Check
              type="checkbox"
              label="NGO"
              checked={isNGO}
              onClick={changeValue()}
              onChange={(e) => setNGO(e.target.checked)}
            ></Form.Check>
          </Form.Group>
          <Form.Group controlId="isAdmin" className="mt-3">
            <Form.Check
              type="checkbox"
              label="Admin"
              checked={isAdmin}
              onClick={changeValue()}
              onChange={(e) => setAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Update
          </Button>

          <Button
            className="mt-3"
            variant="light"
            type="button"
            onClick={() => navigate('/adminDashboard')}
          >
            Back
          </Button>
        </Form>
      )}
    </div>
  )
}
