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

const makeSelectAddPicError = () => createSelector(
  selectHomePageDomain(),
  (HomePageState) => HomePageState.get('addPicError')
);

const makeSelectAddPicFetching = () => createSelector(
  selectHomePageDomain(),
  (HomePageState) => HomePageState.get('addPicFetching')
);

const makeSelectSelectedUser = () => createSelector(
  selectHomePageDomain(),
  (HomePageState) => HomePageState.get('selectedUser')
);

const makeSelectUserPictures = () => createSelector(
  selectHomePageDomain(),
  (HomePageState) => HomePageState.get('userPictures')
);

// Popover selectors
const makeSelectShowPopover = () => createSelector(
  selectHomePageDomain(),
  (popoverState) => popoverState.get('showPopover')
);

const makeSelectPopoverTarget = () => createSelector(
  selectHomePageDomain(),
  (popoverState) => popoverState.get('popoverTarget')
);

const makeSelectPopoverImgUrl = () => createSelector(
  selectHomePageDomain(),
  (popoverState) => popoverState.get('popoverImgUrl')
);

const makeSelectPopoverTitle = () => createSelector(
  selectHomePageDomain(),
  (popoverState) => popoverState.get('popoverTitle')
);

export default selectHomePageDomain;
export {
  selectHomePageDomain,
  makeSelectShowAuthModal,
  makeSelectIsSignup,
  makeSelectShowPicModal,
  makeSelectPictures,
  makeSelectActivePicture,
  makeSelectAddPicError,
  makeSelectAddPicFetching,
  makeSelectShowPopover,
  makeSelectPopoverTarget,
  makeSelectPopoverImgUrl,
  makeSelectPopoverTitle,
  makeSelectSelectedUser,
  makeSelectUserPictures,
};
