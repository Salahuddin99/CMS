import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { register } from '../actions/userAction'
import ErrorMessageBox from '../components/ErrorMessagebox'
import Loading from '../components/Loading'

export const RegisterScreen = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Confirmpassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const userRegister = useSelector((state) => state.userRegister)
  const { userInfo, loading, error } = userRegister
  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo) {
      navigate('/')
      console.log(redirect)
    }
  }, [userInfo, navigate, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== Confirmpassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <Container className="small-container">
      <h1 className="my-3">Sign Up</h1>
      {message && <ErrorMessageBox variant="danger">{message}</ErrorMessageBox>}
      {error && (
        <ErrorMessageBox variant="danger">
          Email address have been taken,sign in instead
        </ErrorMessageBox>
      )}
      {loading && <Loading />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
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
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          Have an account?{' '}
          <Link to={redirect ? `/signin?redirect=${redirect}` : '/signin'}>
            Sign in
          </Link>
        </div>
      </Form>
    </Container>
  )
}
