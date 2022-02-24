import axios from 'axios'
import { base_url } from '../../../../config'
import { isUserLoggedInToken } from '@utils'
import { GET_PROJECT_DATA, GET_PROJECT_DATA_SUCCESS, GET_PROJECT_DATA_FAILURE } from '../actionName'

// ** Get table Data
export const getData = params => {
  const config = {
    method: 'post',
    url: `${base_url}/getprojects`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    data: JSON.stringify({ token: isUserLoggedInToken() }),
    params
  }

  return async dispatch => {
    await axios(config)
      .then(function (response) {
        dispatch({
          type: 'GET_DATA',
          allData: response.data,
          data: response.data.projects,
          totalPages: response.data
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

// ** Get Projects Data
export const GetProjectData = props => {
  const tokenS = { token: isUserLoggedInToken(), project_id: props.id }
  const config = {
    method: 'post',
    url: `${base_url}/getproject`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    data: JSON.stringify(tokenS)
  }

  return async dispatch => {
    dispatch({
      type: GET_PROJECT_DATA
    })
    await axios(config)
      .then(function (response) {
        if (response.data.status === true) {
          dispatch({
            type: GET_PROJECT_DATA_SUCCESS,
            project: response.data.project
          })
        } else {
          dispatch({
            type: GET_PROJECT_DATA_FAILURE,
            message: response.message
          })
        }

      })
      .catch(function (error) {
        dispatch({
          type: GET_PROJECT_DATA_FAILURE,
          message: error
        })
      })
  }
}