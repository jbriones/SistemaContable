import {
  LOGIN,
  LOGGED,
  LOGIN_ERROR,
} from './constants';

export function login(form) {
  return {
    type: LOGIN,
    form,
  };
}

export function logged(data) {
  return {
    type: LOGGED,
    data,
  };
}

export function loginError(data) {
  return {
    type: LOGIN_ERROR,
    data,
  };
}
