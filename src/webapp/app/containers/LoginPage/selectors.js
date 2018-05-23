import { createSelector } from 'reselect';

const selectLogin = (state) => state.get('login');

const makeLoading = () => createSelector(
  selectLogin,
  (principalState) => principalState.get('loading')
);

const makeProfile = () => createSelector(
  selectLogin,
  (principalState) => principalState.get('dataProfile')
);

const makeError = () => createSelector(
  selectLogin,
  (principalState) => principalState.get('error')
);

const makeErrorMge = () => createSelector(
  selectLogin,
  (principalState) => principalState.get('errorMge')
);

export {
  selectLogin,
  makeLoading,
  makeProfile,
  makeError,
  makeErrorMge,
};
