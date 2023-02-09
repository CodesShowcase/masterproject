import { combineReducers } from 'redux'
import authReducer from '../features/auth'

const rootReducer = combineReducers({
  auth: authReducer
})
export default rootReducer