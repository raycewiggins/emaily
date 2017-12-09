import axios from 'axios';
import { FETCH_USER } from './types';

//redux thunk looks at what is returned from the action creator and automatically calls the internal function it with dispatch
export const fetchUser = () => async dispatch => {
  //the output from axios
  const res = await axios.get('/api/current_user')
  
  dispatch({ type: FETCH_USER, payload: res.data });
};