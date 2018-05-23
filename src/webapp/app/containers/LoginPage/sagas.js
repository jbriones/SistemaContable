import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { API_URL } from 'containers/App/constants';
import {
  LOGIN,
} from 'containers/LoginPage/constants';
import {
  logged,
  loginError,
} from 'containers/LoginPage/actions';
import request from 'utils/request';

export function* login(data) {
  try {
    // TODO login
  } catch (err) {
    yield put(loginError('Error al iniciar sesión'));
  }
}
export function* loginRequest() {
  const watcher = yield takeLatest(LOGIN, login);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  loginRequest,
];
