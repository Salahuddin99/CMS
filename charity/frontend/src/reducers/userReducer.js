import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
  START_PROJECT_REQUEST,
  START_PROJECT_SUCCESS,
  START_PROJECT_FAIL,
  START_PROJECT_RESET,
  USER_NGO_REQ_LIST_REQUEST,
  USER_NGO_REQ_LIST_SUCCESS,
  USER_NGO_REQ_LIST_FAIL,
} from '../constants/userConstant'

function userLoginReducer(state = {}, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

function userDetailsReducer(
  state = { loading: true, user: { NGO: { reviews: [] } } },
  action
) {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

function userUpdateProfileReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, user: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_PROFILE_RESET:
      return {}
    default:
      return state
  }
}

function userUpdateReducer(state = {}, action) {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, user: action.payload }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case USER_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

function userRegisterReducer(state = {}, action) {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

function userDeleteReducer(state = {}, action) {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case USER_DELETE_RESET:
      return {}
    default:
      return state
  }
}

function userListReducer(state = { users: [] }, action) {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true, users: [] }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload, users: [] }
    default:
      return state
  }
}

function userNGOreqReducer(state = { nGO: [] }, action) {
  switch (action.type) {
    case USER_NGO_REQ_LIST_REQUEST:
      return { loading: true, nGO: [] }
    case USER_NGO_REQ_LIST_SUCCESS:
      return { loading: false, nGO: action.payload }
    case USER_NGO_REQ_LIST_FAIL:
      return { loading: false, error: action.payload, nGO: [] }
    default:
      return state
  }
}

function projectStartReducer(state = {}, action) {
  switch (action.type) {
    case START_PROJECT_REQUEST:
      return { loading: true }
    case START_PROJECT_SUCCESS:
      return { loading: false, success: true, user: action.payload }
    case START_PROJECT_FAIL:
      return { loading: false, error: action.payload }
    case START_PROJECT_RESET:
      return {}
    default:
      return state
  }
}

export {
  userLoginReducer,
  userRegisterReducer,
  userUpdateReducer,
  userUpdateProfileReducer,
  userDetailsReducer,
  userDeleteReducer,
  userListReducer,
  projectStartReducer,
  userNGOreqReducer,
}
