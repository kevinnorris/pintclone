import {
  TOGGLE_AUTH_MODAL,
  SET_MODAL_SIGNUP,
  SET_MODAL_LOGIN,
  TOGGLE_PIC_MODAL,
  REQUEST_PICTURES,
  REQUEST_PICTURES_SUCCESS,
  REQUEST_PICTURES_ERROR,
  SELECT_PICTURE,
  REQUEST_LIKE_TOGGLE,
  SUCCESS_LIKE_TOGGLE,
  ERROR_LIKE_TOGGLE,
  REQUEST_ADD_PICTURE,
  SUCCESS_ADD_PICTURE,
  ERROR_ADD_PICTURE,
  REQUEST_DELETE_PICTURE,
  SUCCESS_DELETE_PICTURE,
  ERROR_DELETE_PICTURE,
  TOGGLE_POPOVER_SHOW,
  SET_POPOVER_TARGET,
  SET_POPOVER_IMGURL,
  SET_POPOVER_TITLE,
  SELECT_USER,
  UNSELECT_USER,
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

// Request pictures
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

// Toggle like
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

// Add picture
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

// Delete picture
/**
 * @param {object} payload {picId: number}
 */
export function requestDeletePicture(payload) {
  return {
    type: REQUEST_DELETE_PICTURE,
    payload,
  };
}
/**
 * @param {object} payload {picId: number}
 */
export function successDeletePicture(payload) {
  return {
    type: SUCCESS_DELETE_PICTURE,
    payload,
  };
}
export function errorDeletePicture(payload) {
  return {
    type: ERROR_DELETE_PICTURE,
    payload,
  };
}

// Popover functions
export function toggleShowPopover() {
  return {
    type: TOGGLE_POPOVER_SHOW,
  };
}
export function setPopoverTarget(payload) {
  return {
    type: SET_POPOVER_TARGET,
    payload,
  };
}
export function setPopoverImgUrl(payload) {
  return {
    type: SET_POPOVER_IMGURL,
    payload,
  };
}
export function setPopoverTitle(payload) {
  return {
    type: SET_POPOVER_TITLE,
    payload,
  };
}

export function selectUser(payload) {
  return {
    type: SELECT_USER,
    payload,
  };
}
export function unselectUser() {
  return {
    type: UNSELECT_USER,
  };
}
