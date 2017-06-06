import { createSelector } from 'reselect';

/**
 * Direct selector to the HomePage state domain
 */
const selectHomePageDomain = () => (state) => state.get('homePage');

/**
 * Other specific selectors
 */
const makeSelectShowAuthModal = () => createSelector(
  selectHomePageDomain(),
  (HomePageState) => HomePageState.get('showAuthModal')
);

const makeSelectIsSignup = () => createSelector(
  selectHomePageDomain(),
  (HomePageState) => HomePageState.get('isSignup')
);

const makeSelectShowPicModal = () => createSelector(
  selectHomePageDomain(),
  (HomePageState) => HomePageState.get('showPicModal')
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
  makeSelectShowAuthModal,
  makeSelectIsSignup,
  makeSelectShowPicModal,
  makeSelectPictures,
  makeSelectActivePicture,
};
