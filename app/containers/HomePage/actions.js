import {
  TOGGLE_MODAL,
  SET_MODAL_SIGNUP,
  SET_MODAL_LOGIN,
} from './constants';

export function toggleModal() {
  return {
    type: TOGGLE_MODAL,
  };
}

export function setModalSignup() {
  return {
    type: SET_MODAL_SIGNUP,
  };
}

export function setModalLogin() {
  return {
    type: SET_MODAL_LOGIN,
  };
}
