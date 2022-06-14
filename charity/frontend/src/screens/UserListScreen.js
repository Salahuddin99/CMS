import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import ErrorMessageBox from '../components/ErrorMessagebox'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { listUsers, deleteUser } from '../actions/userAction'

export default function UserListScreen() {
  const userDelete = useSelector((state) => state.userDelete)
  const {
    loading: load,
    error: deletEerror,
    success: successDelete,
  } = userDelete

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch, successDelete])

  const deleteHandler = (user) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(user._id))
    }
  }

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  return (
    <>
      <h1>Users</h1>
      {load && <Loading></Loading>}
      {deletEerror && (
        <ErrorMessageBox variant="danger">{deletEerror}</ErrorMessageBox>
      )}
      {successDelete && (
        <ErrorMessageBox variant="success">
          successfull remove the user
        </ErrorMessageBox>
      )}
      {loading && <Loading></Loading>}
      {error && <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>NGO</th>
            <th>ADMIN</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isNGO ? 'YES' : 'NO'}</td>
              <td>{user.isAdmin ? 'YES' : 'NO'}</td>
              <td>
                <LinkContainer to={`/user/${user._id}/updateStatus`}>
                  <Button variant="light" className="btn-sm">
                    Edit
                  </Button>
                </LinkContainer>
                <Button
                  type="button"
                  className="btn-sm"
                  variant="light"
                  onClick={() => deleteHandler(user)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
