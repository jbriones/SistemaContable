import { fromJS } from 'immutable';
import {
  LOGIN,
  LOGGED,
  LOGIN_ERROR,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  errorMge: '',
  dataProfile: [],
});

function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state
      .set('loading', true)
      .set('error', false)
      .set('errorMge', '')
      .set('dataProfile', []);
    case LOGGED:
      return state
      .set('loading', false)
      .set('error', false)
      .set('errorMge', '')
      .set('dataProfile', action.data);
    case LOGIN_ERROR:
      return state
      .set('loading', false)
      .set('error', true)
      .set('errorMge', action.data);
    default:
      return state;
  }
}

export default loginPageReducer;
