import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import { Modal, ModalBody, ModalFooter } from 'react-bootstrap';
import { helpTextColor, inactive } from 'utils/colors';
import StyledButton from 'components/Button/StyledButton';

const PModal = styled(Modal)`
  color: ${helpTextColor};
  
  .modal-dialog {
    margin-left: auto;
    margin-right: auto; 
  }
`;
const PModalBody = styled(ModalBody)`
  position: relative;
  padding: 0;
  text-align: center;
`;

const PicModalFooter = styled(ModalFooter)`
  text-align: center;
  padding: 5px;
`;

const UserLink = styled(Link)`
  cursor: pointer;
`;

const ModalFooterTxt = styled.p`
  color: ${inactive};
  display: inline-block;
  font-size: 14px;
  font-weight: normal;
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`;

const FooterBtn = styled(StyledButton)`
  position: absolute;
  left: 10px;
  bottom: 22px;
  width: 60px;
  height: 40px;
  padding: 10px;
`;

const FooterBtnRight = styled(StyledButton)`
  position: absolute;
  right: 10px;
  bottom: 22px;
  width: 60px;
  height: 40px;
  padding: 10px;
`;

const AvatarThumbnail = styled.img`
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 10px;s
`;

const Pic = styled.img`
  border-radius: 5px 5px 0 0;
  width: 100%;
  height: auto;
`;
const Title = styled.h3`margin: 0 0 10px 0`;

class PictureModal extends React.PureComponent {
  componentDidUpdate() {
    if (this.props.activePicture) {
      const modal = document.getElementById('modal');
      // React destorys the modal on close, if activePicture is changed it will attempt to update
      // and will throw an error as the modal does not exists. We only want to update when the modal
      // exists
      if (modal) {
        const modalDialog = modal.getElementsByClassName('modal-dialog')[0];
        const img = document.getElementById('pictureModalImg');
        const viewWidth = window.innerWidth;
        const threshold = 768;
        // Set max width of image based on screen size
        const maxImgWidth = viewWidth > threshold ? viewWidth * 0.8 : viewWidth * 0.95;
        // Determine img width
        const imgWidth = img.naturalWidth > maxImgWidth ? maxImgWidth : img.naturalWidth;
        // Set new width for img and modalDialog
        img.style.width = `${imgWidth}px`;
        modalDialog.style.width = `${imgWidth + 2}px`;
      }
    }
  }

  // TODO: does not update on activepicture property changes, fix
  render() {
    return (
      <PModal id="modal" show={this.props.show} onHide={this.props.toggleModal}>
        <PModalBody>
          <Pic id="pictureModalImg" src={this.props.activePicture.imgurl} alt={this.props.activePicture.title} />
        </PModalBody>
        <PicModalFooter>
          <Title>{this.props.activePicture.title}</Title>
          <UserLink to={`/${this.props.activePicture.username}`}>
            <AvatarThumbnail src={this.props.activePicture.userThumbnail} />
            <ModalFooterTxt>{this.props.activePicture.username}</ModalFooterTxt>
          </UserLink>
          <FooterBtn main={this.props.activePicture.liked} onClick={this.props.handelLikeClick(this.props.activePicture.id, !!this.props.activePicture.liked)}>
            <span className="glyphicon glyphicon-heart" aria-hidden="true" /> {this.props.activePicture.likes ? this.props.activePicture.likes : 0}
          </FooterBtn>
          {this.props.activePicture.myPic ?
            <FooterBtnRight onClick={this.props.handelDeleteClick(this.props.activePicture.id)}>
              <span className="glyphicon glyphicon-trash" aria-hidden="true" />
            </FooterBtnRight> :
            null
          }
        </PicModalFooter>
      </PModal>
    );
  }
}

PictureModal.propTypes = {
  show: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  activePicture: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
  handelLikeClick: PropTypes.func.isRequired,
  handelDeleteClick: React.PropTypes.func.isRequired,
};

export default PictureModal;
