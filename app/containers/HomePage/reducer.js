import { fromJS } from 'immutable';
import { LOGOUT_USER } from 'containers/App/constants';
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
} from './constants';

const initialState = fromJS({
  showAuthModal: false,
  showPicModal: false,
  isSignup: false,
  fetching: false,
  fetchingLike: false,
  pictures: false,
  error: false,
  activePicture: false,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_AUTH_MODAL:
      return state
        .set('showAuthModal', !state.get('showAuthModal'));
    case SET_MODAL_LOGIN:
      return state
        .set('isSignup', false);
    case SET_MODAL_SIGNUP:
      return state
        .set('isSignup', true);
    case TOGGLE_PIC_MODAL:
      return state
        .set('showPicModal', !state.get('showPicModal'));
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
    case SELECT_PICTURE:
      return state
        .set('activePicture', action.payload.picture);
    case UNSELECT_PICTURE:
      return state
        .set('activePicture', false);
    case REQUEST_LIKE_TOGGLE:
      return state
        .set('fetchingLike', true)
        .set('error', false);
    case SUCCESS_LIKE_TOGGLE: {
      const picIndex = state.get('pictures').findIndex((picture) => +picture.get('id') === action.payload.picId);
      const liked = state.getIn(['pictures', picIndex, 'liked']);
      const likecount = state.getIn(['pictures', picIndex, 'likecount']);
      return state
        .set('fetchingLike', false)
        // Update liked
        .setIn(
          ['pictures', picIndex, 'liked'],
          !liked,
        )
        // Update number of likes
        .setIn(
         ['pictures', picIndex, 'likecount'],
          liked ? +likecount - 1 : +likecount + 1,
        );
    }
        // set picture with id = payload.picId liked to oposit of what it is
    case ERROR_LIKE_TOGGLE:
      return state
        .set('fetchingLike', false)
        .set('error', action.payload.error);
    case LOGOUT_USER:
      return state
        .set('pictures', state.get('pictures').map((picture) => picture.set('liked', false)));
    default:
      return state;
  }
}

export default homePageReducer;
