import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../actions/userAction'
import ErrorMessageBox from '../components/ErrorMessagebox'
import Loading from '../components/Loading'

export const SignInScreen = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo, loading, error } = userLogin
  const dispatch = useDispatch()
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
      console.log(redirect)
    }
  }, [userInfo, navigate, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <Container className="small-container">
      <h1 className="my-3">Sign In</h1>
      {error && <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>}
      {loading && <Loading />}
      <Form onSubmit={submitHandler}>
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
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          Ready to join us?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Sign up
          </Link>
        </div>
      </Form>
    </Container>
  )
}
