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
    twitterId: false,
    avatarUrl: false,
  },
});

// If a cookie is available update initial state with its data
const cookie = loggedIn();
if (cookie) {
  initialState = initialState
    .set('token', cookie.token)
    .set('expireDate', cookie.expireDate)
    .set('userId', cookie.user.userId)
    .setIn(['userData', 'username'], cookie.user.username)
    .setIn(['userData', 'displayname'], cookie.user.displayname)
    .setIn(['userData', 'githubId'], cookie.user.githubid)
    .setIn(['userData', 'twitterId'], cookie.user.twitterid)
    .setIn(['userData', 'avatarUrl'], cookie.user.avatarurl);
}

function appReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_USER_SUCCESS:
      return state
        .set('error', false)
        .set('token', action.payload.token)
        .set('userId', action.payload.user.id)
        .set('expireDate', Date.now() + action.payload.expiresIn)
        .setIn(['userData', 'username'], action.payload.user.username)
        .setIn(['userData', 'displayname'], action.payload.user.displayname)
        .setIn(['userData', 'githubId'], action.payload.user.githubid)
        .setIn(['userData', 'twitterId'], action.payload.user.twitterid)
        .setIn(['userData', 'avatarUrl'], action.payload.user.avatarurl);
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
        .setIn(['userData', 'githubId'], false)
        .setIn(['userData', 'twitterId'], false)
        .setIn(['userData', 'avatarUrl'], false);
    default:
      return state;
  }
}

export default appReducer;
