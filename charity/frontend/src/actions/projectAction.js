import Axios from 'axios'
import {
  PROJECT_LIST_SUCCESS,
  PROJECT_LIST_REQUEST,
  PROJECT_LIST_FAIL,
  PROJECT_DETAILS_REQUEST,
  PROJECT_DETAILS_SUCCESS,
  PROJECT_DETAILS_FAIL,
  PROJECT_DELETE_FAIL,
  PROJECT_DELETE_REQUEST,
  PROJECT_DELETE_SUCCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_CREATE_REQUEST,
  PROJECT_CREATE_SUCCESS,
  PROJECT_UPDATE_FAIL,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
} from '../constants/projectConstant'

export const listProjects =
  ({ nGO = '' }) =>
  async (dispatch) => {
    try {
      dispatch({ type: PROJECT_LIST_REQUEST })
      const { data } = await Axios.get(`/api/projects?nGO=${nGO}`)
      dispatch({ type: PROJECT_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: PROJECT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const createProject =
  ({
    name,
    category,
    image,
    images,
    description,
    Challenge,
    Solution,
    longTermImpact,
    additionalDocumentation,
    by,
    location,
    donationGoal,
    companyRegistrationNumber,
    companyAddress,
    yearFounded,
    contactName,
    telephoneNo,
    emailAddress,
    country,
  }) =>
  async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState()
      dispatch({
        type: PROJECT_CREATE_REQUEST,
        payload: {
          name,
          category,
          image,
          images,
          description,
          Challenge,
          Solution,
          longTermImpact,
          additionalDocumentation,
          by,
          location,
          donationGoal,
          companyRegistrationNumber,
          companyAddress,
          yearFounded,
          contactName,
          telephoneNo,
          emailAddress,
          country,
        },
      })
      const { data } = await Axios.post(
        '/api/projects/create',
        {
          name,
          category,
          image,
          images,
          description,
          Challenge,
          Solution,
          longTermImpact,
          additionalDocumentation,
          by,
          location,
          donationGoal,
          companyRegistrationNumber,
          companyAddress,
          yearFounded,
          contactName,
          telephoneNo,
          emailAddress,
          country,
        },
        {
          headers: {
            Authorization: `bearer ${userInfo.token}`,
          },
        }
      )
      dispatch({ type: PROJECT_CREATE_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: PROJECT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deleteProject = (projectId) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()
    dispatch({ type: PROJECT_DELETE_REQUEST, payload: projectId })
    const { data } = await Axios.delete(`/api/projects/${projectId}`, {
      headers: {
        Authorization: `bearer ${userInfo.token}`,
      },
    })
    dispatch({ type: PROJECT_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PROJECT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const detailsOfProject = (projectId) => async (dispatch) => {
  try {
    dispatch({ type: PROJECT_DETAILS_REQUEST })
    const { data } = await Axios.get(`/api/projects/${projectId}`)
    dispatch({ type: PROJECT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PROJECT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
export const updateProject = (project) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROJECT_UPDATE_REQUEST, payload: project })
    const {
      userLogin: { userInfo },
    } = getState()
    const { data } = await Axios.put(`/api/projects/${project._id}`, project, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    dispatch({ type: PROJECT_UPDATE_SUCCESS, payload: data.project })
  } catch (error) {
    dispatch({
      type: PROJECT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
