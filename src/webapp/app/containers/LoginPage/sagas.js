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
    const form = data.form;
    if (form.usuario == 'Bci2018referidost3st' && form.clave=='mL9dhn5gQSS89ZVvhx9hPbHmLW7A'){
      yield put(logged(form));
    }else{
      yield put(loginError('Error al iniciar sesión'));
    }
    //
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
