import {
  SAVE_PAYMENT_INFORMATION,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_RESET,
  ADD_ITEM,
  ITEM_REMOVE,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_MINE_LIST_FAIL,
  ORDER_MINE_LIST_REQUEST,
  ORDER_MINE_LIST_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_DELETE_RESET,
} from '../constants/paymentConstant'

export const PaymentReducer = (
  state = { Items: {}, savePayment: {} },
  action
) => {
  switch (action.type) {
    case ADD_ITEM:
      // add
      return { ...state, Items: action.payload }
    case SAVE_PAYMENT_INFORMATION:
      return { ...state, savePayment: action.payload }
    case ITEM_REMOVE:
      return { ...state, error: '', Items: {} }
    default:
      return state
  }
}

export const donationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, donation: action.payload, success: true }
    case ORDER_CREATE_FAIL:
      return { loading: false, donation: action.payload }
    case ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const donationDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true }
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, donation: action.payload }
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const donationMineListReducer = (state = { donation: [] }, action) => {
  switch (action.type) {
    case ORDER_MINE_LIST_REQUEST:
      return { loading: true }
    case ORDER_MINE_LIST_SUCCESS:
      return { loading: false, donation: action.payload }
    case ORDER_MINE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const donationListReducer = (state = { donation: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true }
    case ORDER_LIST_SUCCESS:
      return { loading: false, donation: action.payload }
    case ORDER_LIST_FAIL:
      return { loading: false, donation: action.payload }
    default:
      return state
  }
}

export const donationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true }
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_DELETE_RESET:
      return {}
    default:
      return state
  }
}
