import { fromJS } from 'immutable';

import { loggedIn } from './auth';

import {
  AUTHENTICATE_USER_SUCCESS,
  AUTHENTICATE_USER_ERROR,
  LOGOUT_USER,
} from './constants';

let initialState = fromJS({
  error: false,
  token: false,
  expireDate: false,
  userId: false,
  userData: {
    username: false,
    displayname: false,
    githubId: false,
  },
});

// If a cookie is available update initial state with its data
const cookie = loggedIn();
if (cookie) {
  initialState = initialState
    .set('token', cookie.token)
    .set('expireDate', new Date(cookie.expireDate))
    .set('userId', cookie.userId)
    .set('username', cookie.username)
    .set('displayname', cookie.displayname)
    .set('githubId', cookie.githubId);
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER_SUCCESS:
      return state
        .set('error', false)
        .set('token', action.payload.token)
        .set('userId', action.payload.userId)
        .set('expireDate', action.payload.expireDate)
        .setIn(['userData', 'username'], action.payload.user.username)
        .setIn(['userData', 'displayname'], action.payload.user.displayname)
        .setIn(['userData', 'githubId'], action.payload.user.githubId);
    case AUTHENTICATE_USER_ERROR:
      return state
        .set('error', action.error);
    case LOGOUT_USER:
      return state
        .set('token', false)
        .set('userId', false)
        .set('expireDate', false)
        .setIn(['userData', 'username'], false)
        .setIn(['userData', 'displayname'], false)
        .setIn(['userData', 'githubId'], false);
    default:
      return state;
  }
}

export default appReducer;
