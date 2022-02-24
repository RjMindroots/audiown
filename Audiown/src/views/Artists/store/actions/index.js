import axios from 'axios'
import {base_url} from '../../../../config'
import { isUserLoggedInToken } from '@utils'


// ** Get table Data
export const getData = params => {
  const config = {
    method: 'post',
    url: `${base_url}/getartists`,
    headers: { 
      'Content-Type': 'application/json', 
      Accept: 'application/json'
    },
    data : JSON.stringify({
      token: isUserLoggedInToken()
    }),
    params
  }

  return async dispatch => {
    await axios(config)
      .then(function (response) {
        dispatch({
            type: 'GET_DATA',
            allData: response.data,
            data: response.data.artists,
            totalPages: response.data.count,
            params
          })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}
