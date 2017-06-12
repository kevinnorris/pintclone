import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import popupTools from 'popup-tools';

import * as auth from 'containers/App/auth';
import PictureGrid from 'components/PictureGrid';
import PictureModal from 'components/PictureModal';

import { makeSelectError, makeSelectToken } from 'containers/App/selectors';
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
  requestAddPicture,
  errorAddPicture,
  toggleShowPopover,
  setPopoverTarget,
  setPopoverImgUrl,
  setPopoverTitle,
} from './actions';
import {
  makeSelectShowAuthModal,
  makeSelectIsSignup,
  makeSelectShowPicModal,
  makeSelectPictures,
  makeSelectActivePicture,
  makeSelectAddPicError,
  makeSelectAddPicFetching,
  makeSelectShowPopover,
  makeSelectPopoverTarget,
  makeSelectPopoverImgUrl,
  makeSelectPopoverTitle,
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
      }
    }
  )

  handlePopoverClick = (e) => {
    this.props.setPopoverTarget({ target: e.target });
    this.props.toggleShowPopover();
  };

  handelPopoverSubmit = (e) => {
    e.preventDefault();
    if (this.props.popoverImgUrl && this.props.popoverTitle) {
      this.props.requestAddPicture({ imgUrl: this.props.popoverImgUrl, title: this.props.popoverTitle });
    } else {
      this.props.errorAddPicture({ error: 'No url and or title provided' });
    }
  }

  popoverImgChange = (e) => {
    this.props.setPopoverImgUrl({ imgUrl: e.target.value });
  }
  popoverTitleChange = (e) => {
    this.props.setPopoverTitle({ title: e.target.value });
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
        <Header
          loggedIn={!!this.props.token}
          logout={this.logout} showModal={this.showModal}
          error={this.props.addPicError}
          fetching={this.props.addPicFetching}
          handelClick={this.handlePopoverClick}
          handelSubmit={this.handelPopoverSubmit}
          target={this.props.popoverTarget}
          show={this.props.showPopover}
          imgUrl={this.props.popoverImgUrl}
          title={this.props.popoverTitle}
          imgUrlChange={this.popoverImgChange}
          titleChange={this.popoverTitleChange}
        />
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
          activePicture={this.props.activePicture ? this.props.activePicture.toJS() : false}
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
  addPicError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  addPicFetching: PropTypes.bool.isRequired,
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
  requestAddPicture: PropTypes.func.isRequired,
  errorAddPicture: PropTypes.func.isRequired,
  popoverTarget: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  showPopover: PropTypes.bool.isRequired,
  popoverImgUrl: PropTypes.string.isRequired,
  popoverTitle: PropTypes.string.isRequired,
  toggleShowPopover: PropTypes.func.isRequired,
  setPopoverTarget: PropTypes.func.isRequired,
  setPopoverImgUrl: PropTypes.func.isRequired,
  setPopoverTitle: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  showAuthModal: makeSelectShowAuthModal(),
  isSignup: makeSelectIsSignup(),
  showPicModal: makeSelectShowPicModal(),
  pictures: makeSelectPictures(),
  activePicture: makeSelectActivePicture(),
  addPicError: makeSelectAddPicError(),
  addPicFetching: makeSelectAddPicFetching(),
  error: makeSelectError(),
  token: makeSelectToken(),
  popoverTarget: makeSelectPopoverTarget(),
  showPopover: makeSelectShowPopover(),
  popoverImgUrl: makeSelectPopoverImgUrl(),
  popoverTitle: makeSelectPopoverTitle(),
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
    requestAddPicture: (payload) => dispatch(requestAddPicture(payload)),
    errorAddPicture: (payload) => dispatch(errorAddPicture(payload)),
    toggleShowPopover: () => dispatch(toggleShowPopover()),
    setPopoverTarget: (payload) => dispatch(setPopoverTarget(payload)),
    setPopoverImgUrl: (payload) => dispatch(setPopoverImgUrl(payload)),
    setPopoverTitle: (payload) => dispatch(setPopoverTitle(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
