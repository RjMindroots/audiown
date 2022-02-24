// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'
import { isUserLoggedInToken } from '@utils'
import axios from 'axios'
import { base_url } from '../../../config'

const config = useJwt.jwtConfig

// ** Handle User Login
export const handleLogin = data => {
  return dispatch => {
    dispatch({
      type: 'LOGIN',
      data
    })

    // ** Add to user, accessToken & refreshToken to localStorage
    localStorage.setItem('userData', JSON.stringify(data))
  }
}


// ** Handle User Logout
// export const handleLogout = () => {
//   return dispatch => {
//     dispatch({ type: 'LOGOUT', [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null })

//     // ** Remove user, accessToken & refreshToken from localStorage
//     localStorage.removeItem('userData')
//     localStorage.removeItem(config.storageTokenKeyName)
//     localStorage.removeItem(config.storageRefreshTokenKeyName)
//   }
// }

// ** Handle User Logout
export const handleLogout = () =>  {
  console.log("yes")
  return function (dispatch) {
    dispatch({ type: 'LOGOUT' })
    const data = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${isUserLoggedInToken()}`
      }
    }
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
    try {
      const request = axios(`${base_url}/logout`, data).then(
        (response) => {
        }
      ) 
    } catch (err) {
    } 
  }
}
