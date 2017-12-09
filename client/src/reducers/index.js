import { combineReducers } from 'redux';
import authReducer from './authReducer';

// all of the properties of state in the redux store
export default combineReducers({
  auth: authReducer
});