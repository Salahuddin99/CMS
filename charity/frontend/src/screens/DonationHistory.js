import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { listDonationMine, deleteDonation } from '../actions/paymentAction'
import ErrorMessageBox from '../components/ErrorMessagebox'
import Loading from '../components/Loading'
import { ORDER_DELETE_RESET } from '../constants/paymentConstant'

export default function DonationHistory() {
  const donationMineList = useSelector((state) => state.donationMineList)
  const { loading, error, donation } = donationMineList
  const donationDelete = useSelector((state) => state.donationDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = donationDelete
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listDonationMine())
    dispatch({ type: ORDER_DELETE_RESET })
  }, [dispatch, successDelete])

  const deleteHandler = (donation) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteDonation(donation._id))
    }
  }
  return (
    <div>
      <h1>Donation History</h1>
      {loadingDelete && <Loading></Loading>}
      {errorDelete && (
        <ErrorMessageBox variant="danger">{errorDelete}</ErrorMessageBox>
      )}
      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <ErrorMessageBox variant="danger">{error}</ErrorMessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>PROJECT NAME</th>
              <th>DONNOR NAME</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {donation.map((donation) => (
              <tr key={donation._id}>
                <td>{donation._id}</td>
                <td>{donation.DonateItems.name}</td>
                <td>{donation.savePayment.name}</td>
                <td>{donation.createdAt.substring(0, 10)}</td>
                <td>{donation.totalPrice.toFixed(2)}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      navigate(`/donate/${donation._id}`)
                    }}
                  >
                    Details
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(donation)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
