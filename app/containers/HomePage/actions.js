import {
  TOGGLE_MODAL,
  SET_MODAL_SIGNUP,
  SET_MODAL_LOGIN,
  REQUEST_PICTURES,
  REQUEST_PICTURES_SUCCESS,
  REQUEST_PICTURES_ERROR,
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

export function requestPictures() {
  return {
    type: REQUEST_PICTURES,
  };
}

export function requestPicturesSuccess(payload) {
  return {
    type: REQUEST_PICTURES_SUCCESS,
    payload,
  };
}

export function requestPicturesError(payload) {
  return {
    type: REQUEST_PICTURES_ERROR,
    payload,
  };
}
