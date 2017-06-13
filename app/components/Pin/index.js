import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';

import {
  outline,
  mainColor,
  main,
  btnBorderRadius,
  inactive,
  background,
} from 'utils/colors';

import defaultImg from './default.png';

const PinImg = styled.img`
  display: block;
  width: 360px;
  border-radius: 6px;

  &:hover{
    cursor: zoom-in;
  }
`;

const Wrapper = styled.div`
  position: relative;
  padding: 5px;
  background: white;
  border-radius: 8px;
  // text-align: center;

  &:hover{
    background: ${outline};

    button {
      visibility: visible;
    }
  }
`;

const ImgBtn = styled.button`
  visibility: hidden;
  position: absolute;
  top: 10px;
  padding: 5px 8px;
  border-radius: ${btnBorderRadius};

  &:hover {
    cursor: pointer;
  }
`;

const LikesBtn = styled(ImgBtn)`
  left: 10px;
  color: ${(props) => props.active ? mainColor : inactive};
  background: ${(props) => props.active ? main : background};

  p {
    display: inline-block;
    margin: 0;
  }
`;

const DeleteBtn = styled(ImgBtn)`
  right: 10px;
  color: ${inactive};
  background: ${background};
  font-weight: bold;
`;

const UserLink = styled(Link)`
  cursor: pointer;
  color: ${inactive};
  text-decoration: none;

  &:hover, &:active, &:focus {
    color: ${inactive};
    text-decoration: none;
  }
`;

const addDefaultSrc = (ev) => {
  ev.target.src = defaultImg;
};

function Pin({ id, title, imgurl, username, userThumbnail, likes, liked, handelImgClick, handelLikeClick, handelDeleteClick, myPic }) {
  return (
    <Wrapper>
      <LikesBtn active={liked} onClick={handelLikeClick(id, !!liked)} >
        <span className="glyphicon glyphicon-heart" aria-hidden="true"></span> {likes || 0}
      </LikesBtn>
      {myPic ?
        <DeleteBtn onClick={handelDeleteClick(id)}>
          <span className="glyphicon glyphicon-trash" aria-hidden="true" />
        </DeleteBtn> :
        null
      }
      <PinImg src={imgurl} onError={addDefaultSrc} alt={title} onClick={handelImgClick({ id, title, imgurl, username, userThumbnail, likes, liked, myPic })} />
      <UserLink to={`/${username}`}>
        By {username}
      </UserLink>
    </Wrapper>
  );
}

Pin.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  imgurl: React.PropTypes.string.isRequired,
  username: React.PropTypes.string.isRequired,
  userThumbnail: React.PropTypes.string,
  likes: React.PropTypes.number,
  liked: React.PropTypes.bool,
  handelImgClick: React.PropTypes.func.isRequired,
  handelLikeClick: React.PropTypes.func.isRequired,
  myPic: React.PropTypes.bool.isRequired,
  handelDeleteClick: React.PropTypes.func.isRequired,
};

export default Pin;
