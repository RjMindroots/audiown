// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import dataTables from '../../views/Artists/store/reducer'
import projectsTable from '../../views/Projects/store/reducer'
import artistsData from '../../views/Projects/store/reducer/artistReducer'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  dataTables,
  projectsTable,
  artistsData
})

export default rootReducer
