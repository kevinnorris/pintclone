/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import popupTools from 'popup-tools';

import * as auth from 'containers/App/auth';

import { makeSelectError, makeSelectToken, makeSelectUserData } from 'containers/App/selectors';
import { authUserSuccess, authUserError, logoutUser } from 'containers/App/actions';

import Header from './Header';
import AuthModal from './AuthModal';
import { toggleModal, setModalSignup, setModalLogin } from './actions';
import { makeSelectShowModal, makeSelectIsSignup } from './selectors';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  showModal = (isSignup) => (
    () => {
      if (isSignup) {
        this.props.setModalSignup();
      } else {
        this.props.setModalLogin();
      }
      this.props.toggleModal();
    }
  )

  handelLogin = (isTwitter) => (
    () => {
      const name = isTwitter ? 'twitter' : 'github';
      popupTools.popup(`/auth/${name}`, `${name} connect`, {}, (err, response) => {
        if (err) {
          this.props.authUserError({ error: err.message });
        } else {
          if (response.success) {
            console.log(response.user);
            this.props.authUserSuccess({ token: response.token, user: response.user, expiresIn: response.expiresIn });
            auth.saveCookie(response.token, response.user, response.expiresIn);
            this.props.toggleModal();
          } else {
            this.props.authUserError({ error: response.error });
          }
        }
      });
    }
  )

  logout = () => {
    this.props.logoutUser();
    auth.logout();
  }

  render() {
    return (
      <div>
        <Helmet
          title="Pintclone"
          meta={[
            { name: 'description', content: 'Pinterest clone' },
          ]}
        />
        <Header loggedIn={!!this.props.token} logout={this.logout} showModal={this.showModal} />
        <h1>
          Home Page
        </h1>
        <AuthModal
          show={this.props.showModal}
          isSignup={this.props.isSignup}
          error={this.props.error}
          toggleModal={this.props.toggleModal}
          twitterLogin={this.handelLogin(true)}
          githubLogin={this.handelLogin(false)}
          setModalLogin={this.props.setModalLogin}
          setModalSignup={this.props.setModalSignup}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  showModal: PropTypes.bool.isRequired,
  isSignup: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  token: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  userData: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  toggleModal: PropTypes.func.isRequired,
  setModalSignup: PropTypes.func.isRequired,
  setModalLogin: PropTypes.func.isRequired,
  authUserSuccess: PropTypes.func.isRequired,
  authUserError: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  showModal: makeSelectShowModal(),
  isSignup: makeSelectIsSignup(),
  error: makeSelectError(),
  token: makeSelectToken(),
  userData: makeSelectUserData(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleModal: () => dispatch(toggleModal()),
    setModalSignup: () => dispatch(setModalSignup()),
    setModalLogin: () => dispatch(setModalLogin()),
    authUserSuccess: (payload) => dispatch(authUserSuccess(payload)),
    authUserError: (payload) => dispatch(authUserError(payload)),
    logoutUser: () => dispatch(logoutUser()),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
