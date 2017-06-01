import { createSelector } from 'reselect';

/**
 * Direct selector to the HomePage state domain
 */
const selectHomePageDomain = () => (state) => state.get('homePage');

/**
 * Other specific selectors
 */
const makeSelectShowModal = () => createSelector(
  selectHomePageDomain(),
  (HomePageState) => HomePageState.get('showModal')
);

const makeSelectIsSignup = () => createSelector(
  selectHomePageDomain(),
  (HomePageState) => HomePageState.get('isSignup')
);

const makeSelectPictures = () => createSelector(
  selectHomePageDomain(),
  (HomePageState) => HomePageState.get('pictures')
);

const makeSelectActivePicture = () => createSelector(
  selectHomePageDomain(),
  (HomePageState) => HomePageState.get('activePicture')
);

export default selectHomePageDomain;
export {
  selectHomePageDomain,
  makeSelectShowModal,
  makeSelectIsSignup,
  makeSelectPictures,
  makeSelectActivePicture,
};
