import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { helpTextColor } from 'utils/colors';
import HeaderButton from 'components/HeaderButton';

const PModal = styled(Modal)`
  color: ${helpTextColor};


`;
const PModalBody = styled(ModalBody)`
  position: relative;
  padding: 5px;
  text-align: center;
`;

const PicModalFooter = styled(ModalFooter)`
  text-align: center;
  padding: 5px;
  padding-bottom: 10px;
`;

const UserLink = styled.a`
  cursor: pointer;
`;

const ModalFooterTxt = styled.p`
  display: inline-block;
  font-size: 14px;
  font-weight: normal;
`;

const PicModalFooterBtn = styled(HeaderButton)`
  width: 60px;
  height: 40px;
  padding: 10px;
  float: right;
`;

const AvatarThumbnail = styled.img`
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 10px;s
`;

const Pic = styled.img`
  width: 100%;
  height: auto;
`;
const Title = styled.h3`margin: 5px 0 10px 0;`;

class PictureModal extends React.PureComponent {
  componentDidUpdate() {
    if (this.props.activePicture) {
      const pictureModalImg = document.getElementById('pictureModalImg');
      // If natural image size is smaller than client, resize image
      if (pictureModalImg.clientWidth > pictureModalImg.naturalWidth) {
        pictureModalImg.style.width = `${pictureModalImg.naturalWidth}px`;
      }
    }
  }

  render() {
    return (
      <PModal show={this.props.show} onHide={this.props.toggleModal}>
        <PModalBody>
          <Pic id="pictureModalImg" src={this.props.activePicture.imgurl} alt={this.props.activePicture.title} />
        </PModalBody>
        <PicModalFooter>
          <Title>{this.props.activePicture.title}</Title>
          <UserLink href="#">
            <AvatarThumbnail src={this.props.activePicture.userThumbnail} />
            <ModalFooterTxt>{this.props.activePicture.username}</ModalFooterTxt>
          </UserLink>
          <PicModalFooterBtn main={this.props.activePicture.liked}>
            <span className="glyphicon glyphicon-heart" aria-hidden="true" /> {this.props.activePicture.likes ? this.props.activePicture.likes : 0}
          </PicModalFooterBtn>
        </PicModalFooter>
      </PModal>
    );
  }
}

PictureModal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  activePicture: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
};

export default PictureModal;
