import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { helpTextColor } from 'utils/colors';
import HeaderButton from 'components/HeaderButton';
import ThirdPartyAuthBtn from 'components/ThirdPartyAuthBtn';
import Logo from 'components/Logo';

const ModalTitle = styled.h1`
  font-size: 32px;
  margin: 20px 0;
`;

const ModalFooterTxt = styled.p`
  font-size: 14px;
  font-weight: normal;
`;

const AModal = styled(Modal)`
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

function AuthModal({ show, isSignup, error, toggleModal, twitterLogin, githubLogin, setModalLogin, setModalSignup }) {
  let footerBtn;
  if (isSignup) {
    footerBtn = (
      <AuthModalFooterBtn onClick={setModalLogin}>Login</AuthModalFooterBtn>
    );
  } else {
    footerBtn = (
      <AuthModalFooterBtn onClick={setModalSignup}>Signup</AuthModalFooterBtn>
    );
  }
  return (
    <AModal show={show} onHide={toggleModal}>
      <AuthModalBody>
        <Logo>P</Logo>
        <ModalTitle>{isSignup ? 'Sign up to see more' : 'Log in to see more'}</ModalTitle>
        <ThirdPartyAuthBtn
          onClick={githubLogin}
          text={isSignup ? 'Sign in with Github' : 'Log in with Github'}
          isTwitter={false}
        />
        <ThirdPartyAuthBtn
          onClick={twitterLogin}
          text={isSignup ? 'Sign in with Twitter' : 'Log in with Twitter'}
          isTwitter
        />
        {error ?
          <Error>{error}</Error> :
          null
        }
      </AuthModalBody>
      <AuthModalFooter>
        <ModalFooterTxt>{isSignup ? 'Already have an account?' : 'Need an account?'}</ModalFooterTxt>
        {footerBtn}
      </AuthModalFooter>
    </AModal>
  );
}

AuthModal.propTypes = {
  show: PropTypes.bool.isRequired,
  isSignup: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  toggleModal: PropTypes.func.isRequired,
  twitterLogin: PropTypes.func.isRequired,
  githubLogin: PropTypes.func.isRequired,
  setModalLogin: PropTypes.func.isRequired,
  setModalSignup: PropTypes.func.isRequired,
};

export default AuthModal;
