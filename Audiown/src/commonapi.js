import { isUserLoggedInToken } from '@utils'
import { base_url } from './config'

export const getDataApi = async (props) => {
  const tokenS = {token: isUserLoggedInToken(), artist_id: props.id}
  const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(tokenS)
    }
    
    try {
      const response = await fetch(`${base_url}${props.hiturl}`, data)
      const ErrorFormAPI = {
        status: "ServerError",
        responseCode: response.status
      }  
      if (response.status === 200) {
        const res = await response.json()
        return res
      } else {
        return response
      }
    } catch (error) {
      return error
    }
}

export const postMehodWithBody = async (props) => {
  const data = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(props.dataMain)
  }
  console.log("check", data.body)
  try {
    const response = await fetch(`${base_url}${props.hiturl}`, data)
    const responseJson = await response.json()
    console.log(responseJson)
    const ErrorFormAPI = {
      status: "ServerError",
      responseCode: response.status,
      message: `${responseJson.message}`
    }
    if (response.status === 200) {
      return responseJson
    } else {
      return ErrorFormAPI
    }
  } catch (error) {
    return error
  }
}

export const getDataApiForUpdate = async (props) => {
  const tokenS = {token: isUserLoggedInToken(), artist_id: props.id}
  const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(tokenS)
    }
    console.log(data)
    
    try {
      const response = await fetch(`${base_url}${props.hiturl}`, data)
      const ErrorFormAPI = {
        status: "ServerError",
        responseCode: response.status
      }  
      if (response.status === 200) {
        const res = await response.json()
        return res
      } else {
        return response
      }
    } catch (error) {
      return error
    }
}

export const getDataProject = async (props) => {
  const tokenS = {token: isUserLoggedInToken(), project_id: props.id}
  const data = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(tokenS)
    }
    console.log(data)
    
    try {
      const response = await fetch(`${base_url}${props.hiturl}`, data)
      const ErrorFormAPI = {
        status: "ServerError",
        responseCode: response.status
      }  
      if (response.status === 200) {
        const res = await response.json()
        return res
      } else {
        return response
      }
    } catch (error) {
      return error
    }
}