const {
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_FAIL,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_RESET,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAIL,
  PROJECT_UPDATE_RESET,
  PROJECT_UPLOAD_REQUEST,
  PROJECT_UPLOAD_SUCCESS,
  PROJECT_UPLOAD_FAIL,
  // PROJECT_REVIEW_SAVE_REQUEST,
  // PROJECT_REVIEW_SAVE_SUCCESS,
  // PROJECT_REVIEW_SAVE_FAIL,
  // PROJECT_REVIEW_SAVE_RESET,
} = require('../constants/projectConstant')

export function projectListReducer(state = { projects: [] }, action) {
  switch (action.type) {
    case PROJECT_LIST_REQUEST:
      return { loading: true, projects: [] }
    case PROJECT_LIST_SUCCESS:
      return {
        loading: false,
        projects: action.payload.projects,
        pages: action.payload.pages,
        page: action.payload.page,
      }
    case PROJECT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const projectCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_CREATE_REQUEST:
      return { loading: true }
    case PROJECT_CREATE_SUCCESS:
      return { loading: false, project: action.payload, success: true }
    case PROJECT_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PROJECT_CREATE_RESET:
      return {}
    default:
      return state
  }
}

// export const projectReviewSaveReducer = (state = {}, action) => {
//   switch (action.type) {
//     case PROJECT_REVIEW_SAVE_REQUEST:
//       return { loading: true }
//     case PROJECT_REVIEW_SAVE_SUCCESS:
//       return { loading: false, project: action.payload, success: true }
//     case PROJECT_REVIEW_SAVE_FAIL:
//       return { loading: false, error: action.payload }
//     case PROJECT_REVIEW_SAVE_RESET:
//       return {}
//     default:
//       return state
//   }
// }

export const projectDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_DELETE_REQUEST:
      return { loadig: true }
    case PROJECT_DELETE_SUCCESS:
      return { loadig: false, success: true }
    case PROJECT_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export function projectDetailsReducer(
  state = { loading: true, project: {} },
  action
) {
  switch (action.type) {
    case PROJECT_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PROJECT_DETAILS_SUCCESS:
      return { loading: false, project: action.payload }
    case PROJECT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const projectUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_UPDATE_REQUEST:
      return { loading: true }
    case PROJECT_UPDATE_SUCCESS:
      return { loading: false, success: true, project: action.payload }
    case PROJECT_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PROJECT_UPDATE_RESET:
      return {}
    default:
      return state
  }
}

export const projectUploadReducer = (state, action) => {
  switch (action.type) {
    case PROJECT_UPLOAD_REQUEST:
      return { ...state, loadingUpload: true, errorUpLoad: '' }
    case PROJECT_UPLOAD_SUCCESS:
      return { ...state, loadingUpload: false, errorUpLoad: '' }
    case PROJECT_UPLOAD_FAIL:
      return { ...state, loadingUpload: false }
    default:
      return state
  }
}
