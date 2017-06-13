import { createSelector } from 'reselect';

/**
 * Direct selector to the global state domain
 */
const selectGlobal = () => (state) => state.get('global');

/**
 * Other specific selectors
 */
const makeSelectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error')
);

const makeSelectToken = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('token')
);

const makeSelectUserId = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('userId')
);

const makeSelectUsername = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['userData', 'username'])
);

const makeSelectUserData = () => createSelector(
  selectGlobal(),
  (globalState) => ({
    username: globalState.getIn(['userData', 'username']),
    displayname: globalState.getIn(['userData', 'displayname']),
    githubId: globalState.getIn(['userData', 'githubId']),
    twitterId: globalState.getIn(['userData', 'twitterId']),
    avatarUrl: globalState.getIn(['userData', 'avatarUrl']),
  })
);

// makeSelectLocationState expects a plain JS object for the routing state
const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  makeSelectError,
  makeSelectToken,
  makeSelectUserId,
  makeSelectUserData,
  makeSelectUsername,
  makeSelectLocationState,
};
