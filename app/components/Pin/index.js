import React from 'react';
import styled from 'styled-components';

import {
  outline,
  pinTitleColor,
  mainColor,
  main,
  btnBorderRadius,
  inactive,
  background
} from 'utils/colors';

const PinImg = styled.img`
  width: 240px;
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
  text-align: center;

  &:hover{
    background: ${outline};

    span {
      visibility: visible;
    }
  }
`;

const Title = styled.p`
  color: ${pinTitleColor};
  padding: 4px 0;
  margin: 0;
  font-size: 16px;
  font-weight: bold;
`;

const Thumbnail = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const Likes = styled.span`
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

const UserLink = styled.a`cursor: pointer;`;


function Pin({ id, title, imgurl, username, userThumbnail, likes, liked }) {
  return (
    <Wrapper>
      <Likes active={liked}>
        <p><span className="glyphicon glyphicon-heart" aria-hidden="true"></span> {likes || 0}</p>
      </Likes>
      <PinImg src={imgurl} alt={title} />
      <Title>{title}</Title>
      <UserLink href="#">
        {userThumbnail ? <Thumbnail src={userThumbnail} alt={username} /> : null}
        {username}
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
  likes: React.PropTypes.string,
  liked: React.PropTypes.bool,
};

export default Pin;
