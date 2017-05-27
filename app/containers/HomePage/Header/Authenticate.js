import React from 'react';
import styled from 'styled-components';

import HeaderButton from 'components/HeaderButton';

// TODO: Add modal with github and twitter login buttons
// Text depends on if login or not

const Wrapper = styled.div`
  display: inline-block;
`;

export default class Authenticate extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    login: React.PropTypes.bool.isRequired,
    error: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.bool,
    ]),
  }

  static defaultProps = {
    error: '',
  }

  render() {
    return (
      <Wrapper>
        {this.props.login ? <HeaderButton>Login</HeaderButton> : <HeaderButton main>Signup</HeaderButton> }
      </Wrapper>
    );
  }
}
