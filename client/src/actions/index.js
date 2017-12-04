import axios from 'axios';
import { FETCH_USER } from './types';

//redux thunk looks at what is returned from the action creator and automatically calls the internal function it with dispatch
const fetchUser = () => {
  return function(dispatch) {
    axios
      .get('/api/current_user')
      .then(res => dispatch({ type: FETCH_USER, payload: res }));
  }
};