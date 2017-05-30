/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import popupTools from 'popup-tools';
import { Modal, ModalBody, ModalFooter } from 'react-bootstrap';

import Logo from 'components/Logo';
import { helpTextColor } from 'utils/colors';
import HeaderButton from 'components/HeaderButton';
import GithubButton from 'components/GithubButton';

import { makeSelectError, makeSelectToken, makeSelectUserData } from 'containers/App/selectors';
import { authUserSuccess, authUserError, logoutUser } from 'containers/App/actions';

import Header from './Header';
import { toggleModal, setModalSignup, setModalLogin } from './actions';
import { makeSelectShowModal, makeSelectIsSignup } from './selectors';

const ModalTitle = styled.h1`
  font-size: 32px;
  margin: 20px 0;
`;

const ModalFooterTxt = styled.p`
  font-size: 14px;
  font-weight: normal;
`;

const AuthModal = styled(Modal)`
  text-align: center;
  color: ${helpTextColor};
`;

const AuthModalBody = styled(ModalBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AuthModalFooter = styled(ModalFooter)`
  text-align: center;
`;

const AuthModalFooterBtn = styled(HeaderButton)`
  padding: 10px; 20px;
  margin-top: 10px;
  width: 60%;
`;

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

  handelGithubLogin = () => {
    popupTools.popup('/auth/github', 'Github Connect', {}, (err, response) => {
      console.log(err);
      console.log(response);
      if (err) {
        this.props.authUserError({ error: err.message });
      } else {
        if (response.success) {
          this.props.authUserSuccess({ token: response.token, user: response.user, expiresIn: response.expiresIn });
          this.props.toggleModal();
        } else {
          this.props.authUserError({ error: response.error });
        }
      }
    });
  }

  render() {
    let footerBtn;
    if (this.props.isSignup) {
      footerBtn = (
        <AuthModalFooterBtn onClick={this.props.setModalLogin}>Login</AuthModalFooterBtn>
      );
    } else {
      footerBtn = (
        <AuthModalFooterBtn onClick={this.props.setModalSignup}>Signup</AuthModalFooterBtn>
      );
    }
    return (
      <div>
        <Helmet
          title="Pintclone"
          meta={[
            { name: 'description', content: 'Pinterest clone' },
          ]}
        />
        <Header error={this.props.error} showModal={this.showModal} />
        <h1>
          Home Page
        </h1>
        <AuthModal show={this.props.showModal} onHide={this.props.toggleModal} dialogClassName="authModal">
          <AuthModalBody>
            <Logo>P</Logo>
            <ModalTitle>{this.props.isSignup ? 'Sign up to see more' : 'Log in to see more'}</ModalTitle>
            <GithubButton onClick={this.handelGithubLogin} text={this.props.isSignup ? 'Sign in with Github' : 'Log in with Github'}>
            </GithubButton>
          </AuthModalBody>
          <AuthModalFooter>
            <ModalFooterTxt>{this.props.isSignup ? 'Already have an account?' : 'Need an account?'}</ModalFooterTxt>
            {footerBtn}
          </AuthModalFooter>
        </AuthModal>
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
