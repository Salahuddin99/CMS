import axios from 'axios'
import {
  SAVE_PAYMENT_INFORMATION,
  ADD_ITEM,
  ITEM_REMOVE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
} from '../constants/paymentConstant'

export const savePaymentInformation = (data) => (dispatch) => {
  dispatch({ type: SAVE_PAYMENT_INFORMATION, payload: data })
  localStorage.setItem('savePayment', JSON.stringify(data))
}

export const add = (donation) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/projects/${donation}`)

  dispatch({
    type: ADD_ITEM,
    payload: {
      project: data._id,
      name: data.name,
      image: data.image,
      category: data.category,
      description: data.description,
      Solution: data.Solution,
      nGO: data._id,
    },
  })
  localStorage.setItem('Items', JSON.stringify(getState().payment.Items))
}

export const createDonation = (donation) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: donation })
    const {
      userLogin: { userInfo },
    } = getState()
    const { data } = await axios.post('/api/payment', donation, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data.order })
    dispatch({ type: ITEM_REMOVE })
    localStorage.removeItem('Items')
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const detailsDonation = (donationId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: donationId })
  const {
    userLogin: { userInfo },
  } = getState()
  try {
    const { data } = await axios.get(`/api/payment/${donationId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: ORDER_DETAILS_FAIL, payload: message })
  }
}

export const listDonationMine = () => async (dispatch, getState) => {
  dispatch({ type: ORDER_MINE_LIST_REQUEST })
  const {
    userLogin: { userInfo },
  } = getState()
  try {
    const { data } = await axios.get('/api/payment/mine', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
    dispatch({ type: ORDER_MINE_LIST_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: ORDER_MINE_LIST_FAIL, payload: message })
  }
}

export const listDonation =
  (nGO = '') =>
  async (dispatch, getState) => {
    dispatch({ type: ORDER_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    try {
      const { data } = await axios.get(`/api/payment?nGO=${nGO}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      })
      console.log(data)
      dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      dispatch({ type: ORDER_LIST_FAIL, payload: message })
    }
  }

export const deleteDonation = (donationId) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELETE_REQUEST, payload: donationId })
  const {
    userLogin: { userInfo },
  } = getState()
  try {
    const { data } = axios.delete(`/api/payment/${donationId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: ORDER_DELETE_FAIL, payload: message })
  }
}
