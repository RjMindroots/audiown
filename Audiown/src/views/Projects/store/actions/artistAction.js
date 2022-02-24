import axios from 'axios'
import { base_url } from '../../../../config'
import { isUserLoggedInToken } from '@utils'
import { GET_ARTIST_DATA, GET_ARTIST_DATA_SUCCESS, GET_ARTIST_DATA_FAILURE } from '../actionName'

export const getArtists = () => {
  
    const config = {
      method: 'post',
      url: `${base_url}/getartists`,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      data: JSON.stringify({token: isUserLoggedInToken()})
    }
    return async dispatch => {
      dispatch({
        type: GET_ARTIST_DATA
      })
      await axios(config)
        .then(function (response) {
          if (response.data.status === true) {
            dispatch({
              type: GET_ARTIST_DATA_SUCCESS,
              artists: response.data.artists
            })
          } else {
            dispatch({
              type: GET_ARTIST_DATA_FAILURE,
              message: response.message
            })
          }
  
        })
        .catch(function (error) {
          dispatch({
            type: GET_ARTIST_DATA_FAILURE,
            message: error
          })
        })
    }
}