import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import popupTools from 'popup-tools';

import * as auth from 'containers/App/auth';
import PictureGrid from 'components/PictureGrid';
import PictureModal from 'components/PictureModal';

import { makeSelectError, makeSelectToken, makeSelectUserData } from 'containers/App/selectors';
import { authUserSuccess, authUserError, logoutUser } from 'containers/App/actions';

import Header from './Header';
import AuthModal from './AuthModal';
import {
  toggleAuthModal,
  setModalSignup,
  setModalLogin,
  togglePicModal,
  requestPictures,
  selectPicture,
  unselectPicture,
  likeToggle,
} from './actions';
import {
  makeSelectShowAuthModal,
  makeSelectIsSignup,
  makeSelectShowPicModal,
  makeSelectPictures,
  makeSelectActivePicture,
} from './selectors';

class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.requestPictures();
  }

  showModal = (isSignup) => (
    () => {
      if (isSignup) {
        this.props.setModalSignup();
      } else {
        this.props.setModalLogin();
      }
      this.props.toggleAuthModal();
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
            this.props.authUserSuccess({ token: response.token, user: response.user, expiresIn: response.expiresIn });
            auth.saveCookie(response.token, response.user.id, response.user, response.expiresIn);
            this.props.toggleAuthModal();
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

  handelImgClick = (pic) => (
    () => {
      this.props.selectPicture({ picture: pic });
      this.props.togglePicModal();
    }
  )

  handelLikeClick = (pictureId, hasLiked) => (
    () => {
      if (this.props.token) {
        this.props.likeToggle({ pictureId, liked: hasLiked });
      } else {
        // Prompt login
      }
    }
  )

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
        <PictureGrid
          pictures={this.props.pictures ? this.props.pictures.toJS() : this.props.pictures}
          handelImgClick={this.handelImgClick}
          handelLikeClick={this.handelLikeClick}
        />
        <AuthModal
          show={this.props.showAuthModal}
          isSignup={this.props.isSignup}
          error={this.props.error}
          toggleModal={this.props.toggleAuthModal}
          twitterLogin={this.handelLogin(true)}
          githubLogin={this.handelLogin(false)}
          setModalLogin={this.props.setModalLogin}
          setModalSignup={this.props.setModalSignup}
        />
        <PictureModal
          show={this.props.showPicModal}
          toggleModal={this.props.togglePicModal}
          activePicture={this.props.activePicture}
          handelLikeClick={this.handelLikeClick}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  showAuthModal: PropTypes.bool.isRequired,
  isSignup: PropTypes.bool.isRequired,
  showPicModal: PropTypes.bool.isRequired,
  pictures: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  activePicture: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  token: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  toggleAuthModal: PropTypes.func.isRequired,
  setModalSignup: PropTypes.func.isRequired,
  setModalLogin: PropTypes.func.isRequired,
  togglePicModal: PropTypes.func.isRequired,
  requestPictures: PropTypes.func.isRequired,
  authUserSuccess: PropTypes.func.isRequired,
  authUserError: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  selectPicture: PropTypes.func.isRequired,
  unselectPicture: PropTypes.func.isRequired,
  likeToggle: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  showAuthModal: makeSelectShowAuthModal(),
  isSignup: makeSelectIsSignup(),
  showPicModal: makeSelectShowPicModal(),
  pictures: makeSelectPictures(),
  activePicture: makeSelectActivePicture(),
  error: makeSelectError(),
  token: makeSelectToken(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleAuthModal: () => dispatch(toggleAuthModal()),
    setModalSignup: () => dispatch(setModalSignup()),
    setModalLogin: () => dispatch(setModalLogin()),
    togglePicModal: () => dispatch(togglePicModal()),
    requestPictures: () => dispatch(requestPictures()),
    authUserSuccess: (payload) => dispatch(authUserSuccess(payload)),
    authUserError: (payload) => dispatch(authUserError(payload)),
    logoutUser: () => dispatch(logoutUser()),
    selectPicture: (payload) => dispatch(selectPicture(payload)),
    unselectPicture: () => dispatch(unselectPicture()),
    likeToggle: (payload) => dispatch(likeToggle(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
