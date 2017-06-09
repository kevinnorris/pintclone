import {
  TOGGLE_AUTH_MODAL,
  SET_MODAL_SIGNUP,
  SET_MODAL_LOGIN,
  TOGGLE_PIC_MODAL,
  REQUEST_PICTURES,
  REQUEST_PICTURES_SUCCESS,
  REQUEST_PICTURES_ERROR,
  SELECT_PICTURE,
  UNSELECT_PICTURE,
  REQUEST_LIKE_TOGGLE,
  SUCCESS_LIKE_TOGGLE,
  ERROR_LIKE_TOGGLE,
  REQUEST_ADD_PICTURE,
  SUCCESS_ADD_PICTURE,
  ERROR_ADD_PICTURE,
} from './constants';

export function toggleAuthModal() {
  return {
    type: TOGGLE_AUTH_MODAL,
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

export function togglePicModal() {
  return {
    type: TOGGLE_PIC_MODAL,
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

export function selectPicture(payload) {
  return {
    type: SELECT_PICTURE,
    payload,
  };
}

export function unselectPicture() {
  return {
    type: UNSELECT_PICTURE,
  };
}

export function likeToggle(payload) {
  return {
    type: REQUEST_LIKE_TOGGLE,
    payload,
  };
}

export function likeToggleError(payload) {
  return {
    type: ERROR_LIKE_TOGGLE,
    payload,
  };
}

export function likeToggleSuccess(payload) {
  return {
    type: SUCCESS_LIKE_TOGGLE,
    payload,
  };
}

export function requestAddPicture(payload) {
  return {
    type: REQUEST_ADD_PICTURE,
    payload,
  };
}

export function successAddPicture(payload) {
  return {
    type: SUCCESS_ADD_PICTURE,
    payload,
  };
}

export function errorAddPicture(payload) {
  return {
    type: ERROR_ADD_PICTURE,
    payload,
  };
}
