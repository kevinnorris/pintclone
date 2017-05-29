import {
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_ERROR,
  LOGOUT_USER,
} from './constants';

export function authUserSuccess(payload) {
  return {
    type: AUTHENTICATE_USER_SUCCESS,
    payload,
  };
}

export function authUserError(error) {
  return {
    type: AUTHENTICATE_USER_ERROR,
    error,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}
