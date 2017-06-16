import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import { githubColor, githubHighlight, twitterColor, twitterHighlight } from 'utils/colors';
import githubLogo from './github_32px.png';
import twitterLogo from './Twitter_Logo_White_On_Transparent.png';

const AuthBtn = styled(Button)`
  background: ${(props) => props.isTwitter ? twitterColor : githubColor};
  color: white;
  display: flex;
  align-items: center;
  margin: 10px 0;

  p{
    margin: 0;
    padding-left: 6px;
  }
  &:hover{
    background: ${(props) => props.isTwitter ? twitterHighlight : githubHighlight};
    color: white;
  }
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
`;

function ThirdPartyAuthBtn({ onClick, text, isTwitter }) {
  return (
    <AuthBtn onClick={onClick} isTwitter={isTwitter}>
      <Logo src={isTwitter ? twitterLogo : githubLogo} alt="logo" />
      <p>{text}</p>
    </AuthBtn>
  );
}

ThirdPartyAuthBtn.propTypes = {
  onClick: React.PropTypes.func,
  text: React.PropTypes.string,
  isTwitter: React.PropTypes.bool.isRequired,
};

export default ThirdPartyAuthBtn;
