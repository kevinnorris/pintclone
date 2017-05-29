import React from 'react';
import styled from 'styled-components';

import HeaderButton from 'components/HeaderButton';
import { background, fontFamily } from 'utils/colors';
import Logo from 'components/Logo';

const Wrapper = styled.div`
  background: ${background};
  width: 100%;
  padding: 1em 0;
  margin-bottom: 1em;
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AppName = styled.p`
  margin: 0 0 0 10px;
  font-size: 18px;
  font-weight: bold;
  font-family: ${fontFamily};
`;

function Header({ error, showModal }) {
  return (
    <Wrapper>
      <div className="container">
        <InnerWrapper>
          <ItemWrapper>
            <Logo to="/">
              P
            </Logo>
            <AppName>Pintclone</AppName>
          </ItemWrapper>
          <ItemWrapper>
            <HeaderButton main onClick={showModal(true)}>Signup</HeaderButton>
            <HeaderButton onClick={showModal(false)}>Login</HeaderButton>
          </ItemWrapper>
        </InnerWrapper>
      </div>
    </Wrapper>
  );
}

Header.propTypes = {
  error: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.bool,
  ]),
  showModal: React.PropTypes.func.isRequired,
};

export default Header;
