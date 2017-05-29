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

import Header from './Header';
import { toggleModal, setModalSignup, setModalLogin } from './actions';
import { makeSelectShowModal, makeSelectIsSignup } from './selectors';

const ModalTitle = styled.h1`
  font-size: 32px;
`;

const ModalFooterTxt = styled.p`
  font-size: 14px;
  font-weight: normal;
`;

const AuthModal = styled(Modal)`
  text-align: center;
  color: ${helpTextColor};
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
  state = {
    token: '',
    user: '',
    error: '',
  }

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
        this.setState({
          ...this.state,
          error: err,
        });
      } else {
        if (response.success) {
          this.setState({
            ...this.state,
            user: response.user,
            token: response.token,
          });
          // this.props.loginSuccess({token: response.token, user: response.user});
          // redirect to home
        } else {
          this.setState({
            ...this.state,
            error: 'Error logging into github.',
          });
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
        <Header error={this.state.error} showModal={this.showModal} />
        <h1>
          Home Page
        </h1>
        <button onClick={this.handelGithubLogin}>Login With Github</button>
        <h2>Token: {this.state.token}</h2>
        <h2>User: {this.state.user}</h2>
        <AuthModal show={this.props.showModal} onHide={this.props.toggleModal} dialogClassName="authModal">
          <ModalBody>
            <Logo>P</Logo>
            <ModalTitle>{this.props.isSignup ? 'Sign up to see more' : 'Log in to see more'}</ModalTitle>
          </ModalBody>
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
  toggleModal: PropTypes.func.isRequired,
  setModalSignup: PropTypes.func.isRequired,
  setModalLogin: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  showModal: makeSelectShowModal(),
  isSignup: makeSelectIsSignup(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleModal: () => dispatch(toggleModal()),
    setModalSignup: () => dispatch(setModalSignup()),
    setModalLogin: () => dispatch(setModalLogin()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
