import { fromJS } from 'immutable';
import {
  TOGGLE_MODAL,
  SET_MODAL_SIGNUP,
  SET_MODAL_LOGIN,
} from './constants';

const initialState = fromJS({
  showModal: false,
  isSignup: false,
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
    default:
      return state;
  }
}

export default homePageReducer;
