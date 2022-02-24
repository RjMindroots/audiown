// **  Initial State
const initialState = {
  userData: {}
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userData: action.data
      }
    case 'LOGOUT':
      const obj = { ...action }
      delete obj.type
      return { ...state }
    default:
      return state
  }
}

export default authReducer