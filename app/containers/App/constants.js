/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const AUTHENTICATE_USER_SUCCESS = 'app/App/AUTHENTICATE_USER_SUCCESS';
export const AUTHENTICATE_USER_ERROR = 'app/App/AUTHENTICATE_USER_ERROR';

export const LOGOUT_USER = 'app/App/LOGOUT_USER';
