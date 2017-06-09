import React from 'react';
import styled from 'styled-components';

import {
  outline,
  pinTitleColor,
  mainColor,
  main,
  btnBorderRadius,
  inactive,
  background,
} from 'utils/colors';

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

const Likes = styled.button`
  visibility: hidden;
  position: absolute;
  top: 10px;
  left: 10px;
  color: ${(props) => props.active ? mainColor : inactive};
  background: ${(props) => props.active ? main : background};
  padding: 5px 8px;
  border-radius: ${btnBorderRadius};

  &:hover {
    cursor: pointer;
  }

  p {
    display: inline-block;
    margin: 0;
  }
`;

const UserLink = styled.a`
  cursor: pointer;
  color: ${inactive};
  text-decoration: none;

  &:hover {
    color: ${inactive};
    text-decoration: none;
  }
`;


function Pin({ id, title, imgurl, username, userThumbnail, likes, liked, handelImgClick, handelLikeClick }) {
  return (
    <Wrapper>
      <Likes active={liked} onClick={handelLikeClick(id, !!liked)} >
        <span className="glyphicon glyphicon-heart" aria-hidden="true"></span> {likes || 0}
      </Likes>
      <PinImg src={imgurl} alt={title} onClick={handelImgClick({ id, title, imgurl, username, userThumbnail, likes, liked })} />
      <UserLink href="#">
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
};

export default Pin;
