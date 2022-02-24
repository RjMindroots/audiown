import { GET_ARTIST_DATA, GET_ARTIST_DATA_SUCCESS, GET_ARTIST_DATA_FAILURE } from '../actionName'

// ** Initial State
const initialState = {
  artists: [],
  loading: false,
  message: '',
  requestType : ''
}

const ArtistData = (state = initialState, action) => {

  // console.log("ArtistData action", action)
    switch (action.type) {
          case GET_ARTIST_DATA:
          return {
            ...state,
            loading : true,
            requestType : action.type
          }
          case GET_ARTIST_DATA_FAILURE:
          return {
            ...state,
            loading : false,
            requestType : action.type
          }
          case GET_ARTIST_DATA_SUCCESS:
          return {
            ...state,
            artists : action.artists,
            loading : false,
            requestType : action.type
          }
    
        default:
          return state
      }
}

export default ArtistData