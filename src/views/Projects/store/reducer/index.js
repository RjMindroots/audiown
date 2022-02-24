import { GET_PROJECT_DATA, GET_PROJECT_DATA_SUCCESS, GET_PROJECT_DATA_FAILURE } from '../actionName'

// ** Initial State
const initialState = {
  data: [],
  total: 1,
  params: {},
  allData: [],
  project:{},
  loading: false,
  message: ''
}

const DataTablesReducer = (state = initialState, action) => {

  console.log("action -- ", action)

  switch (action.type) {
    case 'GET_DATA':
      return {
        ...state,
        allData: action.allData,
        data: action.data,
        total: action.totalPages,
        params: action.params
      }
      case GET_PROJECT_DATA:
      return {
        ...state,
        loading : true
      }
      case GET_PROJECT_DATA_FAILURE:
      return {
        ...state,
        loading : false
      }
      case GET_PROJECT_DATA_SUCCESS:
      return {
        ...state,
        project : action.project,
        loading : false
      }

    default:
      return state
  }
}

export default DataTablesReducer
