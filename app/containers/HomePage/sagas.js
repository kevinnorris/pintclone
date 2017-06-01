import { takeLatest, call, put, select, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import request from 'utils/request';
import { appUrl } from 'utils/constants';
import { makeSelectToken, makeSelectUserId } from 'containers/App/selectors';
import { REQUEST_PICTURES } from './constants';
import { requestPicturesSuccess, requestPicturesError } from './actions';

export function* allPicturesSaga(action) {
  const token = yield select(makeSelectToken());
  const userId = yield select(makeSelectUserId());

  // Build request URL based on if user is authenticated
  let requestUrl = `${appUrl}/api/pictures?`;
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
  const watcher = yield takeLatest(REQUEST_PICTURES, allPicturesSaga);

  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// All sagas to be loaded
export default [
  allPicturesWatcher,
];
