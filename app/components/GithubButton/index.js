import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import { githubColor, githubHighlight } from 'utils/colors';
import githubLogo from './github_32px.png';

const GitHubBtn = styled(Button)`
  background: ${githubColor};
  color: white;
  display: flex;
  align-items: center;
  margin: 10px 0;

  p{
    margin: 0;
    padding-left: 6px;
  }
  &:hover{
    background: ${githubHighlight};
    color: white;
  }
`;


function GithubButton({ onClick, text }) {
  return (
    <GitHubBtn onClick={onClick}>
      <img src={githubLogo} alt="github logo" />
      <p>{text}</p>
    </GitHubBtn>
  );
}

GithubButton.propTypes = {
  onClick: React.PropTypes.func,
  text: React.PropTypes.string,
};

export default GithubButton;
