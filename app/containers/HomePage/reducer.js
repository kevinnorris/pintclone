import { fromJS } from 'immutable';
import {
  TOGGLE_MODAL,
  SET_MODAL_SIGNUP,
  SET_MODAL_LOGIN,
  REQUEST_PICTURES,
  REQUEST_PICTURES_SUCCESS,
  REQUEST_PICTURES_ERROR,
} from './constants';

const initialState = fromJS({
  showModal: false,
  isSignup: false,
  fetching: false,
  pictures: false,
  error: false,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_MODAL:
      return state
        .set('showModal', !state.get('showModal'));
    case SET_MODAL_LOGIN:
      return state
        .set('isSignup', false);
    case SET_MODAL_SIGNUP:
      return state
        .set('isSignup', true);
    case REQUEST_PICTURES:
      return state
        .set('fetching', true)
        .set('pictures', false)
        .set('error', false);
    case REQUEST_PICTURES_SUCCESS:
      return state
        .set('fetching', false)
        .set('pictures', fromJS(action.payload.pictures));
    case REQUEST_PICTURES_ERROR:
      return state
        .set('fetching', false)
        .set('error', action.payload.error);
    default:
      return state;
  }
}

export default homePageReducer;
