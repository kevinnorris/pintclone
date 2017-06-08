const localStorage = global.window.localStorage;
const localStorageString = 'pintclone-FCC';

/**
 * Save user data to local storage and return the cookie object
 * @param {string} token
 * @param {object} user
 * @param {number} expiresIn
 */
export function saveCookie(token, userId, user, expiresIn) {
  const cookie = { token, userId, user };
  cookie.expireDate = Date.now() + expiresIn;
  localStorage.setItem(localStorageString, JSON.stringify(cookie));
  return cookie;
}

/**
  * Logs the current user out
  */
export function logout() {
  // remove cookie
  localStorage.removeItem(localStorageString);
}

/**
 * Check if a user is logged in
 * Returns false or the users cookie
 */
export function loggedIn() {
  const cookie = JSON.parse(localStorage.getItem(localStorageString));
  // If a cookie is stored and it has not yet expired
  if (cookie && Date.now() < new Date(cookie.expireDate)) {
    return cookie;
  }
  return false;
}
