import { takeLatest, call, put, select, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from 'utils/request';
import { appUrl } from 'utils/constants';
import { AUTHENTICATE_USER_SUCCESS } from 'containers/App/constants';
import { makeSelectToken, makeSelectUserId, makeSelectUserData } from 'containers/App/selectors';
import { REQUEST_PICTURES, REQUEST_LIKE_TOGGLE, REQUEST_ADD_PICTURE } from './constants';
import {
  requestPicturesSuccess,
  requestPicturesError,
  likeToggleError,
  likeToggleSuccess,
  successAddPicture,
  errorAddPicture,
  toggleShowPopover,
} from './actions';

export function* allPicturesSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());

  // Build request URL based on if user is authenticated
  let requestUrl = `${appUrl}/api/joinedPictures?`;
  if (token && userId) {
    requestUrl += `token=${token}&&userId=${userId}`;
  }

  try {
    const response = yield call(request, requestUrl);
    if (response.success) {
      yield put(requestPicturesSuccess({ pictures: response.data }));
    } else {
      yield put(requestPicturesError({ error: response.error }));
    }
  } catch (error) {
    yield put(requestPicturesError({ error: error.response }));
  }
}

export function* allPicturesWatcher() {
  const watcher = yield takeLatest([REQUEST_PICTURES, AUTHENTICATE_USER_SUCCESS], allPicturesSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* likeSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());

  let requestUrl = `${appUrl}/api/likes/`;
  if (action.payload.liked) {
    requestUrl += 'delete/';
  } else {
    requestUrl += 'add/';
  }
  requestUrl += action.payload.pictureId;
  try {
    const addLike = yield call(request, requestUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, userId }),
    });
    if (addLike.success) {
      yield put(likeToggleSuccess({ picId: action.payload.pictureId }));
    } else {
      yield put(likeToggleError({ error: addLike.error }));
    }
  } catch (error) {
    yield put(likeToggleError({ error: error.response }));
  }
}

export function* likeWatcher() {
  const watcher = yield takeLatest(REQUEST_LIKE_TOGGLE, likeSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* addPicSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());
  const userData = yield select(makeSelectUserData());

  const requestUrl = `${appUrl}/api/pictures/add`;

  try {
    const addPicture = yield call(request, requestUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, imgUrl: action.payload.imgUrl, userId, title: action.payload.title }),
    });
    if (addPicture.success) {
      // Add all required properties to the new picture
      const newPicture = addPicture.data;
      newPicture.username = userData.username;
      newPicture.avatarurl = userData.avatarUrl;
      newPicture.likeCount = 0;
      newPicture.liked = false;

      yield put(successAddPicture({ picture: newPicture }));
      yield put(toggleShowPopover());
    } else {
      yield put(errorAddPicture({ error: addPicture.error }));
    }
  } catch (error) {
    yield put(errorAddPicture({ error: error.response }));
  }
}

export function* addPicWatcher() {
  const watcher = yield takeLatest(REQUEST_ADD_PICTURE, addPicSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  allPicturesWatcher,
  likeWatcher,
  addPicWatcher,
];
