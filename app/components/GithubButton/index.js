/**
*
* GithubButton
*
*/

import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import githubImg from './github_32px.png';

const GitHubBtn = styled(Button)`
  display: flex;
  align-items: center;
  p{
    margin: 0;
    padding-left: 6px;
  }
`;


function GithubButton({ onClick, text }) {
  return (
    <GitHubBtn bsStyle="info" onClick={onClick}>
      <img className="logo" src={githubImg} alt="github logo" />
      <p>{text}</p>
    </GitHubBtn>
  );
}

GithubButton.propTypes = {
  onClick: React.PropTypes.func,
  text: React.PropTypes.string,
};

export default GithubButton;
