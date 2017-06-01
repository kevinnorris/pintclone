import React from 'react';
import styled from 'styled-components';

import { outline, pinTitleColor } from 'utils/colors';

const PinImg = styled.img`
  width: 250px;
  border-radius: 6px;
`;

const Wrapper = styled.div`
  padding: 5px;
  background: white;
  border-radius: 8px;
  text-align: center;

  &:hover{
    background: ${outline};
  }
`;

const Title = styled.p`
  color: ${pinTitleColor};
  padding: 4px 0;
  margin: 0;
  font-size: 16px;
  font-weight: bold;
`;


function Pin({ id, title, imgurl, username, userThumbnail }) {
  return (
    <Wrapper>
      <PinImg src={imgurl} alt={title} />
      <Title>{title}</Title>
      <a href="#">
        {userThumbnail ? <img src={userThumbnail} alt={username} /> : null}
        <p>{username}</p>
      </a>
    </Wrapper>
  );
}

Pin.propTypes = {
  id: React.PropTypes.number.isRequired,
  title: React.PropTypes.string.isRequired,
  imgurl: React.PropTypes.string.isRequired,
  username: React.PropTypes.string.isRequired,
  userThumbnail: React.PropTypes.string,
};

export default Pin;
