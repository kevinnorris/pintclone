/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import styled from 'styled-components';
import popupTools from 'popup-tools';
import { Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import Logo from 'components/Logo';
import { helpTextColor } from 'utils/colors';
import HeaderButton from 'components/HeaderButton';

import Header from './Header';

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

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    token: '',
    user: '',
    error: '',
    showModal: false,
    showSignup: false,
  }

  showModal = (isSignup) => (
    () => {
      this.setState({
        ...this.state,
        showModal: true,
        showSignup: isSignup,
      });
    }
  )

  toggleModal = () => {
    this.setState({
      ...this.state,
      showModal: !this.state.showModal,
    });
  }

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
    return (
      <div>
        <Header error={this.state.error} showModal={this.showModal} />
        <h1>
          Home Page
        </h1>
        <button onClick={this.handelGithubLogin}>Login With Github</button>
        <h2>Token: {this.state.token}</h2>
        <h2>User: {this.state.user}</h2>
        <AuthModal show={this.state.showModal} onHide={this.toggleModal} dialogClassName="authModal">
          <ModalBody>
            <Logo>P</Logo>
            <ModalTitle>{this.state.showSignup ? 'Sign up to see more' : 'Log in to see more'}</ModalTitle>
          </ModalBody>
          <AuthModalFooter>
            <ModalFooterTxt>{this.state.showSignup ? 'Already have an account?' : 'Need an account?'}</ModalFooterTxt>
            <AuthModalFooterBtn>{this.state.showSignup ? 'Login' : 'Signup'}</AuthModalFooterBtn>
          </AuthModalFooter>
        </AuthModal>
      </div>
    );
  }
}
