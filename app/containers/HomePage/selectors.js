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

export default selectHomePageDomain;
export {
  selectHomePageDomain,
  makeSelectShowModal,
  makeSelectIsSignup,
};
