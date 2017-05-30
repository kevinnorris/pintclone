import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { twitterColor, twitterHighlight } from 'utils/colors';

import twitterLogo from './Twitter_Logo_White_On_Transparent.png';

const TwitterBtn = styled(Button)`
  background: ${twitterColor};
  color: white;
  display: flex;
  align-items: center;

  p{
    margin: 0;
    padding-left: 6px;
  }
  &:hover{
    background: ${twitterHighlight};
    color: white;
  }
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
`;

function TwitterButton({ onClick, text }) {
  return (
    <TwitterBtn onClick={onClick}>
      <Logo src={twitterLogo} alt="twitter logo" />
      <p>{text}</p>
    </TwitterBtn>
  );
}

TwitterButton.propTypes = {
  onClick: React.PropTypes.func,
  text: React.PropTypes.string,
};

export default TwitterButton;
